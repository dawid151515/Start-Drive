import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditInstructorPopupComponent } from '../edit-instructor-popup/edit-instructor-popup.component';
import { RemoveInstructorPopupComponent } from '../remove-instructor-popup/remove-instructor-popup.component';
import { AddInstructorPopupComponent } from '../add-instructor-popup/add-instructor-popup.component';
import { GenerateLoginCodeInstructorsPopupComponent } from '../generate-login-code-instructors-popup/generate-login-code-instructors-popup.component';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { RegisterSchool } from 'src/app/models/register-school.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { StudentService } from 'src/app/service/student-service/student.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';

@Component({
  selector: 'app-instructors-home-page',
  templateUrl: './instructors-home-page.component.html',
  styleUrls: ['./instructors-home-page.component.css']
})
export class InstructorsHomePageComponent {

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute,
    private instructorService: InstructorService, private studentService: StudentService, private settingsService: SettingsService
  ){}

  ngOnInit(): void {
    this.getInstructorsRoute()
  }

  pageName: string= 'Instruktorzy'

  drivingSchoolData: RegisterSchool = {
    name: "",
    address: "",
    city: "",
    phoneNumber: "",
    email: ""
  }

  arrayPersons: Instructor[] = []

  arrayStudents: Student[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []
  studentsDriveAllForInstructor(){

    this.selectInstructor.studentsHourDrivesSchool?.forEach(drive => {
      this.calendarStudentsDriveAll.push(drive)
    })
  }

  BreakBetweenRidesMain: number = 0.30

  //a table with non-working days for each month, weekends etc. along with working hours for each day of the week
  daysAndHoursMain: OpenClose[] = [
    {dayOfTheWeek: 0, isOpen: false, firstHour: 1, lastHour: 23}, // i=0 Sunday
    {dayOfTheWeek: 1, isOpen: true, firstHour: 1, lastHour: 23}, // i=1 Monday
    {dayOfTheWeek: 2, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 3, isOpen: true, firstHour: 15, lastHour: 20},
    {dayOfTheWeek: 4, isOpen: true, firstHour: 1, lastHour: 23},
    {dayOfTheWeek: 5, isOpen: true, firstHour: 1.10, lastHour: 22.20},
    {dayOfTheWeek: 6, isOpen: false, firstHour: 1, lastHour: 23}
  ]

  checkCorrectOrderDaysAndHours(){
    var checkResult
    this.daysAndHoursMain.forEach(e => {
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
      this.daysAndHoursMain.sort(function (a, b) {  return a.dayOfTheWeek - b.dayOfTheWeek;  })
    }
  }

  freeDaysCalendarMainToConvert: SingleClose[] = []

  freeDaysConvert(){

    this.freeDaysCalendarMainToConvert.forEach(free => {
      this.freeDaysCalendarMain[free.dateCloseKey] = free.openCloseValue
    });
  }

  //table with individual non-working days, holidays, etc.
  freeDaysCalendarMain: {[dayInYear: string]: boolean} = {}


  selectInstructor: Instructor = this.arrayPersons[0]
  index: number = -1
  instructorDaysOff: {[dayInYear: string]: string} = {}

  showInstructor(i:number){
    this.instructorDaysOff = {}
    if(this.index == i){
      this.index = -1
    }else{
      this.index = i
      this.selectInstructor = this.arrayPersons[i]

      if(this.selectInstructor.instructorDaysOff != undefined){

        this.selectInstructor.instructorDaysOff.forEach(daysOffInstructor => {
          this.instructorDaysOff[daysOffInstructor.dateAbsenceKey] = daysOffInstructor.reasonAbsenceValue
        });
      }
      this.studentsDriveAllForInstructor()
    }
  }

  refreshData(){

    var refreshInstructor = localStorage.getItem('instructorId')
    if(refreshInstructor != null){

      var refreshInstructorNumber = Number(refreshInstructor)
      for(var i=0; i<this.arrayPersons.length; i++){
        if(this.arrayPersons[i].id == refreshInstructorNumber){
          this.index = i
          break
        }
      }

      this.selectInstructor = this.arrayPersons[i]

      if(this.selectInstructor.instructorDaysOff != undefined){

        this.selectInstructor.instructorDaysOff.forEach(daysOffInstructor => {
          this.instructorDaysOff[daysOffInstructor.dateAbsenceKey] = daysOffInstructor.reasonAbsenceValue
        });
      }
      this.studentsDriveAllForInstructor()

      localStorage.removeItem('instructorId')

      if(localStorage.getItem('scrollPositionHome') != null){
        setTimeout(() => {
          var scroll = Number(localStorage.getItem('scrollPositionHome'))
          window.scroll(0, scroll)
          localStorage.removeItem('scrollPositionHome')
        }, 250)
      }
    }
  }

  generateRegistrationCodeDialog(select: Instructor){
    this.dialogRef.open(GenerateLoginCodeInstructorsPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        selectInstuctor: select,
        scrollPosition: scrollY
      }
    })
  }

  addInstructorDialog(){
    this.dialogRef.open(AddInstructorPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId
      }
    })
  }

  editInstructorDialog(select: Instructor){
    this.dialogRef.open(EditInstructorPopupComponent, {
      data:{
        selectInstuctor: select,
        schoolIdRoute: this.schoolId,
        scrollPosition: scrollY
      }
    })
  }

  removeInstructorDialog(select: Instructor){
    this.dialogRef.open(RemoveInstructorPopupComponent, {
      data:{
        selectInstuctor: select,
        schoolIdRoute: this.schoolId
      }
    })
  }

  //------------------------------------------------------Router logic------------------------------------------------------
  schoolId: number = -30
  getInstructorsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
      this.refreshData()
    })

    this.getStudentsRoute()
    this.getOpenCloseRoute()
    this.getSingleCloseRoute()
    this.getBreakBetweenRidesRoute()
  }

  getStudentsRoute(){

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayStudents = response
    })
  }

  getOpenCloseRoute(){

    this.settingsService.getOpenClose(this.schoolId).subscribe((response) => {
      this.daysAndHoursMain = response
      this.checkCorrectOrderDaysAndHours()
    })
  }

  getSingleCloseRoute(){

    this.settingsService.getSingleClose(this.schoolId).subscribe((response) => {
      this.freeDaysCalendarMainToConvert = response
      this.freeDaysConvert()
    })
  }

  getBreakBetweenRidesRoute(){

    this.settingsService.getBreakBetweenRides(this.schoolId).subscribe((response) => {
      this.BreakBetweenRidesMain = response
    })
  }
}
