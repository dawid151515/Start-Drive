using AutoMapper;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface IInformationService
    {
        public int AddInformation(Information info, int schoolId);
        public IEnumerable<InformationDto> GetInformations(int idDrivingSchool);
        public void DeleteInformation(int informationId);
    }
    public class InformationService : IInformationService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public InformationService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public int AddInformation(Information info, int schoolId)
        {
            var drivingSchool = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (drivingSchool is null)
            {
                throw new DirectoryNotFoundException("Driving school not found");
            }

            var information = info;
            information.DrivingSchoolId = schoolId;

            _context.Add(information);
            _context.SaveChanges();

            return information.Id;
        }

        public IEnumerable<InformationDto> GetInformations(int idDrivingSchool)
        {
            var allInformations = _context.Informations.Where(info => info.DrivingSchoolId == idDrivingSchool).ToList();
            allInformations.Reverse();

            if (allInformations != null)
            {
                var allInformationsDto = _mapper.Map<List<InformationDto>>(allInformations);
                return allInformationsDto;
            }
            else
            {
                return null;
            }
        }

        public void DeleteInformation(int informationId)
        {
            var informationD = _context.Informations.FirstOrDefault(info => info.Id == informationId);

            if (informationD is null)
            {
                throw new DirectoryNotFoundException("Information not found");
            }

            _context.Informations.Remove(informationD);
            _context.SaveChanges();
        }
    }
}
