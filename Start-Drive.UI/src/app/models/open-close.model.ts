import { RegisterSchool } from "./register-school.model";

export interface OpenClose{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  dayOfTheWeek: number,
  isOpen: boolean,
  firstHour: number,
  lastHour: number
}
