namespace Start_Drive.API.Models.forumModel
{
    public class Answers
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        public Questions Questions { get; set; }
        public int QuestionsId { get; set; }
        public int PersonId { get; set; }

        public string WhoReplied { get; set; }
        public DateTime DateAdded { get; set; }
        public string AnswerText { get; set; }
    }
}
