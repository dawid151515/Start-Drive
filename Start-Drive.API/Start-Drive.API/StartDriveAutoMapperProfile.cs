using AutoMapper;
using Start_Drive.API.Models;
using Start_Drive.API.Models.forumModel;
using Start_Drive.API.Models.instructorModel;
using Start_Drive.API.ModelsDto;
using Start_Drive.API.ModelsDto.forumModelDto;
using Start_Drive.API.ModelsDto.instructorModelDto;

namespace Start_Drive.API
{
    public class StartDriveAutoMapperProfile : Profile
    {
        public StartDriveAutoMapperProfile()
        {
            CreateMap<CourseRoundsModel, CourseRoundsModelDto>();
            CreateMap<CourseRoundsStudentsId, CourseRoundsStudentsIdDto>();
            CreateMap<Instructor, InstructorDto>();
            CreateMap<Student, StudentDto>();
            CreateMap<InstructorAbsence, InstructorAbsenceDto>();
            CreateMap<StudentsHourDrive, StudentsHourDriveDto>();
            CreateMap<RegisterSchool, RegisterSchoolDto>();
            CreateMap<OpenClose, OpenCloseDto>();
            CreateMap<SingleClose, SingleCloseDto>();
            CreateMap<Questions, QuestionsDto>();
            CreateMap<Answers, AnswersDto>();
            CreateMap<ADrivingSchool, ADrivingSchoolDto>();
            CreateMap<Information, InformationDto>();
            CreateMap<GeneratedRegistrationCode, GeneratedRegistrationCodeDto>();
        }
    }
}
