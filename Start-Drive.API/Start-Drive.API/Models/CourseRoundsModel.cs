namespace Start_Drive.API.Models
{
    public class CourseRoundsModel
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        public string Name { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<CourseRoundsStudentsId> StudentsThisRoundCourse { get; set; }
    }
}
