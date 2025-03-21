using AutoMapper;
using Start_Drive.API.Data;
using Start_Drive.API.Models;
using Start_Drive.API.ModelsDto;

namespace Start_Drive.API.Services.StartDriveServices
{
    public interface ISettingsService
    {
        public IEnumerable<SingleCloseDto> GetAllSingleCloseDay(int schoolId);
        public IEnumerable<OpenCloseDto> GetAllOpenCloseDay(int schoolId);
        public double GetBreakBetweenRides(int schoolId);
        public int AddSingleCloseDay(SingleClose singleCl, int schoolId);
        public void DeleteSingleCloseDay(int singleCloseId);
        public void UpdateOpenCloseDay(IEnumerable<OpenClose> openCl, int schoolId);
        public void UpdateBreakBetweenRides(int schoolId, double ridersBreak);
    }
    public class SettingsService : ISettingsService
    {
        private readonly StartDriveDbContext _context;
        private readonly IMapper _mapper;
        public SettingsService(StartDriveDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public IEnumerable<SingleCloseDto> GetAllSingleCloseDay(int schoolId)
        {
            var singleClose = _context.SingleCloses.Where(s => s.DrivingSchoolId == schoolId).ToList().OrderByDescending(s => s.DateCloseKey);

            if (singleClose != null)
            {
                var singleClodeDto = _mapper.Map<List<SingleCloseDto>>(singleClose);
                return singleClodeDto;
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<OpenCloseDto> GetAllOpenCloseDay(int schoolId)
        {
            var openClose = _context.OpenCloses.Where(o => o.DrivingSchoolId == schoolId).ToList();

            if (openClose != null)
            {
                var openCloseDto = _mapper.Map<List<OpenCloseDto>>(openClose);
                return openCloseDto;
            }
            else
            {
                return null;
            }
        }

        public double GetBreakBetweenRides(int schoolId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (school is null)
            {
                throw new DirectoryNotFoundException("DrivingSchool not found");
            }

            return school.BreakBetweenRides;
        }

        public int AddSingleCloseDay(SingleClose singleCl, int schoolId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (school is null)
            {
                throw new DirectoryNotFoundException("DrivingSchool not found");
            }

            var singleClose = singleCl;
            singleClose.DrivingSchoolId = school.Id;

            _context.Add(singleClose);
            _context.SaveChanges();

            return singleClose.Id;
        }

        public void DeleteSingleCloseDay(int singleCloseId)
        {
            var singleCloseD = _context.SingleCloses.FirstOrDefault(s => s.Id == singleCloseId);

            if (singleCloseD is null)
            {
                throw new DirectoryNotFoundException("SingleCloseDay not found");
            }

            _context.SingleCloses.Remove(singleCloseD);
            _context.SaveChanges();
        }

        public void UpdateOpenCloseDay(IEnumerable<OpenClose> openCl, int schoolId)
        {
            var school = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (school is null)
            {
                throw new DirectoryNotFoundException("DrivingSchool not found");
            }

            var openCloseTable = _context.OpenCloses.Where(o => o.DrivingSchoolId == school.Id).ToList();

            if (openCloseTable is null)
            {
                throw new DirectoryNotFoundException("OpenClose not found");
            }

            var openCloseBody = openCl.ToList();

            for (int i = 0; i<openCloseTable.Count; i++)
            {
                for(int j = 0; j<openCloseBody.Count; j++)
                {
                    if (openCloseTable[i].DayOfTheWeek == openCloseBody[j].DayOfTheWeek)
                    {
                        openCloseTable[i].IsOpen = openCloseBody[j].IsOpen;
                        openCloseTable[i].FirstHour = openCloseBody[j].FirstHour;
                        openCloseTable[i].LastHour = openCloseBody[j].LastHour;
                        break;
                    }
                }
            }

            _context.SaveChanges();
        }

        public void UpdateBreakBetweenRides(int schoolId, double ridersBreak)
        {
            var school = _context.RegisterSchools.FirstOrDefault(r => r.Id == schoolId);

            if (school is null)
            {
                throw new DirectoryNotFoundException("DrivingSchool not found");
            }

            school.BreakBetweenRides = ridersBreak;

            _context.SaveChanges();
        }
    }
}
