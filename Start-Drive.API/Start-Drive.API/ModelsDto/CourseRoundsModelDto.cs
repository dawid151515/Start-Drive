namespace Start_Drive.API.ModelsDto
{
    public class CourseRoundsModelDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        public string Name { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public List<CourseRoundsStudentsIdDto> StudentsThisRoundCourse { get; set; }
    }
}
