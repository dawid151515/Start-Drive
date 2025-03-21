import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { Student } from 'src/app/models/student.model';
import { RemoveStudentCoursePopupComponent } from '../remove-student-course-popup/remove-student-course-popup.component';
import { RemoveCourseRoundPopupComponent } from '../remove-course-round-popup/remove-course-round-popup.component';
import { EditCourseRoundPopupComponent } from '../edit-course-round-popup/edit-course-round-popup.component';
import { AddCourseRoundPopupComponent } from '../add-course-round-popup/add-course-round-popup.component';
import { AddStudentCoursePopupComponent } from '../add-student-course-popup/add-student-course-popup.component';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { LessonsHoursPopupComponent } from '../lessons-hours-popup/lessons-hours-popup.component';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { StudentService } from 'src/app/service/student-service/student.service';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';

@Component({
  selector: 'app-course-rounds',
  templateUrl: './course-rounds.component.html',
  styleUrls: ['./course-rounds.component.css']
})
export class CourseRoundsComponent {

  ngOnInit(): void{
    this.getStudentsRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private studentService: StudentService,
    private instructorService: InstructorService, private courseRoundsService: CourseRoundsService,
    private mainCalendarService: MainCalendarService){}

  pageName: string = 'Tury kursów'

  courseRoundsTable: CourseRoundsModel[] = []

  arrayPersons: Student[] = []

  arrayInstuctors: Instructor[] = []

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
    this.pastRoundsCoursesTable.reverse()
  }

  toLocaleDateStringFunction(selectDate: Date): string{
    return new Date(selectDate).toLocaleDateString()
  }

  scrollPositionCurrent: number = 0
  scrollPositionFuture: number = 0
  scrollPositionPast: number = 0
  getScrollPositionFromDiv(){
    this.scrollPositionCurrent = document.getElementsByClassName('currentRoundsCourses')[0].scrollTop
    this.scrollPositionFuture = document.getElementsByClassName('futureRoundsCourses')[0].scrollTop
    this.scrollPositionPast = document.getElementsByClassName('pastRoundsCourses')[0].scrollTop
  }

  addCourseRoundDialog(){
    this.dialogRef.open(AddCourseRoundPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId
      }
    })
  }
  addStudentCourseRoundDialog(courseRound: CourseRoundsModel){
    this.getScrollPositionFromDiv()
    this.dialogRef.open(AddStudentCoursePopupComponent, {
      data: {
        selected: courseRound,
        schoolIdRoute: this.schoolId,
        arrayPersons: this.arrayPersons,

        scrollPosition: scrollY,
        scrollPositionCurrent: this.scrollPositionCurrent,
        scrollPositionFuture: this.scrollPositionFuture,
        scrollPositionPast: this.scrollPositionPast
      }
    })
  }
  editCourseRoundDialog(courseRound: CourseRoundsModel){
    this.getScrollPositionFromDiv()
    this.dialogRef.open(EditCourseRoundPopupComponent,{
      data: {
        selected: courseRound,
        schoolIdRoute: this.schoolId,

        scrollPosition: scrollY,
        scrollPositionCurrent: this.scrollPositionCurrent,
        scrollPositionFuture: this.scrollPositionFuture,
        scrollPositionPast: this.scrollPositionPast
      }
    })
  }
  removeCourseRoundDialog(courseRound: CourseRoundsModel){
    this.getScrollPositionFromDiv()
    this.dialogRef.open(RemoveCourseRoundPopupComponent,{
      data: {
        selected: courseRound,
        schoolIdRoute: this.schoolId,

        scrollPosition: scrollY,
        scrollPositionCurrent: this.scrollPositionCurrent,
        scrollPositionFuture: this.scrollPositionFuture,
        scrollPositionPast: this.scrollPositionPast
      }
    })
  }
  removeStudentCourseDialog(student: CourseRoundsStudentsId, courseRound: CourseRoundsModel){
    this.getScrollPositionFromDiv()
    this.dialogRef.open(RemoveStudentCoursePopupComponent,{
      data: {
        selected: student,
        schoolIdRoute: this.schoolId,
        selectedCourseRound: courseRound,
        students: this.arrayPersons,

        scrollPosition: scrollY,
        scrollPositionCurrent: this.scrollPositionCurrent,
        scrollPositionFuture: this.scrollPositionFuture,
        scrollPositionPast: this.scrollPositionPast
      }
    })
  }
  showDrivingLessonsHoursStudentDialog(student: CourseRoundsStudentsId){
    this.dialogRef.open(LessonsHoursPopupComponent, {
      data: {
        selected: student,
        schoolIdRoute: this.schoolId,
        students: this.arrayPersons,
        instructors: this.arrayInstuctors,
        calendarStudentsDrive: this.calendarStudentsDriveAll
      }
    })
  }

  setCurrentRefreshDay(){

    if(localStorage.getItem('scrollPositionMain') != null){
      setTimeout(() => {
        var scroll = Number(localStorage.getItem('scrollPositionMain'))
        window.scroll(0, scroll)
        localStorage.removeItem('scrollPositionMain')

        if(localStorage.getItem('scrollPositionCurrent') != null){
          var scrollCurrent = Number(localStorage.getItem('scrollPositionCurrent'))
          document.getElementsByClassName('currentRoundsCourses')[0].scrollTop = scrollCurrent
          localStorage.removeItem('scrollPositionCurrent')
        }

        if(localStorage.getItem('scrollPositionFuture') != null){
            var scrollFuture = Number(localStorage.getItem('scrollPositionFuture'))
            document.getElementsByClassName('futureRoundsCourses')[0].scrollTop = scrollFuture
            localStorage.removeItem('scrollPositionFuture')
        }

        if(localStorage.getItem('scrollPositionPast') != null){
            var scrollPast = Number(localStorage.getItem('scrollPositionPast'))
            document.getElementsByClassName('pastRoundsCourses')[0].scrollTop = scrollPast
            localStorage.removeItem('scrollPositionPast')
        }
      }, 250)
    }
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getStudentsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
      this.setCurrentRefreshDay()
    })

    this.getInstructorsRoute()
    this.getHoursDriveRoute()
    this.getCourseRoundsRoute()
  }

  getInstructorsRoute(){

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayInstuctors = response
    })
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
