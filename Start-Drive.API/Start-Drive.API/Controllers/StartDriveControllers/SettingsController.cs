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
    [Route("startDrive/stronaGlowna/ustawienia")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;
        public SettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }


        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<OpenCloseDto>> GetOpenCloses([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var openCloseAll = _settingsService.GetAllOpenCloseDay(schoolId);
                return Ok(openCloseAll);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}")]
        public ActionResult UpdateOpenClose([FromBody] IEnumerable<OpenClose> openCl, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _settingsService.UpdateOpenCloseDay(openCl, schoolId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpGet("pojedynczeWolne/{schoolId}")]
        public ActionResult<IEnumerable<SingleCloseDto>> GetSingleCloses([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var singleCloseAll = _settingsService.GetAllSingleCloseDay(schoolId);
                return Ok(singleCloseAll);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPost("pojedynczeWolne/{schoolId}")]
        public ActionResult CreateSingleClose([FromBody] SingleClose singleClose, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var singleCloseId = _settingsService.AddSingleCloseDay(singleClose, schoolId);
                return Ok(singleCloseId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("pojedynczeWolne/{schoolId}/{singleCloseId}")]
        public ActionResult DeleteSingleClose([FromRoute] int schoolId, [FromRoute] int singleCloseId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _settingsService.DeleteSingleCloseDay(singleCloseId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [HttpGet("czasMiedzyJazdami/{schoolId}")]
        public ActionResult<double> GetBreakBetweenRidersSettings([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var breakBetween = _settingsService.GetBreakBetweenRides(schoolId);
                return Ok(breakBetween);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("czasMiedzyJazdami/{schoolId}")]
        public ActionResult UpdateBreakBetweenRides([FromRoute] int schoolId, [FromBody] double BreakBetweenRides)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _settingsService.UpdateBreakBetweenRides(schoolId, BreakBetweenRides);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
