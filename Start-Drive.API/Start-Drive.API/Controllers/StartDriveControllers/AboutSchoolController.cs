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
    [Route("startDrive/stronaGlowna/oSzkoleJazdy")]
    public class AboutSchoolController : ControllerBase
    {
        private IAboutSchoolService _aboutSchoolService;
        public AboutSchoolController(IAboutSchoolService aboutSchoolService)
        {
            _aboutSchoolService = aboutSchoolService;
        }


        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<ADrivingSchoolDto> GetAboutDrivingSchool([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var aboutDrivingSchool = _aboutSchoolService.GetAboutSchoolById(schoolId);
                return Ok(aboutDrivingSchool);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}/{aboutSchoolId}")]
        public ActionResult UppdateAboutSchool([FromRoute] int aboutSchoolId, [FromBody] ADrivingSchool editAboutSchool)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == aboutSchoolId)
            {
                _aboutSchoolService.UpdateAboutSchool(aboutSchoolId, editAboutSchool);

                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
            
        }
    }
}
