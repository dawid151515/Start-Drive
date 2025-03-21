using AutoMapper;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IMainCalendarServices
    {
        public IEnumerable<StudentsHourDriveDto> GetDrivingHoursCalendar(int schoolId);
        public IEnumerable<StudentsHourDriveDto> GetDrivingHoursForStudent(int schoolId, int studentId);
        public int AddHourDriveStudent(int instructorId, int schoolId, string dateAddedDriveString, StudentsHourDrive studentsHourDrive);
        public void DeleteHourDrive(int hourDriveId);
    }
    public class MainCalendarServices : IMainCalendarServices
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public MainCalendarServices(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<StudentsHourDriveDto> GetDrivingHoursCalendar(int schoolId)
        {
            var allDrivingHours = _context.StudentsHourDrives.Where(s => (s.DrivingSchoolId == schoolId)).ToList();

            if (allDrivingHours != null)
            {
                var allDrivingHoursDto = _mapper.Map<List<StudentsHourDriveDto>>(allDrivingHours);
                return allDrivingHoursDto;
            }
            else
            {
                return null;
            }
        }


        //----------------------------------------------------------- Calendar Hour drive ---------------------------------------------------
        public IEnumerable<StudentsHourDriveDto> GetDrivingHoursForStudent(int schoolId, int studentId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var drivingHours = _context.StudentsHourDrives.Where(hour => (hour.StudentId == studentId && hour.DrivingSchoolId == schoolId)).ToList();

            if (drivingHours != null)
            {
                var drivingHoursDto = _mapper.Map<List<StudentsHourDriveDto>>(drivingHours);
                return drivingHoursDto;
            }
            else
            {
                return null;
            }
        }

        public int AddHourDriveStudent(int instructorId, int schoolId, string dateAddedDriveString, StudentsHourDrive studentsHourDrive)
        {
            var hourDriveStudent = studentsHourDrive;

            hourDriveStudent.DrivingSchoolId = schoolId;
            hourDriveStudent.InstructorId = instructorId;

            string date = DateTime.ParseExact(dateAddedDriveString, "yyyy-MM-dd", null).ToString("yyyy-MM-dd");
            hourDriveStudent.DateAddedDrive = DateTime.Parse(date);
            Console.WriteLine(hourDriveStudent.DateAddedDrive);

            _context.Add(hourDriveStudent);
            _context.SaveChanges();

            return hourDriveStudent.Id;
        }

        public void DeleteHourDrive(int hourDriveId)
        {
            var deleteHourDrive = _context.StudentsHourDrives.FirstOrDefault(hour => hour.Id == hourDriveId);

            if (deleteHourDrive is null)
            {
                throw new DirectoryNotFoundException("StudentHourDrive not found");
            }

            _context.Remove(deleteHourDrive);
            _context.SaveChanges();
        }
    }
}
