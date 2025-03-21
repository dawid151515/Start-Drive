import { Instructor } from "./instructor.model";

export interface InstructorAbsence{
  id?: number,
  idDrivingSchool?: number,
  instructor?: Instructor,
  instructorId?: number,

  dateAbsenceKey: string,
  reasonAbsenceValue: string
}
