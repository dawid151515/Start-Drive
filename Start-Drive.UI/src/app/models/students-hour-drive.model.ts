import { Instructor } from "./instructorModel/instructor.model"
import { RegisterSchool } from "./register-school.model"

export interface CalendarStudents{
  HourNumber: number,
  MainHourDriveStudents: StudentsHourDrive[]
}

export interface StudentsHourDrive{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  studentId?: number
  instructor?: Instructor,
  instructorId?: number,

  dateAddedDrive: Date,
  mainHourFrom: number,
  mainHourTo: number,
  color: string,
  description: string
}
