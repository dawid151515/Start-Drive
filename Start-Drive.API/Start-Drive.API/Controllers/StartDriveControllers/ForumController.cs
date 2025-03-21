using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Start_Drive.API.Models.forumModel;
using Start_Drive.API.ModelsDto.forumModelDto;
using Start_Drive.API.Services.StartDriveServices;
using System.Security.Claims;

namespace Start_Drive.API.Controllers.StartDriveControllers
{
    [ApiController]
    [Route("startDrive/stronaGlowna/forum")]
    public class ForumController : ControllerBase
    {
        private readonly IForumService _forumService;
        public ForumController(IForumService forumService)
        {
            _forumService = forumService;
        }


        [Authorize]
        [HttpPost("{schoolId}")]
        public ActionResult CreateQuestion([FromBody] Questions quest, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            var checkUserRole = User.FindFirstValue("roleApp");
            var checkUserId = User.FindFirstValue($"{checkUserRole}Id");
            if (int.Parse(cheskUser) == schoolId && checkUserRole == quest.AskedQuestion && int.Parse(checkUserId) == quest.PersonId)
            {
                var questionId = _forumService.AddQuestion(quest, schoolId);
                return Ok(questionId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<QuestionsDto>> GetQuestionsAnswers([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var questionsAnswers = _forumService.GetQuestionsAnswers(schoolId);
                return Ok(questionsAnswers);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpPost("{schoolId}/{questionId}")]
        public ActionResult CreateAnswer([FromBody] Answers answer, [FromRoute] int schoolId, [FromRoute] int questionId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            var checkUserRole = User.FindFirstValue("roleApp");
            var checkUserId = User.FindFirstValue($"{checkUserRole}Id");
            if (int.Parse(cheskUser) == schoolId && checkUserRole == answer.WhoReplied && int.Parse(checkUserId) == answer.PersonId)
            {
                var answerId = _forumService.AddAnswer(answer, schoolId, questionId);
                return Ok(answerId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpDelete("{schoolId}/{questionId}")]
        public ActionResult DeleteQuestion([FromRoute] int schoolId, [FromRoute] int questionId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var question = _forumService.SearchQuestion(questionId);

                var checkUserRole = User.FindFirstValue("roleApp");
                var checkUserId = User.FindFirstValue($"{checkUserRole}Id");
                if ((question.AskedQuestion == checkUserRole && question.PersonId == int.Parse(checkUserId)) || checkUserRole == "school")
                {
                    _forumService.DeleteQuestion(questionId);
                    return Ok();
                }
                else
                {
                    return new ForbidResult();
                }
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpDelete("{schoolId}/{questionId}/{answerId}")]
        public ActionResult DeleteAnswer([FromRoute] int schoolId, [FromRoute] int answerId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var answer = _forumService.SearchAnswer(answerId);

                var checkUserRole = User.FindFirstValue("roleApp");
                var checkUserId = User.FindFirstValue($"{checkUserRole}Id");
                if ((answer.WhoReplied == checkUserRole && answer.PersonId == int.Parse(checkUserId)) || checkUserRole == "school")
                {
                    _forumService.DeleteAnswer(answerId);
                    return Ok();
                }
                else
                {
                    return new ForbidResult();
                }
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
