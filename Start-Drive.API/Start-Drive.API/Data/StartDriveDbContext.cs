using Microsoft.EntityFrameworkCore;
using Start_Drive.API.Models;
using Start_Drive.API.Models.forumModel;
using Start_Drive.API.Models.instructorModel;

namespace Start_Drive.API.Data
{
    public class StartDriveDbContext : DbContext
    {
        //we pass database connection options through the constructor
        public StartDriveDbContext(DbContextOptions options) : base(options) { }

        public DbSet<RegisterSchool> RegisterSchools { get; set; }
        public DbSet<Instructor> Instructors { get; set; }
        public DbSet<InstructorAbsence> InstructorAbsences { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Questions> Questionss { get; set; }
        public DbSet<Answers> Answerss { get; set; }
        public DbSet<ADrivingSchool> ADrivingSchools { get; set; }
        public DbSet<CourseRoundsModel> CourseRounds { get; set; }
        public DbSet<CourseRoundsStudentsId> CourseRoundsStudentsIds { get; set; }
        public DbSet<Information> Informations { get; set; }
        public DbSet<OpenClose> OpenCloses { get; set; }
        public DbSet<SingleClose> SingleCloses { get; set; }
        public DbSet<StudentsHourDrive> StudentsHourDrives { get; set; }
        public DbSet<GeneratedRegistrationCode> GeneratedRegistrationCodes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<RegisterSchool>(reg =>
            {
                reg.HasMany(i => i.Instructors).WithOne(r => r.DrivingSchool).HasForeignKey(i => i.DrivingSchoolId);
                reg.HasMany(s => s.Students).WithOne(r => r.DrivingSchool).HasForeignKey(s => s.DrivingSchoolId);
                reg.HasMany(c => c.CourseRounds).WithOne(r => r.DrivingSchool).HasForeignKey(c => c.DrivingSchoolId);
                reg.HasMany(f => f.Forum).WithOne(r => r.DrivingSchool).HasForeignKey(f => f.DrivingSchoolId);
                reg.HasMany(m => m.InfoForMembers).WithOne(r => r.DrivingSchool).HasForeignKey(m => m.DrivingSchoolId);
                reg.HasOne(a => a.AboutDriving).WithOne(r => r.DrivingSchool).HasForeignKey<ADrivingSchool>(a => a.DrivingSchoolId);
                reg.HasMany(o => o.OpenCloseSchool).WithOne(r => r.DrivingSchool).HasForeignKey(o => o.DrivingSchoolId);
                reg.HasMany(cl => cl.ClosedSingleDays).WithOne(r => r.DrivingSchool).HasForeignKey(cl => cl.DrivingSchoolId);
                reg.HasMany(d => d.DrivingLessonsStudents).WithOne(r => r.DrivingSchool).HasForeignKey(d => d.DrivingSchoolId).OnDelete(DeleteBehavior.NoAction);
                reg.HasMany(g => g.GeneratedCodes).WithOne(r => r.DrivingSchool).HasForeignKey(g => g.DrivingSchoolId);
            });

            modelBuilder.Entity<Instructor>(inst =>
            {
                inst.HasMany(h => h.StudentsHourDrivesSchool).WithOne(i => i.Instructor).HasForeignKey(h => h.InstructorId);
                inst.HasMany(d => d.InstructorDaysOff).WithOne(i => i.Instructor).HasForeignKey(d => d.InstructorId);
            });

            modelBuilder.Entity<Questions>(quest =>
            {
                quest.HasMany(a => a.Answer).WithOne(q => q.Questions).HasForeignKey(a => a.QuestionsId);
            });

            modelBuilder.Entity<CourseRoundsModel>(cour =>
            {
                cour.HasMany(c => c.StudentsThisRoundCourse).WithOne(r => r.CourseRoundsModel).HasForeignKey(c => c.CourseRoundsModelId);
            });

            modelBuilder.Entity<Login>().Property(r => r.Email).IsRequired();
            modelBuilder.Entity<Login>().Property(r => r.Password).IsRequired();
            modelBuilder.Entity<Login>().Property(r => r.SchoolOrStudent).IsRequired();

            modelBuilder.Entity<RegisterSchool>().Property(r => r.Name).IsRequired();
            modelBuilder.Entity<RegisterSchool>().Property(r => r.Address).IsRequired();
            modelBuilder.Entity<RegisterSchool>().Property(r => r.City).IsRequired();
            modelBuilder.Entity<RegisterSchool>().Property(r => r.PhoneNumber).IsRequired();
            modelBuilder.Entity<RegisterSchool>().Property(r => r.Email).IsRequired();
            modelBuilder.Entity<RegisterSchool>().Property(r => r.Password).IsRequired();
        }
    }
}
