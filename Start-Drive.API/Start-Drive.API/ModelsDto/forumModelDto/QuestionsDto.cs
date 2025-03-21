namespace Start_Drive.API.ModelsDto.forumModelDto
{
    public class QuestionsDto
    {
        public int Id { get; set; }
        public int DrivingSchoolId { get; set; }
        public int PersonId { get; set; }

        public string AskedQuestion { get; set; }
        public DateTime DateAdded { get; set; }
        public string QuestionText { get; set; }
        public List<AnswersDto> Answer { get; set; }
    }
}
