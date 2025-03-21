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
    [Route("startDrive/stronaGlowna/kursanci")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _studentService;
        public StudentController(IStudentService studentService)
        {
            _studentService = studentService;
        }


        [Authorize]
        [HttpGet("{schoolId}")]
        public ActionResult<IEnumerable<StudentDto>> GetStudentsAll([FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var students = _studentService.GetStudents(schoolId);
                return Ok(students);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "student")]
        [HttpGet("{schoolId}/{studentId}")]
        public ActionResult<Student> GetStudent([FromRoute] int schoolId, [FromRoute] int studentId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var student = _studentService.GetStudentById(studentId);
                

                var cheskUserId = User.FindFirstValue("studentId");
                var cheskUserEmail = User.FindFirstValue("emailAddress");
                if (int.Parse(cheskUserId) == student.Id && cheskUserEmail == student.Email)
                {
                    return Ok(student);
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
        public ActionResult CreateStudent([FromBody] Student student, [FromRoute] int schoolId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                var studentId = _studentService.AddStudent(student, schoolId);
                return Ok(studentId);
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpPut("{schoolId}/{studentId}")]
        public ActionResult UpdateStudent([FromRoute] int schoolId, [FromRoute] int studentId, [FromBody] Student student)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _studentService.UpdateStudent(studentId, student);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }

        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "school")]
        [HttpDelete("{schoolId}/{studentId}")]
        public ActionResult DeleteInstructor([FromRoute] int schoolId, [FromRoute] int studentId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            if (int.Parse(cheskUser) == schoolId)
            {
                _studentService.DeleteStudent(studentId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }


        //----------------------------------------------------------- StudentPage ---------------------------------------------------


        [Authorize]
        [RequiresClaim(IdentityData.AdminUserClaimName, "student")]
        [HttpDelete("kontoKursanta/{schoolId}/{studentId}")]
        public ActionResult DeleteStudentForStudentPage([FromRoute] int schoolId, [FromRoute] int studentId)
        {
            var cheskUser = User.FindFirstValue("schoolId");
            var cheskStudent = User.FindFirstValue("studentId");
            if (int.Parse(cheskUser) == schoolId && int.Parse(cheskStudent) == studentId)
            {
                _studentService.DeleteStudentForStudentPage(schoolId, studentId);
                return Ok();
            }
            else
            {
                return new ForbidResult();
            }
        }
    }
}
