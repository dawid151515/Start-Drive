using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Start_Drive.API.Data;
using Start_Drive.API.Models.forumModel;
using Start_Drive.API.ModelsDto.forumModelDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IForumService
    {
        public int AddQuestion(Questions quest, int schoolId);
        public IEnumerable<QuestionsDto> GetQuestionsAnswers(int idDrivingSchool);
        public int AddAnswer(Answers answ, int schoolId, int questionId);
        public void DeleteQuestion(int questionId);
        public Questions SearchQuestion(int questionId);
        public void DeleteAnswer(int answerId);
        public Answers SearchAnswer(int answerId);
    }
    public class ForumService : IForumService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public ForumService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public int AddQuestion(Questions quest, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var question = quest;
            question.DrivingSchoolId = schoolId;

            _context.Add(question);
            _context.SaveChanges();

            return question.Id;
        }

        public IEnumerable<QuestionsDto> GetQuestionsAnswers(int idDrivingSchool)
        {
            var allQuestions = _context.Questionss.Include(q => q.Answer).Where(quest => quest.DrivingSchoolId == idDrivingSchool).ToList();
            allQuestions.Reverse();

            if (allQuestions != null)
            {
                var allQuestionsAll = _mapper.Map<List<QuestionsDto>>(allQuestions);
                return allQuestionsAll;
            }
            else
            {
                return null;
            }
        }

        public int AddAnswer(Answers answ, int schoolId, int questionId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var question = _context.Questionss.FirstOrDefault(q => q.Id == questionId);

            if (question is null)
            {
                throw new DirectoryNotFoundException("Question not found");
            }

            var answer = answ;
            answer.DrivingSchoolId = drivingSchool.Id;
            answer.QuestionsId = question.Id;

            _context.Add(answer);
            _context.SaveChanges();

            return answer.Id;
        }


        public void DeleteQuestion(int questionId)
        {
            var questionD = SearchQuestion(questionId);

            if (questionD is null)
            {
                throw new DirectoryNotFoundException("Question not found");
            }

            _context.Questionss.Remove(questionD);
            _context.SaveChanges();
        }

        public Questions SearchQuestion(int questionId)
        {
            var questionD = _context.Questionss.FirstOrDefault(q => q.Id == questionId);
            return questionD;
        }

        public void DeleteAnswer(int answerId)
        {
            var answerD = SearchAnswer(answerId);

            if (answerD is null)
            {
                throw new DirectoryNotFoundException("Answer not found");
            }

            _context.Answerss.Remove(answerD);
            _context.SaveChanges();
        }

        public Answers SearchAnswer(int answerId)
        {
            var answerD = _context.Answerss.FirstOrDefault(a => a.Id == answerId);
            return answerD;
        }
    }
}
