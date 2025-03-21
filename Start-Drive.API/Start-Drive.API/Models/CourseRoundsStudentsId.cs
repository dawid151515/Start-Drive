namespace Start_Drive.API.Models
{
    public class CourseRoundsStudentsId
    {
        public int Id { get; set; }
        public int IdDrivingSchool { get; set; }

        public CourseRoundsModel CourseRoundsModel { get; set; }
        public int CourseRoundsModelId { get; set; }

        public int CourseRoundStudentId { get; set; }
    }
}
