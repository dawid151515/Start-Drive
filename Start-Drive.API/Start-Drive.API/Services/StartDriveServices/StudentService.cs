using AutoMapper;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IStudentService
    {
        public IEnumerable<StudentDto> GetStudents(int idDrivingSchool);
        public Student GetStudentById(int studentId);
        public int AddStudent(Student studentObj, int schoolId);
        public void UpdateStudent(int studentId, Student editDataStudent);
        public void DeleteStudent(int studentId);

        //----------------------------------------------------------- StudentPage ---------------------------------------------------
        public void DeleteStudentForStudentPage(int schoolId, int studentId);
    }
    public class StudentService : IStudentService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public StudentService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public IEnumerable<StudentDto> GetStudents(int idDrivingSchool)
        {
            var allStudents = _context.Students.Where(s => s.DrivingSchoolId == idDrivingSchool).OrderBy(s => s.Name).ToList();

            if (allStudents != null)
            {
                var allStudentsDto = _mapper.Map<List<StudentDto>>(allStudents);
                return allStudentsDto;
            }
            else
            {
                return null;
            }
        }

        public Student GetStudentById(int studentId)
        {
            var selectedStudent = _context.Students.FirstOrDefault(s => s.Id == studentId);

            if (selectedStudent != null)
            {
                return selectedStudent;
            }
            else
            {
                return null;
            }
        }

        public int AddStudent(Student studentObj, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var student = studentObj;
            student.DrivingSchoolId = schoolId;
            student.Password = "";

            _context.Add(student);
            _context.SaveChanges();

            return student.Id;
        }

        public void UpdateStudent(int studentId, Student editDataStudent)
        {
            var student = _context.Students.FirstOrDefault(s => s.Id == studentId);

            if (student is null)
            {
                throw new DirectoryNotFoundException("Student not found");
            }

            student.Name = editDataStudent.Name;
            student.LastName = editDataStudent.LastName;
            student.DateOfBirth = editDataStudent.DateOfBirth;
            student.PlaceOfBirth = editDataStudent.PlaceOfBirth;
            student.Address = editDataStudent.Address;
            student.PhoneNumber = editDataStudent.PhoneNumber;
            student.Email = editDataStudent.Email;

            _context.SaveChanges();
        }

        public void DeleteStudent(int studentId)
        {
            var studentD = _context.Students.FirstOrDefault(s => s.Id == studentId);

            if (studentD is null)
            {
                throw new DirectoryNotFoundException("Student not found");
            }

            _context.Students.Remove(studentD);
            _context.SaveChanges();
        }


        //----------------------------------------------------------- StudentPage ---------------------------------------------------

        public void DeleteStudentForStudentPage(int schoolId, int studentId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(s => s.Id == schoolId);
            if (school is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var studentD = _context.Students.FirstOrDefault(i => i.Id == studentId);

            if (studentD is null)
            {
                throw new DirectoryNotFoundException("Student not found");
            }

            studentD.Password = "";
            _context.SaveChanges();
        }
    }
}
