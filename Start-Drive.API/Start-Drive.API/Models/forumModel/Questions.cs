namespace Start_Drive.API.Models.forumModel
{
    public class Questions
    {
        public int Id { get; set; }
        public RegisterSchool DrivingSchool { get; set; }
        public int DrivingSchoolId { get; set; }
        public int PersonId { get; set; }

        public string AskedQuestion { get; set; }
        public DateTime DateAdded { get; set; }
        public string QuestionText { get; set; }
        public List<Answers> Answer { get; set; } = new List<Answers>();
    }
}
