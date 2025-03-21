using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface ICourseRoundService
    {
        public IEnumerable<CourseRoundsModelDto> GetCourseRounds(int idDrivingSchool);
        public int AddCourseRound(CourseRoundsModel courseRound, int schoolId);
        public void UpdateCourseRound(int courseRoundId, CourseRoundsModel courseRound);
        public void DeleteCourseRound(int courseRoundId);
        public int AddStudentToCourseRound(CourseRoundsStudentsId courseRoundStudent, int schoolId, int courseRoundId);
        public void DeleteStudentFromCourseRound(int courseRoundStudentId);
    }
    public class CourseRoundService : ICourseRoundService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public CourseRoundService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public IEnumerable<CourseRoundsModelDto> GetCourseRounds(int idDrivingSchool)
        {
            var allCourseRounds = _context.CourseRounds.Where(c => c.DrivingSchoolId == idDrivingSchool).Include(c => c.StudentsThisRoundCourse).OrderBy(c => c.From).ToList();

            if (allCourseRounds != null)
            {
                var result = _mapper.Map<List<CourseRoundsModelDto>>(allCourseRounds);
                return result;
            }
            else
            {
                return null;
            }
        }

        public int AddCourseRound(CourseRoundsModel courseRound, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var courseR = courseRound;
            courseR.DrivingSchoolId = schoolId;

            _context.Add(courseR);
            _context.SaveChanges();

            return courseR.Id;
        }

        public void UpdateCourseRound(int courseRoundId, CourseRoundsModel courseRound)
        {
            var courseR = _context.CourseRounds.FirstOrDefault(c => c.Id == courseRoundId);

            if (courseR is null)
            {
                throw new DirectoryNotFoundException("CourseRound not found");
            }

            courseR.Name = courseRound.Name;
            courseR.From = courseRound.From;
            courseR.To = courseRound.To;

            _context.SaveChanges();
        }

        public void DeleteCourseRound(int courseRoundId)
        {
            var courseRound = _context.CourseRounds.FirstOrDefault(c => c.Id == courseRoundId);

            if (courseRound is null)
            {
                throw new DirectoryNotFoundException("CourseRound not found");
            }

            _context.CourseRounds.Remove(courseRound);
            _context.SaveChanges();
        }

        public int AddStudentToCourseRound(CourseRoundsStudentsId courseRoundStudent, int schoolId, int courseRoundId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var courseRoundS = courseRoundStudent;
            courseRoundS.IdDrivingSchool = schoolId;
            courseRoundS.CourseRoundsModelId = courseRoundId;

            _context.Add(courseRoundS);
            _context.SaveChanges();

            return courseRoundS.Id;
        }

        public void DeleteStudentFromCourseRound(int courseRoundStudentId)
        {
            var courseRoundStudent = _context.CourseRoundsStudentsIds.FirstOrDefault(cs => cs.Id == courseRoundStudentId);

            if (courseRoundStudent is null)
            {
                throw new DirectoryNotFoundException("CourseRoundStudent not found");
            }

            _context.CourseRoundsStudentsIds.Remove(courseRoundStudent);
            _context.SaveChanges();
        }
    }
}
