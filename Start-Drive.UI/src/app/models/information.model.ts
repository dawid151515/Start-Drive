import { RegisterSchool } from "./register-school.model"

export interface Information{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  forWhom: string,
  info: string
}
