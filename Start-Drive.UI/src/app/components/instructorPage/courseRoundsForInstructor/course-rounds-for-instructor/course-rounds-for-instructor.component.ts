import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { LessonsHoursInstructorPopupComponent } from '../lessons-hours-instructor-popup/lessons-hours-instructor-popup.component';
import { StudentService } from 'src/app/service/student-service/student.service';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-course-rounds-for-instructor',
  templateUrl: './course-rounds-for-instructor.component.html',
  styleUrls: ['./course-rounds-for-instructor.component.css']
})
export class CourseRoundsForInstructorComponent {

  ngOnInit(): void{
    this.getStudentsRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private studentService: StudentService,
    private mainCalendarService: MainCalendarService, private courseRoundsService: CourseRoundsService){}

  pageName: string = 'Tury kursów'

  courseRoundsTable: CourseRoundsModel[] = []

  arrayPersons: Student[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []

  currentRoundsCoursesTable: CourseRoundsModel[] = []
  futureRoundsCoursesTable: CourseRoundsModel[] = []
  pastRoundsCoursesTable: CourseRoundsModel[] = []

  findStudent: Student = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2001-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  getStudent(id: number){
    var findStudent = this.arrayPersons.find(a => a.id == id)
    if(findStudent != null){
      this.findStudent = findStudent
    }
  }

  splitCourseRoundsTable(){

    for(var i=0; i<this.courseRoundsTable.length; i++){

      if(new Date(this.courseRoundsTable[i].from)<=new Date() && new Date(this.courseRoundsTable[i].to)>=new Date()){
        this.currentRoundsCoursesTable.push(this.courseRoundsTable[i])
      }else if(new Date(this.courseRoundsTable[i].from)>new Date()){
        this.futureRoundsCoursesTable.push(this.courseRoundsTable[i])
      }else{
        this.pastRoundsCoursesTable.push(this.courseRoundsTable[i])
      }
    }
  }

  toLocaleDateStringFunction(selectDate: Date): string{
    return new Date(selectDate).toLocaleDateString()
  }

  showDrivingLessonsHoursStudentDialog(student: CourseRoundsStudentsId){
    this.dialogRef.open(LessonsHoursInstructorPopupComponent, {
      data: {
        selected: student,
        schoolIdRoute: this.schoolId,
        students: this.arrayPersons,
        calendarStudentsDrive: this.calendarStudentsDriveAll
      }
    })
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getStudentsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
    })

    this.getHoursDriveRoute()
    this.getCourseRoundsRoute()
  }

  getHoursDriveRoute(){

    this.mainCalendarService.getHoursDrive(this.schoolId).subscribe((response) => {
      this.calendarStudentsDriveAll = response
    })
  }

  getCourseRoundsRoute(){

    this.courseRoundsService.getCourseRounds(this.schoolId).subscribe((response) => {
      this.courseRoundsTable = response
      this.splitCourseRoundsTable()
    })
  }
}
