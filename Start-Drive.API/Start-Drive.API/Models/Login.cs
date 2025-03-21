using System.ComponentModel.DataAnnotations;

namespace Start_Drive.API.Models
{
    public class Login
    {
        [Key]
        public string Email { get; set; }
        public string Password { get; set; }
        public string SchoolOrStudent { get; set; }

    }
}
