namespace Start_Drive.API.ModelsDto
{
    public class GeneratedRegistrationCodeDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        public string DrivingSchoolEmail { get; set; }
        public string PersonType { get; set; }
        public int PersonId { get; set; }
        public string PersonEmail { get; set; }
        public string GeneratedCode { get; set; }
    }
}
