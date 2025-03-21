import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { SettingsService } from 'src/app/service/settings-service/settings.service';

@Component({
  selector: 'app-instructors-for-student',
  templateUrl: './instructors-for-student.component.html',
  styleUrls: ['./instructors-for-student.component.css']
})
export class InstructorsForStudentComponent {

  constructor(private aRoute: ActivatedRoute, private instructorService: InstructorService, private settingsService: SettingsService){}

  ngOnInit(): void {
    this.getInstructorsRoute()
  }

  pageName: string= 'Instruktorzy'

  arrayPersons: Instructor[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []

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

  //table with individual non-working days, holidays, etc.
  freeDaysCalendarMainToConvert: SingleClose[] = []

  freeDaysConvert(){

    this.freeDaysCalendarMainToConvert.forEach(free => {
      this.freeDaysCalendarMain[free.dateCloseKey] = free.openCloseValue
    });
  }

  freeDaysCalendarMain: {[dayInYear: string]: boolean} = {}

  findStudentsDriveAllForSelectedInstructor(selectInstructor: Instructor){

    this.calendarStudentsDriveAll = []
    selectInstructor.studentsHourDrivesSchool?.forEach(drive => {
      this.calendarStudentsDriveAll.push(drive)
    })
  }

  selectInstructor: Instructor = this.arrayPersons[0]
  index: number = -1

  instructorDaysOff: {[dayInYear: string]: string} = {}

  showInstructor(i:number){
    if(this.index == i){
      this.index = -1
    }else{
      this.index = i
      this.selectInstructor = this.arrayPersons[i]

      this.instructorDaysOff = {}

      if(this.selectInstructor.instructorDaysOff != undefined){

        this.selectInstructor.instructorDaysOff.forEach(daysOffInstructor => {
          this.instructorDaysOff[daysOffInstructor.dateAbsenceKey] = daysOffInstructor.reasonAbsenceValue
        });
      }
      this.findStudentsDriveAllForSelectedInstructor(this.arrayPersons[i])
    }
  }


  //------------------------------------------------------Router logic------------------------------------------------------
  schoolId: number = -30
  getInstructorsRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
    })

    this.getOpenCloseRoute()
    this.getSingleCloseRoute()
    this.getBreakBetweenRidesRoute()
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
