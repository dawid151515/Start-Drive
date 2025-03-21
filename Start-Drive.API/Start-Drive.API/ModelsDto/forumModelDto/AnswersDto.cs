namespace Start_Drive.API.ModelsDto.forumModelDto
{
    public class AnswersDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }

        public int QuestionsId { get; set; }
        public int PersonId { get; set; }

        public string WhoReplied { get; set; }
        public DateTime DateAdded { get; set; }
        public string AnswerText { get; set; }
    }
}
