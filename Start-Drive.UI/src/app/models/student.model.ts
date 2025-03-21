import { RegisterSchool } from "./register-school.model";

export interface Student{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,

  name: string,
  lastName: string,
  dateOfBirth: Date,
  placeOfBirth: string,
  address: string,
  phoneNumber: string,

  email: string,
  password?: string
}
