using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using Start_Drive.API.Identity;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;
using Start_Drive.API.Services.StartDriveServices;
using System.Security.Claims;
using Information = Start_Drive.API.Models.Information;

namespace Start_Drive.API.Controllers.StartDriveControllers
{
    [ApiController]
    [Route("startDrive/stronaGlowna/informacje")]
    public class InformationController : ControllerBase
    {
        private readonly IInformationService _informationService;
        public InformationController(IInformationService informationService)
        {
            _informationService = informationService;
        }


        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("{schoolId}")]
        public ActionResult CreateInformation([FromBody] Information information, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var informationId = _informationService.AddInformation(information, schoolId);
                return Ok(informationId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<InformationDto>> GetInformationsAll([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var information = _informationService.GetInformations(schoolId);
                return Ok(information);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}/{informationId}")]
        public ActionResult DeleteInformation([FromRoute] int schoolId, [FromRoute] int informationId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _informationService.DeleteInformation(informationId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
