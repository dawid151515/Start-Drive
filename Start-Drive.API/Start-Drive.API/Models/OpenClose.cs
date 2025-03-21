namespace Start_Drive.API.Models
{
    public class OpenClose
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }

        //0 - Sunday, 1 - Monday, 2-Tuesday ...
        public int DayOfTheWeek { get; set; }
        public bool IsOpen { get; set; }
        public double FirstHour { get; set; }
        public double LastHour { get; set; }
    }
}
