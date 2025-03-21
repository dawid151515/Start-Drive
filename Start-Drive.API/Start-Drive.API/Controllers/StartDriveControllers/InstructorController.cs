using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Start_Drive.API.Identity;
using Start_Drive.API.Models.instructorModel;
using Start_Drive.API.ModelsDto.instructorModelDto;
using Start_Drive.API.Services.StartDriveServices;
using System.Security.Claims;

namespace Start_Drive.API.Controllers.StartDriveControllers
{
    [ApiController]
    [Route("startDrive/stronaGlowna/instruktorzy")]
    public class InstructorController : ControllerBase
    {
        private readonly IInstructorService _instructorService;

        public InstructorController(IInstructorService iinstructorService)
        {
            _instructorService = iinstructorService;
        }

        //--------------------------------------- Instructors ------------------------------------------------------

        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<InstructorDto>> GetInstructorsAll([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var instructors = _instructorService.GetInstructors(schoolId);
                return Ok(instructors);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "instructor")]
        [HttpGet("{schoolId}/{instructorId}")]
        public ActionResult GetInstructor([FromRoute] int schoolId, [FromRoute]int instructorId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var instructor = _instructorService.GetInstructorById(schoolId, instructorId);

                var cheskUserId = User.FindFirstValue("instructorId");
                var cheskUserEmail = User.FindFirstValue("emailAddress");
                if(int.Parse(cheskUserId) == instructor.Id && cheskUserEmail == instructor.Email)
                {
                    return Ok(instructor);
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
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("{schoolId}")]
        public ActionResult CreateInstructor([FromBody] Instructor inst, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if(int.Parse(cheskUser) == schoolId)
            {
                Console.WriteLine(int.Parse(cheskUser));
                var instructorId = _instructorService.AddInstructor(inst, schoolId);
                return Ok(instructorId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}/{instructorId}")]
        public ActionResult UpdateInstructor([FromRoute] int schoolId, [FromRoute] int instructorId, [FromBody] Instructor instructor)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _instructorService.UpdateInstructor(instructorId, instructor);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}/{instructorId}")]
        public ActionResult DeleteInstructor([FromRoute] int schoolId, [FromRoute]int instructorId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _instructorService.DeleteInstructor(instructorId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        //--------------------------------------- Calendar Absence ------------------------------------------------------


        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("nieobecnosc/{schoolId}/{instructorId}")]
        public ActionResult CreateAbsence([FromBody] List<InstructorAbsence> instAbs, [FromRoute] int schoolId, [FromRoute]int instructorId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var absenceId = _instructorService.AddInstructorAbsence(schoolId, instructorId, instAbs);
                return Ok(absenceId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("nieobecnosc/{schoolId}/{instructorId}")]
        public ActionResult DeleteAbsence([FromRoute] int schoolId, [FromBody] List<int> absenceId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _instructorService.DeleteAbsence(absenceId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }


        //----------------------------------------------------------- InstructorPage ---------------------------------------------------

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "instructor")]
        [HttpDelete("kontoInstruktora/{schoolId}/{instructorId}")]
        public ActionResult DeleteInstructorForInstructorPage([FromRoute] int schoolId, [FromRoute] int instructorId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            var cheskInstructor = User.FindFirstValue("instructorId");
            if (int.Parse(cheskUser) == schoolId && int.Parse(cheskInstructor) == instructorId)
            {
                _instructorService.DeleteInstructorForInstructorPage(schoolId, instructorId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
