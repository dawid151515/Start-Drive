namespace Start_Drive.API.ModelsDto
{
    public class OpenCloseDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        //0 - Sunday, 1 - Monday, 2-Tuesday ...
        public int DayOfTheWeek { get; set; }
        public bool IsOpen { get; set; }
        public double FirstHour { get; set; }
        public double LastHour { get; set; }
    }
}
