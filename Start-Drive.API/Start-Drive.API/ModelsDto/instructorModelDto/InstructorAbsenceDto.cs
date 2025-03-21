namespace Start_Drive.API.ModelsDto.instructorModelDto
{
    public class InstructorAbsenceDto
    {
        public int Id { get; set; }
        public int IdDrivingSchool { get; set; }
        public int InstructorId { get; set; }

        public string DateAbsenceKey { get; set; }
        public string ReasonAbsenceValue { get; set; }
    }
}
