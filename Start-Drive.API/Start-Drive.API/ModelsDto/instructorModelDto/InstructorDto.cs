namespace Start_Drive.API.ModelsDto.instructorModelDto
{
    public class InstructorDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }
        public List<StudentsHourDriveDto> StudentsHourDrivesSchool { get; set; }

        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string PlaceOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public List<InstructorAbsenceDto> InstructorDaysOff { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
    }
}
