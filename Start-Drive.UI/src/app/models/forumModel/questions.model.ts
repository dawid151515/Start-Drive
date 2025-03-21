import { RegisterSchool } from "../register-school.model"
import { Answers } from "./answers.model";

export interface Questions{
  id?: number,
  drivingSchool?: RegisterSchool,
  drivingSchoolId?: number,
  personId: number,

  askedQuestion: string,
  dateAdded: Date,
  questionText: string,
  answer: Answers[],
}
