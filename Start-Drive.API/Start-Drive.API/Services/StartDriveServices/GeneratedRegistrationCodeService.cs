using Start_Drive.API.Data;
using Start_Drive.API.Models;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IGeneratedRegistrationCodeService
    {
        public int AddRegistrationCode(GeneratedRegistrationCode code, int schoolId);
    }
    public class GeneratedRegistrationCodeService: IGeneratedRegistrationCodeService
    {
        private readonly StartDriveDbContext _context;
        public GeneratedRegistrationCodeService(StartDriveDbContext context)
        {
            _context = context;
        }

        public int AddRegistrationCode(GeneratedRegistrationCode code, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var generateCode = BCrypt.Net.BCrypt.EnhancedHashPassword(code.GeneratedCode, 13);

            var registrationCode = _context.GeneratedRegistrationCodes.FirstOrDefault(g => g.PersonType == code.PersonType && g.PersonEmail == code.PersonEmail && g.DrivingSchoolId == schoolId);

            if (registrationCode is null)
            {
                var registrationCodeVariable = code;
                registrationCodeVariable.DrivingSchoolId = schoolId;
                registrationCodeVariable.DrivingSchoolEmail = drivingSchool.Email;
                registrationCodeVariable.GeneratedCode = generateCode;

                _context.Add(registrationCodeVariable);
                _context.SaveChanges();

                if(code.PersonType == "instructor")
                {
                    var instructor = _context.Instructors.FirstOrDefault(i => i.Email == code.PersonEmail && i.DrivingSchoolId == code.DrivingSchoolId);
                    instructor.Password = "";
                    _context.SaveChanges();
                }
                else if(code.PersonType == "student")
                {
                    var student = _context.Students.FirstOrDefault(s => s.Email == code.PersonEmail && s.DrivingSchoolId == code.DrivingSchoolId);
                    student.Password = "";
                    _context.SaveChanges();
                }

                return registrationCodeVariable.Id;
            }
            else
            {
                registrationCode.GeneratedCode = generateCode;
                _context.SaveChanges();

                if (code.PersonType == "instructor")
                {
                    var instructor = _context.Instructors.FirstOrDefault(i => i.Email == code.PersonEmail && i.DrivingSchoolId == code.DrivingSchoolId);
                    instructor.Password = "";
                    _context.SaveChanges();
                }
                else if (code.PersonType == "student")
                {
                    var student = _context.Students.FirstOrDefault(s => s.Email == code.PersonEmail && s.DrivingSchoolId == code.DrivingSchoolId);
                    student.Password = "";
                    _context.SaveChanges();
                }

                return registrationCode.Id;
            }

        }
    }
}
