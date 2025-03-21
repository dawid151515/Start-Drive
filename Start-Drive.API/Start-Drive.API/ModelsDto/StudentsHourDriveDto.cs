namespace Start_Drive.API.ModelsDto
{
    public class StudentsHourDriveDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }
        public int StudentId { get; set; }
        public int InstructorId { get; set; }

        public DateTime DateAddedDrive { get; set; }
        public double MainHourFrom { get; set; }
        public double MainHourTo { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
