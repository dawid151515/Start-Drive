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
  selector: 'app-main-calendar-for-instructor',
  templateUrl: './main-calendar-for-instructor.component.html',
  styleUrls: ['./main-calendar-for-instructor.component.css']
})
export class MainCalendarForInstructorComponent {

  ngOnInit(): void {
    this.getInstructorRoute()

    this.setCurrentData()
    this.iterationYears()
    this.days()
  }

  constructor(private aRoute: ActivatedRoute, private studentService: StudentService, private instructorService: InstructorService,
    private settingsService: SettingsService){}

  pageName: string= 'Kalendarz główny'

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

  currentMonthValue: string = ''
  currentYearValue: string = ''

  currentMonthValueNumber: number = 0
  currentYearValueNumber: number = 0


  date = new Date()
  currentDay = this.date.getDate()
  currentMonth = this.date.getMonth()+1
  currentYear = this.date.getFullYear()

  setCurrentData(){

    this.currentMonthValue = ''+this.currentMonth
    this.currentYearValue = ''+this.currentYear
    this.currentMonthValueNumber = this.currentMonth
    this.currentYearValueNumber = this.currentYear
  }

  yearNumberArray: number[] = []
  i: number=0
  maxDate = new Date().getFullYear()+2
  minDate = 2020
  iterationYears(){
    for(var i = this.maxDate; i>=this.minDate; i--){
      this.yearNumberArray[this.i] = i
      this.i++;
    }
  }


  addLi: number[] = []
  placeDay: string = ''
  days(){
    this.addLi = []
    //we color the current day of the week
    this.currentMonthValueNumber = parseInt(this.currentMonthValue)
    this.currentYearValueNumber = parseInt(this.currentYearValue)

    var month = this.currentMonthValueNumber
    var year = this.currentYearValueNumber
    var day = new Date(year, month, 0).getDate()
    var nameDay = new Date(year, (month-1), 1).getDay()

    for(var i=1; i<=day; i++){

      this.addLi[i-1] = i
    }

    //setting the first day of the month to the appropriate day of the week
    if(nameDay == 0){
      this.placeDay = 'gridColumn:'+7
    } else {
      this.placeDay = 'gridColumn:'+nameDay
    }
  }

  nextMonth(){
    var month = this.currentMonthValueNumber
    var year = this.currentYearValueNumber


    var numberMonth = month
    if(month == 12){
        numberMonth = 1
        var numberYear = year+1

        this.currentYearValue = `${numberYear}`
        this.currentYearValueNumber = numberYear
        this.currentMonthValue = `${numberMonth}`
        this.currentMonthValueNumber = numberMonth
        if(this.currentYearValueNumber > this.maxDate){
          this.currentYearValue = `${numberYear-1}`
          this.currentYearValueNumber = numberYear-1
        }
    } else {
      this.currentMonthValue = `${numberMonth+1}`
      this.currentMonthValueNumber = numberMonth+1
    }

    this.days()
  }

  prevMonth(){
    var month = this.currentMonthValueNumber
    var year = this.currentYearValueNumber

    var numberMonth = month
    if(month == 1){

        numberMonth = 12
        var numberYear = year-1

        this.currentYearValue = `${numberYear}`
        this.currentYearValueNumber = numberYear
        this.currentMonthValue = `${numberMonth}`
        this.currentMonthValueNumber = numberMonth

        if(this.currentYearValueNumber < this.minDate){
          this.currentYearValue = `${numberYear+1}`
          this.currentYearValueNumber = numberYear+1
        }
    } else {
      this.currentMonthValue = `${numberMonth-1}`
      this.currentMonthValueNumber = numberMonth-1
    }

    this.days()
  }

  isDisabledDay: boolean = false
  day: number = 0

  getDay(event: any, day: number){
    var elementsTextA = event.split('\n')
    this.day = elementsTextA[0]
    if(this.returnIsOpenToRead(day) == true){
      this.isDisabledDay = true
    }
  }

  backCalendar(isDisabledDayParent: boolean): void{
    this.isDisabledDay = isDisabledDayParent
  }

  backCalendarYear(yearValueNumberParent: number){

    this.yearToChecked = yearValueNumberParent
    if(yearValueNumberParent > this.maxDate){
      this.currentYearValueNumber = this.maxDate
      this.currentYearValue = `${this.maxDate}`
    } else if(yearValueNumberParent < this.minDate){
      this.currentYearValueNumber = this.minDate
      this.currentYearValue = `${this.minDate}`
    } else{
      this.currentYearValueNumber = yearValueNumberParent
      this.currentYearValue = `${yearValueNumberParent}`
    }
  }

