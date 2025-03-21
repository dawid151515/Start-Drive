import { ADrivingSchool } from "./about-driving-school.model";
import { StudentsHourDrive } from "./students-hour-drive.model";
import { CourseRoundsModel } from "./course-rounds.model";
import { Questions } from "./forumModel/questions.model";
import { Information } from "./information.model";
import { Instructor } from "./instructorModel/instructor.model";
import { OpenClose } from "./open-close.model";
import { SingleClose } from "./single-close.model";
import { Student } from "./student.model";

export interface RegisterSchool{
  id?: number;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
  accountNumber?: string;
  description?: string;

  instructors?: Instructor[],
  students?: Student[],
  courseRounds?: CourseRoundsModel[],
  forum?: Questions[],
  infoForMembers?: Information[],
  aboutDriving?: ADrivingSchool,

  breakBetweenRides?: number,
  openCloseSchool?: OpenClose[],
  closedSingleDays?: SingleClose[],
  drivingLessonsStudents?: StudentsHourDrive[],

  email: string,
  password?: string
}
