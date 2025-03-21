import { RegisterSchool } from "./register-school.model";

export interface GeneratedRegistrationCode{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolEmail?: string,

  drivingSchoolId: number,
  personId: number,
  personType: string,
  personEmail: string,
  generatedCode: string
}
