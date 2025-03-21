namespace Start_Drive.API.Models
{
    public class SingleClose
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        public string DateCloseKey { get; set; }
        public bool OpenCloseValue { get; set; }
    }
}
