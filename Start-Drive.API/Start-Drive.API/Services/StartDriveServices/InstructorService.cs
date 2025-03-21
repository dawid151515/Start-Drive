using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.Models.instructorModel;
using Start_Drive.API.ModelsDto.instructorModelDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IInstructorService
    {
        public IEnumerable<InstructorDto> GetInstructors(int idDrivingSchool);
        public InstructorDto GetInstructorById(int schoolId, int idInstructor);
        public RegisterSchool GetSchoolByIdForInstructor(int schoolId);
        public int AddInstructor(Instructor inst, int schoolId);
        public void UpdateInstructor(int instructorId, Instructor editDataInstructor);
        public void DeleteInstructor(int instructorId);
        public int AddInstructorAbsence(int schoolId, int instructorId, List<InstructorAbsence> abs);
        public void DeleteAbsence(List<int> absenceId);

        //----------------------------------------------------------- InstructorPage ---------------------------------------------------
        public void DeleteInstructorForInstructorPage(int schoolId, int instructorId);
    }

    public class InstructorService : IInstructorService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public InstructorService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //----------------------------------------------------------- Instructors -------------------------------------------------------

        public IEnumerable<InstructorDto> GetInstructors(int idDrivingSchool)
        {
            var allInstructors = _context.Instructors.Where(inst => inst.DrivingSchoolId == idDrivingSchool).Include(s => s.StudentsHourDrivesSchool)
                .Include(a => a.InstructorDaysOff).OrderBy(inst => inst.Name).ToList();

            if (allInstructors != null)
            {
                var allInstructorsDto = _mapper.Map<List<InstructorDto>>(allInstructors);
                return allInstructorsDto;
            }
            else
            {
                return null;
            }
        }

        public InstructorDto GetInstructorById(int schoolId, int instructorId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(s => s.Id == schoolId);
            if (school is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var selectedInstructor = _context.Instructors.Include(i => i.InstructorDaysOff).Include(i => i.StudentsHourDrivesSchool)
                .FirstOrDefault(inst => inst.Id == instructorId && inst.DrivingSchoolId == schoolId);

            if(selectedInstructor != null)
            {
                var selectedInstructorDto = _mapper.Map<InstructorDto>(selectedInstructor);
                return selectedInstructorDto;
            }
            else
            {
                return null;
            }
        }
        public RegisterSchool GetSchoolByIdForInstructor(int schoolId)
        {
            var selectedSchool = _context.RegisterSchools.FirstOrDefault(sch => sch.Id == schoolId);

            if (selectedSchool != null)
            {
                return selectedSchool;
            }
            else { return null; }
        }
        public int AddInstructor(Instructor inst, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.Include(r => r.OpenCloseSchool).Include(r => r.ClosedSingleDays)
                .FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var instructor = inst;
            instructor.DrivingSchoolId = schoolId;
            instructor.Password = "";

            _context.Add(instructor);
            _context.SaveChanges();

            return instructor.Id;
        }

        public void UpdateInstructor(int instructorId, Instructor editDataInstructor)
        {
            var instructor = _context.Instructors.FirstOrDefault(i => i.Id == instructorId);

            if(instructor is null)
            {
                throw new DirectoryNotFoundException("Instructor not found");
            }

            instructor.Name = editDataInstructor.Name;
            instructor.LastName = editDataInstructor.LastName;
            instructor.DateOfBirth = editDataInstructor.DateOfBirth;
            instructor.PlaceOfBirth = editDataInstructor.PlaceOfBirth;
            instructor.Address = editDataInstructor.Address;
            instructor.PhoneNumber = editDataInstructor.PhoneNumber;
            instructor.Email = editDataInstructor.Email;

            _context.SaveChanges();
        }

        public void DeleteInstructor(int instructorId)
        {
            var instructorD = _context.Instructors.FirstOrDefault(i =>i.Id == instructorId);

            if (instructorD is null)
            {
                throw new DirectoryNotFoundException("Instructor not found");
            }

            _context.Instructors.Remove(instructorD);
            _context.SaveChanges();
        }

        //----------------------------------------------------------- Calendar Absence -------------------------------------------------------
        public int AddInstructorAbsence(int schoolId, int instructorId, List<InstructorAbsence> abs)
        {
            var absence = abs;
            foreach(InstructorAbsence element in absence)
            {
                element.IdDrivingSchool = schoolId;
                element.InstructorId = instructorId;
                _context.Add(element);
            }

            _context.SaveChanges();

            return 1;
        }

        public void DeleteAbsence(List<int> absenceId)
        {
            foreach(int element in absenceId)
            {
                var absence = _context.InstructorAbsences.FirstOrDefault(a => a.Id == element);

                if (absence is null)
                {
                    throw new DirectoryNotFoundException("Absence not found");
                }
                _context.InstructorAbsences.Remove(absence);
            }

            _context.SaveChanges();
        }
   

        //----------------------------------------------------------- InstructorPage ---------------------------------------------------

        public void DeleteInstructorForInstructorPage(int schoolId, int instructorId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(s => s.Id == schoolId);
            if (school is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var instructorD = _context.Instructors.FirstOrDefault(i => i.Id == instructorId);

            if (instructorD is null)
            {
                throw new DirectoryNotFoundException("Instructor not found");
            }

            instructorD.Password = "";
            _context.SaveChanges();
        }
    }
}
