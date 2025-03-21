using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Start_Drive.API.Identity;
using Start_Drive.API.Models;
using Start_Drive.API.Services.StartDriveServices;
using System.Security.Claims;

namespace Start_Drive.API.Controllers.StartDriveControllers
{
    [ApiController]
    [Route("startDrive/generujKod")]
    public class GeneratedRegistrationCodeController : ControllerBase
    {
        private readonly IGeneratedRegistrationCodeService _GeneratedCodeService;
        public GeneratedRegistrationCodeController(IGeneratedRegistrationCodeService generatedCodeService)
        {
            _GeneratedCodeService = generatedCodeService;
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("{schoolId}")]
        public ActionResult CreateRegistrationCode([FromBody] GeneratedRegistrationCode code, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var codeId = _GeneratedCodeService.AddRegistrationCode(code, schoolId);
                return Ok(codeId);
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
