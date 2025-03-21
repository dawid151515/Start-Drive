namespace Start_Drive.API.ModelsDto
{
    public class SingleCloseDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        public string DateCloseKey { get; set; }
        public bool OpenCloseValue { get; set; }
    }
}
