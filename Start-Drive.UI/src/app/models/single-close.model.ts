import { RegisterSchool } from "./register-school.model";

export interface SingleClose{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  dateCloseKey: string,
  openCloseValue: boolean
}
