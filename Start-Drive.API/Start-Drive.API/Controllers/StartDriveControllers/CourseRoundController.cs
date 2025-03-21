using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Start_Drive.API.Identity;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;
using Start_Drive.API.Services.StartDriveServices;
using System.Security.Claims;

namespace Start_Drive.API.Controllers.StartDriveControllers
{
    [ApiController]
    [Route("startDrive/stronaGlowna/turyKursow")]
    public class CourseRoundController : ControllerBase
    {
        private readonly ICourseRoundService _courseRoundService;
        public CourseRoundController(ICourseRoundService courseRoundService)
        {
            _courseRoundService = courseRoundService;
        }


        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school", "instructor")]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<CourseRoundsModelDto>> GetCourseRounds([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var courseRounds = _courseRoundService.GetCourseRounds(schoolId);
                return Ok(courseRounds);
            }
            else
            {
                return new ForbidResult();
            }
        }


        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("{schoolId}")]
        public ActionResult CreateCourseRound([FromBody] CourseRoundsModel courseRound, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _courseRoundService.AddCourseRound(courseRound, schoolId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}/{courseRoundId}")]
        public ActionResult UpdateCourseRound([FromRoute] int schoolId, [FromRoute] int courseRoundId, [FromBody] CourseRoundsModel courseRound)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _courseRoundService.UpdateCourseRound(courseRoundId, courseRound);

                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}/{courseRoundId}")]
        public ActionResult DeleteCourseRound([FromRoute] int schoolId, [FromRoute] int courseRoundId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _courseRoundService.DeleteCourseRound(courseRoundId);

                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("dodajKursanta/{schoolId}/{courseRoundId}")]
        public ActionResult AddStudentToCourseRound([FromBody] CourseRoundsStudentsId courseRoundStudent, [FromRoute] int schoolId, 
            [FromRoute] int courseRoundId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var courseRoundStudentId = _courseRoundService.AddStudentToCourseRound(courseRoundStudent, schoolId, courseRoundId);
                return Ok(courseRoundStudentId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}/{courseRoundId}/{courseRoundStudentId}")]
        public ActionResult DeleteStudentFromCourseRound([FromRoute] int schoolId, [FromRoute] int courseRoundStudentId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _courseRoundService.DeleteStudentFromCourseRound(courseRoundStudentId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