  yearToChecked: number = 0
  backCalendarMonth(monthValueNumberParent: number){

    if(this.yearToChecked > this.maxDate){
      this.currentMonthValueNumber = 12
      this.currentMonthValue = `${12}`
    } else if(this.yearToChecked < this.minDate){
      this.currentMonthValueNumber = 1
      this.currentMonthValue = `${1}`
    } else{
      this.currentMonthValueNumber = monthValueNumberParent
      this.currentMonthValue = `${monthValueNumberParent}`
    }
  }

  calendarStudentsDriveAll: StudentsHourDrive[] = []

  //table with individual non-working days, holidays, etc.
  freeDaysCalendarToConvert: SingleClose[] = []

  freeDaysConvert(){

    this.freeDaysCalendarToConvert.forEach(free => {
      this.freeDaysCalendar[free.dateCloseKey] = free.openCloseValue
    });
  }

  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  //a table with non-working days for each month, weekends etc. along with working hours for each day of the week
  daysAndHours: OpenClose[] = [
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

  //displays whether the driving school is closed on a given day or not
  returnIsOpenToRead(day: number): boolean{
    var whichDay = new Date(`${this.currentYearValueNumber}, ${this.currentMonthValueNumber}, ${day}`).getDay()
    var status = this.daysAndHours[whichDay].isOpen
    if(this.daysAndHours[whichDay].dayOfTheWeek != whichDay){
      this.daysAndHours.forEach(days => {
        if(days.dayOfTheWeek == whichDay){
          status = days.isOpen
          return false
        }
        return true;
      });
    }

    var monthValue = this.currentMonthValue
    if(monthValue.split('').length == 1){
      monthValue = '0'+this.currentMonthValue
    }

    var dayValue = ''+day
    if(dayValue.split('').length == 1){
      dayValue = '0'+dayValue
    }

    if(this.freeDaysCalendar[`${this.currentYearValue}-${monthValue}-${dayValue}`] != undefined){
      status = this.freeDaysCalendar[`${this.currentYearValueNumber}-${monthValue}-${dayValue}`]
    }
    return status
  }

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

  //displays whether the instructor has sick leave or other days off on a given day
  freeDayInstructorVariable: string = ''
  returnInstructorFreeDays(day: number): string{
    var status = ''

    var monthValue = this.currentMonthValue
    if(monthValue.split('').length == 1){
      monthValue = '0'+this.currentMonthValue
    }

    var dayValue = ''+day
    if(dayValue.split('').length == 1){
      dayValue = '0'+dayValue
    }

    if(this.freeDaysInstructor[`${this.currentYearValue}-${monthValue}-${dayValue}`] != undefined){
      status = this.freeDaysInstructor[`${this.currentYearValueNumber}-${monthValue}-${dayValue}`]
    }
    this.freeDayInstructorVariable = status
    return status
  }

  setStyleAbsence(): string{

    if(this.freeDayInstructorVariable.split(' ')[0].toLocaleLowerCase() == 'urlop'){
      return 'background-color: #00FFFF'
    }else if(this.freeDayInstructorVariable.split(' ')[0].toLocaleLowerCase() == 'chorobowe'){
      return 'background-color: #FFFF66'
    }
    return 'background-color: #FFCC99'
  }

  setStyleBorder(day: number, usingStyle: string, openClose: boolean): string{

    var style = usingStyle
    if(openClose != false){
      var counter = 0
      if(this.logInInstructor.studentsHourDrivesSchool != undefined){
        for(var i=0; i<this.logInInstructor.studentsHourDrivesSchool.length; i++){

          if(new Date(this.logInInstructor.studentsHourDrivesSchool[i].dateAddedDrive).getTime() == new Date(`${this.currentYearValue}, ${this.currentMonthValue}, ${day}`).getTime()){
            if(style == ''){
              style += `border: 3px solid #FF0000;`
            }else{
              style += `; border: 3px solid #FF0000;`
            }
            counter = 1
            break
          }
        }
      }

      if(counter == 0){
        if(style == ''){
          style += `border: 3px solid #00CC00;`
        }else{
          style += `; border: 3px solid #00CC00;`
        }
      }

    }else{

      if(style == ''){
        style += `border: 1px solid #000000;`
      }else{
        style += `; border: 1px solid #000000;`
      }
    }

    return style
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
    })
  }
}
