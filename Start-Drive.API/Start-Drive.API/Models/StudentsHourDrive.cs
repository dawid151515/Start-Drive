using Start_Drive.API.Models.instructorModel;

namespace Start_Drive.API.Models
{
    public class StudentsHourDrive
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }
        public int StudentId { get; set; }
        public Instructor Instructor { get; set; }
        public int InstructorId { get; set;}

        public DateTime DateAddedDrive { get; set; }
        public double MainHourFrom { get; set; }
        public double MainHourTo { get; set;}
        public string Color { get; set; }
        public string Description { get; set; }
    }
}
