import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { SaveStudentMainCalendarPopupComponent } from '../save-student-main-calendar-popup/save-student-main-calendar-popup.component';
import { RemoveStudentMainCalendarPopupComponent } from '../remove-student-main-calendar-popup/remove-student-main-calendar-popup.component';
import { CalendarStudents, StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { StudentService } from 'src/app/service/student-service/student.service';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';

@Component({
  selector: 'app-main-calendar-day',
  templateUrl: './main-calendar-day.component.html',
  styleUrls: ['./main-calendar-day.component.css']
})
export class MainCalendarDayComponent implements OnInit {
  ngOnInit(): void{
    this.getInstructorsRoute()
    this.dateToDisplay()
    this.absencesDaysOffFromWork()
    this.hoursListfunction()
  }

  constructor(private dialogRef: MatDialog, private studentService: StudentService, private instructorService: InstructorService,
    private mainCalendarService: MainCalendarService){}

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

  arrayInstrustors: Instructor[] = []

  arrayPersons: Student[] = []

  calendarStudentsDriveAll: StudentsHourDrive[] = []

  studentsWithTodaysDate: StudentsHourDrive[] = []

  //the add student button is inactive when the driving school is closed, when there are no more places or the instructor is absent
  addCustomersDisabled: boolean = false

  drivingLessonsOutsideOfHours: StudentsHourDrive[] = []
  calendarStudentsDriveDay(){
    this.studentsWithTodaysDate = []
    this.drivingLessonsOutsideOfHours = []

    var selectDate = new Date(`${this.yearValueNumberParent}, ${this.monthValueNumberParent}, ${this.dayParent}`).toLocaleDateString()

    this.studentsWithTodaysDate = this.calendarStudentsDriveAll.filter(({dateAddedDrive, mainHourFrom, mainHourTo}, index) => {

      var getDayValue = new Date(dateAddedDrive).getDay()
      if(new Date(dateAddedDrive).toLocaleDateString() == selectDate && this.daysAndHours[getDayValue].firstHour<=mainHourFrom &&
      this.daysAndHours[getDayValue].lastHour>=mainHourFrom && this.daysAndHours[getDayValue].lastHour>=mainHourTo){
        return true
      }else{
        if(new Date(dateAddedDrive).toLocaleDateString() == selectDate){
          this.drivingLessonsOutsideOfHours.push(this.calendarStudentsDriveAll[index])
        }
        return false
      }
    })

    this.drivingLessonsOutsideOfHours.sort((firstItem, secondItem) => firstItem.mainHourFrom - secondItem.mainHourFrom)
  }

  //table with individual non-working days, holidays, etc.
  @Input()
  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  //a table with non-working days for each month, weekends etc. along with working hours for each day of the week
  @Input()
  daysAndHours: OpenClose[] = []

  addHourDriveDialog(selectedInstructor: Instructor){

    this.dialogRef.open(SaveStudentMainCalendarPopupComponent, {autoFocus: false,
      data: {
        firstHour: this.daysAndHours[new Date(`${this.yearValueNumberParent}-${this.monthValueNumberParent}-${this.dayParent}`).getDay()].firstHour,
        lastHour: this.daysAndHours[new Date(`${this.yearValueNumberParent}-${this.monthValueNumberParent}-${this.dayParent}`).getDay()].lastHour,

        schoolIdRoute: this.schoolId,
        instructorIdRoute: selectedInstructor.id,
        arrayStudentsRoute: this.arrayPersons,

        currentDay: this.dayParent,
        currentMonth: this.monthValueNumberParent,
        currentYear: this.yearValueNumberParent,
        scrollPosition: scrollY
      }
    })
  }
  removeHourDriveDialog(selectedLesson: StudentsHourDrive, selectedInstructor: Instructor){
    this.dialogRef.open(RemoveStudentMainCalendarPopupComponent, {
      data: {
        drivingLesson: selectedLesson,
        schoolId: this.schoolId,
        instructorId: selectedInstructor.id,

        currentDay: this.dayParent,
        currentMonth: this.monthValueNumberParent,
        currentYear: this.yearValueNumberParent,
        scrollPosition: scrollY
      }
    })
  }


  //providing the child with information on when the instructor is not working, i.e. calendarDay
  freeDayCalendarVariable: boolean = true
  freeDayInstructorVariable: string = ''
  dayAndHoursVariable: boolean = true

  absencesDaysOffFromWork(){
    this.freeDayCalendarVariable = true
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

    var getDayVariable = new Date(date).getDay()
    if(this.daysAndHours[getDayVariable].isOpen == false){
      this.dayAndHoursVariable = false
    }
  }

  instructorDaysOff: {[dayInYear: string]: string} = {}
  absencesDaysOffFromWorkInstructor(selectedInstructor: Instructor){
    this.instructorDaysOff = {}
    this.freeDayInstructorVariable = ''

    if(selectedInstructor.instructorDaysOff != undefined){
      selectedInstructor.instructorDaysOff.forEach(daysOffInstructor => {
        this.instructorDaysOff[daysOffInstructor.dateAbsenceKey] = daysOffInstructor.reasonAbsenceValue
      });
    }

    var monthValueNumber = ''+this.monthValueNumberParent
    if(monthValueNumber.split('').length == 1){
      monthValueNumber = '0'+this.monthValueNumberParent
    }
    var day = ''+this.dayParent
    if(day.split('').length == 1){
      day = '0'+this.dayParent
    }

    var date = `${this.yearValueNumberParent}-${monthValueNumber}-${day}`
    if(this.instructorDaysOff[date] != undefined){
      this.freeDayInstructorVariable = this.instructorDaysOff[date]
    }
  }

  //setting the style of displaying sick leave and absences
  setStyleAbsence(): string{

    if(this.freeDayInstructorVariable.split(' ')[0].toLocaleLowerCase() == 'urlop'){
      return 'background-color: #00FFFF'
    }else if(this.freeDayInstructorVariable.split(' ')[0].toLocaleLowerCase() == 'chorobowe'){
      return 'background-color: #FFFF66'
    }
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

  getStudent: Student = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2001-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  //free hour during the day driving
  freeHourInDay: string = ''

  //the student with id -2 does not have to be added because -1 means free
  getStudentById(getId: any){
    this.freeHourInDay = ''
    if(getId == -1){
      this.freeHourInDay = 'Wolne'
      this.getStudent = {
        id: -1,
        name: "",
        lastName: "",
        dateOfBirth: new Date("2001-01-01"),
        placeOfBirth: "",
        address: "",
        phoneNumber: '',
        email: ""
      }
    }else{

      var p = this.arrayPersons.find(({id}) => id == parseInt(getId))
      if(p != undefined){
        this.getStudent = p
      }else{

        this.getStudent = {
          id: -2,
          name: "Konto nie istnieje",
          lastName: "",
          dateOfBirth: new Date("2001-01-01"),
          placeOfBirth: "Brak",
          address: "Brak",
          phoneNumber: 'Brak',
          email: "Brak"
        }
      }
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

  //------------------------------------------------------Router logic------------------------------------------------------

  @Input()
  schoolId: number = -30

  getInstructorsRoute(){

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayInstrustors = response
    })

    this.getStudentsRoute()
    this.getHoursDriveRoute()
  }

  getStudentsRoute(){

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayPersons = response
    })
  }

  getHoursDriveRoute(){

    this.mainCalendarService.getHoursDrive(this.schoolId).subscribe((response) => {
      this.calendarStudentsDriveAll = response

      this.calendarStudentsDriveDay()
      this.hoursListfunction()
    })
  }
}
