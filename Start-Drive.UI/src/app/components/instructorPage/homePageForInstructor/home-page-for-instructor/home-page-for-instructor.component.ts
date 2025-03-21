import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorAbsence } from 'src/app/models/instructorModel/instructor-absence.model';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-home-page-for-instructor',
  templateUrl: './home-page-for-instructor.component.html',
  styleUrls: ['./home-page-for-instructor.component.css']
})
export class HomePageForInstructorComponent {

  ngOnInit(): void{
    this.getInstructorRoute()
  }

  constructor(private aRoute: ActivatedRoute, private instructorService: InstructorService, private studentService: StudentService,
    private settingsService: SettingsService){}

  pageName: string= 'Strona główna'


  // ----------------------------------------------------calendar data--------------------------------------------------

  day: number = new Date().getDate()
  month: number = new Date().getMonth()+1
  year: number = new Date().getFullYear()

  logInInstructor: Instructor = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: "",
    instructorDaysOff: []
  }

  arrayPersons: Student[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []

  //table with individual non-working days, holidays, etc..
  freeDaysCalendarToConvert: SingleClose[] = []

  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  freeDaysConvert(){

    this.freeDaysCalendarToConvert.forEach(free => {
      this.freeDaysCalendar[free.dateCloseKey] = free.openCloseValue
    });
  }

  //Absences table
  instructorDaysOffToConvert: InstructorAbsence[] = []

  freeDaysInstructor: {[dayInYear: string]: string} = {}

  instructorDaysOffConvert(){

    if(this.logInInstructor.instructorDaysOff != undefined){

      this.instructorDaysOffToConvert = this.logInInstructor.instructorDaysOff

      this.logInInstructor.instructorDaysOff.forEach(daysOffInstructor => {
        this.freeDaysInstructor[daysOffInstructor.dateAbsenceKey] = daysOffInstructor.reasonAbsenceValue
      })
    }
  }

  daysAndHours: OpenClose[] = [
    {dayOfTheWeek: 0, isOpen: false, firstHour: 1, lastHour: 23}, // i=0 Sunday
    {dayOfTheWeek: 1, isOpen: true, firstHour: 1, lastHour: 23}, // i=1 Monday
    {dayOfTheWeek: 2, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 3, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 4, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 5, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 6, isOpen: false, firstHour: 1, lastHour: 23}
  ]

  checkCorrectOrderDaysAndHours(){
    var checkResult
    this.daysAndHours.forEach(e => {
      var i=0
      if(e.dayOfTheWeek != i){
        i++
        checkResult = false
        return false
      }else{
        checkResult = true
        return true
      }
    });

    if(checkResult == false){
      this.daysAndHours.sort(function (a, b) {  return a.dayOfTheWeek - b.dayOfTheWeek;  })
    }
  }

  initVariable: boolean = false
  sleepTimeOut(){
    setTimeout(() => this.initVariable = true, 1000)
  }


  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  instructorId: number = -20
  getInstructorRoute(){

    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.instructorId = Number(this.aRoute.snapshot.paramMap.get('instructorId'))

    this.instructorService.getInstructor(this.schoolId, this.instructorId).subscribe((response) => {
      this.logInInstructor = response

      if(this.logInInstructor.studentsHourDrivesSchool != undefined){
        this.calendarStudentsDriveAll = this.logInInstructor.studentsHourDrivesSchool
      }

      this.instructorDaysOffConvert()
    })

    this.getStudentsRoute()
    this.getOpenCloseRoute()
    this.getSingleCloseRoute()
  }

  getStudentsRoute(){

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
    })
  }

  getOpenCloseRoute(){

    this.settingsService.getOpenClose(this.schoolId).subscribe((response) => {
      this.daysAndHours = response
      this.checkCorrectOrderDaysAndHours()
    })
  }

  getSingleCloseRoute(){

    this.settingsService.getSingleClose(this.schoolId).subscribe((response) => {
      this.freeDaysCalendarToConvert = response

      this.freeDaysConvert()
      this.sleepTimeOut()
    })
  }
}
