import { CourseRoundsStudentsId } from "./course-rounds-students-id.model";
import { RegisterSchool } from "./register-school.model";

export interface CourseRoundsModel{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  name: string,
  from: Date,
  to: Date,
  studentsThisRoundCourse: CourseRoundsStudentsId[]
}
