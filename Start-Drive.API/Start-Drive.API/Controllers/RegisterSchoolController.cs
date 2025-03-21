using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Start_Drive.API.Identity;
using Start_Drive.API.Models;
using Start_Drive.API.Services;
using System.Security.Claims;

namespace Start_Drive.API.Controllers
{
    [ApiController]
    [Route("startDrive/rejestracja")]
    public class RegisterSchoolController : ControllerBase
    {
        private readonly IRegisterSchoolService _registerSchoolService;
        public RegisterSchoolController(IRegisterSchoolService iRegisterSchoolService)
        {
            _registerSchoolService = iRegisterSchoolService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult CreateSchool([FromBody] RegisterSchool reg)
        {
            var id = _registerSchoolService.CreateDrivingSchool(reg);
            return Ok(id);
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpGet("{schoolId}")]
        public ActionResult<RegisterSchool> GetInformationSchool([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var schoolInformation = _registerSchoolService.GetSchoolInformation(schoolId);
                return Ok(schoolInformation);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}")]
        public ActionResult UpdateSchool([FromRoute] int schoolId, [FromBody] RegisterSchool registerSchool)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _registerSchoolService.UpdateSchool(schoolId, registerSchool);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}")]
        public ActionResult DeleteSchool([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _registerSchoolService.DeleteSchool(schoolId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }


        //----------------------------------------------------------- Register Instructor -------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("instruktor")]
        public ActionResult<int> CreateInstructorAccount([FromBody] RegisterStudentInstructor regInst)
        {
            var id = _registerSchoolService.CreateInstructorAccount(regInst);
            return Ok(id);
        }


        //----------------------------------------------------------- Register Student -------------------------------------------------------

        [AllowAnonymous]
        [HttpPost("kursant")]
        public ActionResult<int> CreateStudentAccount([FromBody] RegisterStudentInstructor regStud)
        {
            var id = _registerSchoolService.CreateStudentAccount(regStud);
            return Ok(id);
        }
    }
}
