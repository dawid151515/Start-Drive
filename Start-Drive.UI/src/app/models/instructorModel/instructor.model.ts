import { StudentsHourDrive } from "../students-hour-drive.model"
import { InstructorAbsence } from "./instructor-absence.model"
import { RegisterSchool } from "../register-school.model"

export interface Instructor{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,
  studentsHourDrivesSchool?: StudentsHourDrive[],

  name: string,
  lastName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  address: string,
  phoneNumber: string,
  instructorDaysOff?: InstructorAbsence[],

  email: string,
  password?: string
}


