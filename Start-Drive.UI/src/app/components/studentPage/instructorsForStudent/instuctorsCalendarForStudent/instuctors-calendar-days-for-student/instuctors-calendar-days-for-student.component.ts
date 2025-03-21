import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OpenClose } from 'src/app/models/open-close.model';
import { CalendarStudents, StudentsHourDrive } from 'src/app/models/students-hour-drive.model';

@Component({
  selector: 'app-instuctors-calendar-days-for-student',
  templateUrl: './instuctors-calendar-days-for-student.component.html',
  styleUrls: ['./instuctors-calendar-days-for-student.component.css']
})
export class InstuctorsCalendarDaysForStudentComponent {

  ngOnInit(): void{
    this.dateToDisplay()
    this.calendarStudentsDriveDay()
    this.hoursListfunction()
    this.absencesDaysOffFromWork()
  }

  @Input()
  dayParent: number = 0
  @Input()
  monthValueNumberParent: number = 0
  @Input()
  yearValueNumberParent: number = 0


  @Output()
  eventMonthValueNumberParent = new EventEmitter<number>()
  @Output()
  eventYearValueNumberParent = new EventEmitter<number>()
  @Output()
  eventIsDisabledDayParent = new EventEmitter<boolean>()


  studentsHoursCalendarList: CalendarStudents[] = []

  @Input()
  calendarStudentsDriveAll: StudentsHourDrive[] = []

  studentsWithTodaysDate: StudentsHourDrive[] = []

  //the add student button is inactive when the driving school is closed, when there are no more places or the instructor is absent
  addCustomersDisabled: boolean = false

  calendarStudentsDriveDay(){
    this.studentsWithTodaysDate = []

    var selectDate = new Date(`${this.yearValueNumberParent}, ${this.monthValueNumberParent}, ${this.dayParent}`).toLocaleDateString()

    this.studentsWithTodaysDate = this.calendarStudentsDriveAll.filter(({dateAddedDrive, mainHourFrom, mainHourTo}, index) => {

      var getDayValue = new Date(dateAddedDrive).getDay()
      if(new Date(dateAddedDrive).toLocaleDateString() == selectDate && this.daysAndHours[getDayValue].firstHour<=mainHourFrom &&
      this.daysAndHours[getDayValue].lastHour>=mainHourFrom && this.daysAndHours[getDayValue].lastHour>=mainHourTo){
        return true
      }else{
        return false
      }
    })
  }

  //table with individual non-working days, holidays, etc.
  @Input()
  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  //table of absences
  @Input()
  freeDaysInstructor: {[dayInYear: string]: string} = {}

  //a table with non-working days for each month, weekends etc. along with working hours for each day of the week
  @Input()
  daysAndHours: OpenClose[] = []

  //providing the child with information about when the teacher is not working, i.e. calendarDays
  freeDayCalendarVariable: boolean = true
  freeDayInstructorVariable: string = ''
  dayAndHoursVariable: boolean = true

  absencesDaysOffFromWork(){
    this.freeDayCalendarVariable = true
    this.freeDayInstructorVariable = ''
    this.dayAndHoursVariable = true

    var monthValueNumber = ''+this.monthValueNumberParent
    if(monthValueNumber.split('').length == 1){
      monthValueNumber = '0'+this.monthValueNumberParent
    }
    var day = ''+this.dayParent
    if(day.split('').length == 1){
      day = '0'+this.dayParent
    }

    var date = `${this.yearValueNumberParent}-${monthValueNumber}-${day}`
    if(this.freeDaysCalendar[date] != undefined){
      this.freeDayCalendarVariable = false
    }

    if(this.freeDaysInstructor[date] != undefined){
      this.freeDayInstructorVariable = this.freeDaysInstructor[date].toLocaleLowerCase()
    }

    var getDayVariable = new Date(date).getDay()
    if(this.daysAndHours[getDayVariable].isOpen == false){
      this.dayAndHoursVariable = false
    }
  }

  setStyleAbsence(): string{
    return 'background-color: #FFCC99'
  }

