using Start_Drive.API.Models.forumModel;
using Start_Drive.API.Models.instructorModel;

namespace Start_Drive.API.Models
{
    public class RegisterSchool
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string PhoneNumber { get; set; }
        public string AccountNumber { get; set; }
        public string Description { get; set; }

        public List<Instructor> Instructors { get; set; }
        public List<Student> Students { get; set; }
        public List<CourseRoundsModel> CourseRounds { get; set; }
        public List<Questions> Forum { get; set; }
        public List<Information> InfoForMembers { get; set; }
        public ADrivingSchool AboutDriving { get; set; }

        public double BreakBetweenRides { get; set; }
        public List<OpenClose> OpenCloseSchool { get; set; }
        public List<SingleClose> ClosedSingleDays { get; set; }
        public List<StudentsHourDrive> DrivingLessonsStudents { get; set; }
        public List<GeneratedRegistrationCode> GeneratedCodes { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
    }
}
