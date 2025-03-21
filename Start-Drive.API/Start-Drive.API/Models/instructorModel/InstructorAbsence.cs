namespace Start_Drive.API.Models.instructorModel
{
    public class InstructorAbsence
    {
        public int Id { get; set; }
        public int IdDrivingSchool { get; set; }
        public Instructor Instructor { get; set; }
        public int InstructorId { get; set; }

        public string DateAbsenceKey { get; set; }
        public string ReasonAbsenceValue { get; set; }
    }
}