  hoursListfunction(){
    var count = 0
    this.studentsHoursCalendarList = []

    var getDayValue = new Date(`${this.yearValueNumberParent}-${this.monthValueNumberParent}-${this.dayParent}`).getDay()

    var calendarStudentsObj
    for(var i=Math.trunc(this.daysAndHours[getDayValue].firstHour-1); i<Math.trunc(this.daysAndHours[getDayValue].lastHour); i++){

      var calendarStudentsDriveObj = []
      var calendarStudentsDriveStartObj = []
      var calendarStudentsDriveEndObj = []
      var numberOfHours = 0
      for(var j=0; j<this.studentsWithTodaysDate.length; j++){

        numberOfHours = this.studentsWithTodaysDate[j].mainHourTo - this.studentsWithTodaysDate[j].mainHourFrom

        if(Math.trunc(this.studentsWithTodaysDate[j].mainHourFrom) == i+1){
          calendarStudentsDriveStartObj.push(this.studentsWithTodaysDate[j])
        }

        if(Math.trunc(numberOfHours) > 1 && Math.trunc(this.studentsWithTodaysDate[j].mainHourFrom) < i+1 && Math.trunc(this.studentsWithTodaysDate[j].mainHourTo) > i+1){
          calendarStudentsDriveStartObj.push(this.studentsWithTodaysDate[j])
        }

        if(Math.trunc(this.studentsWithTodaysDate[j].mainHourTo) == i+1){
          calendarStudentsDriveEndObj.push(this.studentsWithTodaysDate[j])
        }
      }

      count = 1

      //sort tables
      calendarStudentsDriveStartObj.sort((firstItem, secondItem) => firstItem.mainHourFrom - secondItem.mainHourFrom);
      calendarStudentsDriveEndObj.sort((firstItem, secondItem) => firstItem.mainHourTo - secondItem.mainHourTo);

      //combining tables
      calendarStudentsDriveObj = calendarStudentsDriveStartObj.concat(calendarStudentsDriveEndObj)

      calendarStudentsObj = {HourNumber: Math.trunc(i+1), MainHourDriveStudents: calendarStudentsDriveObj}
      this.studentsHoursCalendarList.push(calendarStudentsObj)
    }
  }

  //functions for calendar operation
  //displays current date in html
  dateString: string = ``

  dateToDisplay(){

    this.dateString = ``

    if(this.dayParent<10){
      this.dateString += `0${this.dayParent}`
    } else {
      this.dateString += `${this.dayParent}`
    }

    if(this.monthValueNumberParent<10){
      this.dateString += `.0${this.monthValueNumberParent}.`
    } else {
      this.dateString += `.${this.monthValueNumberParent}.`
    }

    this.dateString += `${this.yearValueNumberParent}`
  }


  changeDayCalenderDayPrev(){
    var dayParseInt = this.dayParent
    var monthParseInt = this.monthValueNumberParent
    var yearParseInt = this.yearValueNumberParent

    if(dayParseInt == 1 && monthParseInt == 1){

      var prevYearParseInt = yearParseInt-1
      this.yearValueNumberParent = prevYearParseInt

      monthParseInt = 12
      this.monthValueNumberParent = 12

      var day = new Date(prevYearParseInt, 12, 0).getDate()
      this.dayParent = day

    }else if(dayParseInt == 1){
      var prevMonthParseInt = monthParseInt-1
      this.monthValueNumberParent = prevMonthParseInt

      var day = new Date(yearParseInt, prevMonthParseInt, 0).getDate()
      this.dayParent = day

    }else if(dayParseInt > 1){

      var prevDayParseInt = dayParseInt-1
      this.dayParent = prevDayParseInt

    }

    this.dateToDisplay()
    this.absencesDaysOffFromWork()
  }

  changeDayCalenderDayNext(){

    var dayParseInt = this.dayParent
    var monthParseInt = this.monthValueNumberParent
    var yearParseInt = this.yearValueNumberParent

    var day = new Date(yearParseInt, monthParseInt, 0).getDate()

    if(dayParseInt == day && monthParseInt == 12){
      var nextYearParseInt = yearParseInt+1
      this.yearValueNumberParent = nextYearParseInt

      monthParseInt = 1
      this.monthValueNumberParent = 1

      dayParseInt = 1
      this.dayParent = 1
    }else if(dayParseInt == day){
      var nextMonthParseInt = monthParseInt+1
      this.monthValueNumberParent = nextMonthParseInt

      dayParseInt = 1
      this.dayParent = 1
    }else if(dayParseInt < day){

      var nextDayParseInt = (+dayParseInt)+(+1)
      this.dayParent = nextDayParseInt

    }

    this.dateToDisplay()
    this.absencesDaysOffFromWork()
  }

  isDisabledDayParent: boolean = false
  backCalendarPage(isDisabledDayParent: boolean, monthValueNumberParent: number, yearValueNumberParent: number){
    this.eventIsDisabledDayParent.emit(isDisabledDayParent)
    this.eventYearValueNumberParent.emit(yearValueNumberParent)
    this.eventMonthValueNumberParent.emit(monthValueNumberParent)
  }


  getcurrentDate(){
    var date = new Date()
    var currentDay = date.getDate()
    var currentMonth = date.getMonth()+1
    var currentYear = date.getFullYear()

    this.dayParent = currentDay
    this.monthValueNumberParent = currentMonth
    this.yearValueNumberParent = currentYear

    this.dateToDisplay()
    this.absencesDaysOffFromWork()
  }
}
