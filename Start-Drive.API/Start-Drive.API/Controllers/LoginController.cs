using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Start_Drive.API.Models;
using Start_Drive.API.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Start_Drive.API.Controllers
{
    [ApiController]
    [Route("startDrive/login")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ILoginService _loginService;
        public LoginController(ILoginService loginService, IConfiguration configuration)
        {
            _configuration = configuration;
            _loginService = loginService;
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult CheckCorrectness([FromBody] Login checkData)
        {
            if(checkData.SchoolOrStudent == "school")
            {
                var loggedSchool = _loginService.CheckLoginSchool(checkData);

                var token = "";
                if (loggedSchool != null)
                {
                    var identity = new ClaimsIdentity(new Claim[]
                    {
                        /*new Claim(ClaimTypes.SerialNumber, loggedSchool.Id.ToString()),
                        new Claim(ClaimTypes.Name, loggedSchool.Name),
                        new Claim(ClaimTypes.Email, loggedSchool.Email),
                        new Claim(ClaimTypes.Locality, loggedSchool.Address),
                        new Claim(ClaimTypes.Role, "school"),*/

                        new Claim("schoolId", loggedSchool.Id.ToString()),
                        new Claim("name", loggedSchool.Name),
                        new Claim("emailAddress", loggedSchool.Email),
                        new Claim("locality", loggedSchool.Address),
                        new Claim("roleApp", "school")
                    });

                    token = CreateJwt(identity);
                }

                return Ok(new
                {
                    loggedSchoolData = loggedSchool,
                    sendToken = token
                });
            }
            else if(checkData.SchoolOrStudent == "instructor")
            {
                var loggedInstructor = _loginService.CheckLoginInstructor(checkData);

                var token = "";
                if (loggedInstructor != null)
                {
                    var identity = new ClaimsIdentity(new Claim[]
                    {
                        /*new Claim(ClaimTypes.SerialNumber, loggedInstructor.Id.ToString()),
                        new Claim(ClaimTypes.Name, $"{loggedInstructor.Name} {loggedInstructor.LastName}"),
                        new Claim(ClaimTypes.Email, loggedInstructor.Email),
                        new Claim(ClaimTypes.Locality, loggedInstructor.Address),
                        new Claim(ClaimTypes.Role, "instructor")*/

                        new Claim("instructorId", loggedInstructor.Id.ToString()),
                        new Claim("schoolId", loggedInstructor.DrivingSchoolId.ToString()),
                        new Claim("name", $"{loggedInstructor.Name} {loggedInstructor.LastName}"),
                        new Claim("emailAddress", loggedInstructor.Email),
                        new Claim("locality", loggedInstructor.Address),
                        new Claim("roleApp", "instructor")
                    });

                    token = CreateJwt(identity);
                }

                return Ok(new
                {
                    loggedInstructorData = loggedInstructor,
                    sendToken = token
                });
            }
            else if (checkData.SchoolOrStudent == "student")
            {
                var loggedStudent = _loginService.CheckLoginStudent(checkData);

                var token = "";
                if (loggedStudent != null)
                {
                    var identity = new ClaimsIdentity(new Claim[]
                    {
                        /*new Claim(ClaimTypes.SerialNumber, loggedStudent.Id.ToString()),
                        new Claim(ClaimTypes.Name, $"{loggedStudent.Name} {loggedStudent.LastName}"),
                        new Claim(ClaimTypes.Email, loggedStudent.Email),
                        new Claim(ClaimTypes.Locality, loggedStudent.Address),
                        new Claim(ClaimTypes.Role, "student")*/

                        new Claim("studentId", loggedStudent.Id.ToString()),
                        new Claim("schoolId", loggedStudent.DrivingSchoolId.ToString()),
                        new Claim("name", $"{loggedStudent.Name} {loggedStudent.LastName}"),
                        new Claim("emailAddress", loggedStudent.Email),
                        new Claim("locality", loggedStudent.Address),
                        new Claim("roleApp", "student")
                    });

                    token = CreateJwt(identity);
                }

                return Ok(new
                {
                    loggedStudentData = loggedStudent,
                    sendToken = token
                });
            }
            else
            {
                return null;
            }
        }

        private string CreateJwt(ClaimsIdentity claim)
        {
            string configurationKey = _configuration.GetValue<string>("AuthSettings:securityKey");
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configurationKey);
            var identity = claim;
            
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _configuration.GetValue<string>("AuthSettings:validIssuer"),
                Audience = _configuration.GetValue<string>("AuthSettings:validAudience"),
                Subject = identity,
                Expires = DateTime.Now.AddHours(10),
                SigningCredentials = credentials
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }
    }
}
