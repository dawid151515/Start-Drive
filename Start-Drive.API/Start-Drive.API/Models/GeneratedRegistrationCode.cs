namespace Start_Drive.API.Models
{
    public class GeneratedRegistrationCode
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        public string DrivingSchoolEmail { get; set; }
        public string PersonType { get; set; }
        public int PersonId { get; set; }
        public string PersonEmail { get; set; }
        public string GeneratedCode { get; set; }
    }
}
