using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.Models.instructorModel;

namespace Start_Drive.API.Services
{
    public interface ILoginService
    {
        public RegisterSchool CheckLoginSchool(Login checkData);
        public Instructor CheckLoginInstructor(Login checkData);
        public Student CheckLoginStudent(Login checkData);
    }
    public class LoginService : ILoginService
    {
        private readonly StartDriveDbContext _context;
        public LoginService(StartDriveDbContext context) 
        { 
            _context = context;
        }

        public RegisterSchool CheckLoginSchool(Login checkData)
        {
            if (checkData.SchoolOrStudent == "school")
            {
                var userSchool = _context.RegisterSchools.FirstOrDefault(r => r.Email == checkData.Email);

                if (userSchool != null)
                {
                    if (BCrypt.Net.BCrypt.EnhancedVerify(checkData.Password, userSchool.Password))
                    {
                        return userSchool;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public Instructor CheckLoginInstructor(Login checkData)
        {
            if (checkData.SchoolOrStudent == "instructor")
            {
                var instructor = _context.Instructors.FirstOrDefault(r => r.Email == checkData.Email);

                if (instructor != null)
                {
                    if (instructor.Password != "" && BCrypt.Net.BCrypt.EnhancedVerify(checkData.Password, instructor.Password))
                    {
                        return instructor;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

        public Student CheckLoginStudent(Login checkData)
        {
            if (checkData.SchoolOrStudent == "student")
            {
                var student = _context.Students.FirstOrDefault(r => r.Email == checkData.Email);

                if (student != null)
                {
                    if (student.Password != "" && BCrypt.Net.BCrypt.EnhancedVerify(checkData.Password, student.Password))
                    {
                        return student;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }
    }
}
