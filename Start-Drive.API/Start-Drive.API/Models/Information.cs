namespace Start_Drive.API.Models
{
    public class Information
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        public string ForWhom { get; set; }
        public string Info { get; set; }
    }
}
