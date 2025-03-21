using AutoMapper;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IAboutSchoolService
    {
        public ADrivingSchoolDto GetAboutSchoolById(int schoolId);
        public void UpdateAboutSchool(int aboutSchoolId, ADrivingSchool editAboutSchool);
    }
    public class AboutSchoolService : IAboutSchoolService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public AboutSchoolService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public ADrivingSchoolDto GetAboutSchoolById(int schoolId)
        {
            var aboutDrivingSchool = _context.ADrivingSchools.FirstOrDefault(a => a.DrivingSchoolId == schoolId);

            if (aboutDrivingSchool != null)
            {
                var aboutDrivingSchoolDto = _mapper.Map<ADrivingSchoolDto>(aboutDrivingSchool);
                return aboutDrivingSchoolDto;
            }
            else
            {
                return null;
            }
        }
        public void UpdateAboutSchool(int aboutSchoolId, ADrivingSchool editAboutSchool)
        {
            var aboutSchool = _context.ADrivingSchools.FirstOrDefault(a => a.Id == aboutSchoolId);

            if (aboutSchool is null)
            {
                throw new DirectoryNotFoundException("AboutDrivingSchool not found");
            }

            aboutSchool.AboutText = editAboutSchool.AboutText;

            _context.SaveChanges();
        }
    }
}
