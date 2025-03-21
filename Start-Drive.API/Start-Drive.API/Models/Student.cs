namespace Start_Drive.API.Models
{
    public class Student
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        public string Name { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        public string PlaceOfBirth { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }


        public string Email { get; set; }
        public string Password { get; set; }
    }
}
