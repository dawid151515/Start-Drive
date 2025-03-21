import { CourseRoundsModel } from "./course-rounds.model";

export interface CourseRoundsStudentsId{
  id?: number,
  idDrivingSchool?: number,

  courseRoundsModel?: CourseRoundsModel,
  courseRoundsModelId?: number,
  courseRoundStudentId: number
}
