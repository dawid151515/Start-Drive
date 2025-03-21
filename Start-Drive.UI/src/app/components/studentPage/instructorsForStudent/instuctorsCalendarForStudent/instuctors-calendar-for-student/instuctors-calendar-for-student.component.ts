import { Component, Input } from '@angular/core';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { OpenClose } from 'src/app/models/open-close.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';

@Component({
  selector: 'app-instuctors-calendar-for-student',
  templateUrl: './instuctors-calendar-for-student.component.html',
  styleUrls: ['./instuctors-calendar-for-student.component.css']
})
export class InstuctorsCalendarForStudentComponent {

  ngOnInit(): void {
    this.setCurrentData()
    this.iterationYears()
    this.days()
    this.calendarStudentsDriveDate()
  }

  @Input()
  selectedInstructorParent: Instructor = {
    name: "0",
    lastName: "0",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "0",
    address: "0",
    phoneNumber: '',
    email: "0",
    instructorDaysOff: []
  }

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

  @Input()
  calendarStudentsDriveAll: StudentsHourDrive[] = []

  calendarStudentsDriveForMonth: StudentsHourDrive[] = []

  //table with individual non-working days, holidays, etc.
  @Input()
  freeDaysCalendar: {[dayInYear: string]: boolean} = {}

  //table of absences
  @Input()
  freeDaysInstructor: {[dayInYear: string]: string} = {}

  //a table with non-working days for each month, weekends etc. along with working hours for each day of the week
  @Input()
  daysAndHours: OpenClose[] = []

  //displays whether the driving school is closed on a given day or not
  returnIsOpenToRead(day: number): boolean{
    var whichDay = new Date(`${this.currentYearValueNumber}, ${this.currentMonthValueNumber}, ${day}`).getDay()
    var status = this.daysAndHours[whichDay].isOpen

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

  //displays if the instructor is absent
  instructorDisabled(day: number): string{
    var status = 'true'
    var date = this.convertDateString(this.currentYearValue, this.currentMonthValue, `${day}`)
    if(this.freeDaysInstructor[date] != undefined){
      status = this.freeDaysInstructor[date]
    }
    return status
  }

  //breaks between rides
  @Input()
  BreakBetweenRides: number = 0

  freeHoursTable: {[key: number]: number[]} = {}

  calendarStudentsDriveDate(){
    this.freeHoursTable = {}

    this.calendarStudentsDriveForMonth = this.calendarStudentsDriveAll.filter(({dateAddedDrive, mainHourFrom, mainHourTo}) => {

      var getDayValue = new Date(dateAddedDrive).getDay()
      if(new Date(dateAddedDrive).getFullYear() == this.currentYearValueNumber && (new Date(dateAddedDrive).getMonth()+1) == this.currentMonthValueNumber
      && this.daysAndHours[getDayValue].firstHour<=mainHourFrom && this.daysAndHours[getDayValue].lastHour>=mainHourFrom
      && this.daysAndHours[getDayValue].lastHour>=mainHourTo){
        return true
      }else{
        return false
      }

    })

    //sorting tasks from a specific month by day and hour
    this.calendarStudentsDriveForMonth.sort(function(a,b){

      var splithourA
      if(a.mainHourFrom.toString().split('.')[0].split('').length == 1){
        splithourA = '0'+a.mainHourFrom.toString().split('.')[0]
      }else{
        splithourA = a.mainHourFrom.toString().split('.')[0]
      }

      var splitDateA
      if(a.mainHourFrom == Math.trunc(a.mainHourFrom)){
        splitDateA = '00'
      } else{
        splitDateA = a.mainHourFrom.toString().split('.')[1]
      }

      if(splitDateA.split('').length == 1){
        splitDateA+='0'
      }

      var splithourB
      if(b.mainHourFrom.toString().split('.')[0].split('').length == 1){
        splithourB = '0'+b.mainHourFrom.toString().split('.')[0]
      }else{
        splithourB = b.mainHourFrom.toString().split('.')[0]
      }

      var splitDateB
      if(b.mainHourFrom == Math.trunc(b.mainHourFrom)){
        splitDateB = '00'
      } else{
        splitDateB = b.mainHourFrom.toString().split('.')[1]
      }

      if(splitDateB.split('').length == 1){
        splitDateB+='0'
      }

      var aDateAddedDrive = new Date(a.dateAddedDrive)
      var bDateAddedDrive = new Date(b.dateAddedDrive)

      var dateA = new Date(`${aDateAddedDrive.getFullYear()}-${((aDateAddedDrive.getMonth()+1)<10)?'0'+(aDateAddedDrive.getMonth()+1):(aDateAddedDrive.getMonth()+1)}-${(aDateAddedDrive.getDate()<10)?'0'+aDateAddedDrive.getDate():aDateAddedDrive.getDate()}T${splithourA}:${splitDateA}`)
      var dateB = new Date(`${bDateAddedDrive.getFullYear()}-${((bDateAddedDrive.getMonth()+1)<10)?'0'+(bDateAddedDrive.getMonth()+1):(bDateAddedDrive.getMonth()+1)}-${(bDateAddedDrive.getDate()<10)?'0'+bDateAddedDrive.getDate():bDateAddedDrive.getDate()}T${splithourB}:${splitDateB}`)

      if(dateA>dateB){
        return 1
      }else{
        return -1
      }
    })

    //listing the hours occupied for all days of the month
    var busyHours = []

    var hourFromTo = 0 //from = 0, to = 1
    if(this.calendarStudentsDriveForMonth.length >= 1){
      busyHours.push(-new Date(this.calendarStudentsDriveForMonth[0].dateAddedDrive).getDate())
      if(hourFromTo == 0){
        busyHours.push(this.calendarStudentsDriveForMonth[0].mainHourFrom)
        hourFromTo = 1
      }
      if(this.calendarStudentsDriveForMonth.length == 1){
        if(hourFromTo == 1){
          busyHours.push(this.calendarStudentsDriveForMonth[0].mainHourTo)
          hourFromTo = 0
        }
      }
      if(this.calendarStudentsDriveForMonth.length > 1 && new Date(this.calendarStudentsDriveForMonth[0].dateAddedDrive).getDate()<new Date(this.calendarStudentsDriveForMonth[1].dateAddedDrive).getDate()){
        if(hourFromTo == 1){
          busyHours.push(this.calendarStudentsDriveForMonth[0].mainHourTo)
          hourFromTo = 0
        }
      }
    }

    for(var i=1; i<this.calendarStudentsDriveForMonth.length; i++){

      if(new Date(this.calendarStudentsDriveForMonth[i].dateAddedDrive).getDate()>new Date(this.calendarStudentsDriveForMonth[i-1].dateAddedDrive).getDate()){
        busyHours.push(-new Date(this.calendarStudentsDriveForMonth[i].dateAddedDrive).getDate())
        if(hourFromTo == 0){
          busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourFrom)
          hourFromTo = 1
        }

        if(this.calendarStudentsDriveForMonth[i+1] != undefined){

          if(new Date(this.calendarStudentsDriveForMonth[i+1].dateAddedDrive).getDate()>new Date(this.calendarStudentsDriveForMonth[i].dateAddedDrive).getDate()){
            busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourTo)
            hourFromTo = 0
            continue;
          }
          i++
          if(this.calendarStudentsDriveForMonth[i+2] == undefined){
            i--
          }
        }else{
          if(hourFromTo == 1){
            busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourTo)
            hourFromTo = 0
          }
          break;
        }
      }

      if(this.calendarStudentsDriveForMonth[i-1].mainHourTo<this.calendarStudentsDriveForMonth[i].mainHourFrom){
        if(busyHours[busyHours.length-1] != this.calendarStudentsDriveForMonth[i-1].mainHourTo){
          if(hourFromTo == 1){
            busyHours.push(this.calendarStudentsDriveForMonth[i-1].mainHourTo)
            hourFromTo = 0
          }
        }
        if(hourFromTo == 0){
          busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourFrom)
          hourFromTo = 1
        }

        if(this.calendarStudentsDriveForMonth[i+1] == undefined || new Date(this.calendarStudentsDriveForMonth[i].dateAddedDrive).getDate() < new Date(this.calendarStudentsDriveForMonth[i+1].dateAddedDrive).getDate()){
          if(hourFromTo == 1){
            busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourTo)
            hourFromTo = 0
          }
        }

      }
      if(this.calendarStudentsDriveForMonth[i-1].mainHourTo>=this.calendarStudentsDriveForMonth[i].mainHourFrom && this.calendarStudentsDriveForMonth[i].mainHourTo>this.calendarStudentsDriveForMonth[i-1].mainHourTo){
        if(hourFromTo == 1){
          busyHours.push(this.calendarStudentsDriveForMonth[i].mainHourTo)
          hourFromTo = 0
        }

      }
      if(this.calendarStudentsDriveForMonth[i-1].mainHourTo>=this.calendarStudentsDriveForMonth[i].mainHourFrom && this.calendarStudentsDriveForMonth[i].mainHourTo<=this.calendarStudentsDriveForMonth[i-1].mainHourTo){
        if(hourFromTo == 1){
          busyHours.push(this.calendarStudentsDriveForMonth[i-1].mainHourTo)
          hourFromTo = 0
        }
      }
    }

    //listing the free hours for all days of the month in the table

    var counterOnDay = 0
    var dayOfTheMonth = 0
    var countBusyHours = 0
    var tableHoursOfDay = []

    for(var i=0; i<this.addLi.length; i++){

      var whichDay = new Date(`${this.currentYearValueNumber}, ${this.currentMonthValueNumber}, ${i+1}`).getDay()

      if(busyHours[countBusyHours] < 0 && this.addLi[i] == (busyHours[countBusyHours]*-1)){

        var endEnd = 0
        for(var j=countBusyHours; j<busyHours.length; j++){

          if(busyHours[countBusyHours] < 0){
            if(endEnd == -1){
              break
            }

            endEnd = -1
            dayOfTheMonth = busyHours[countBusyHours]*-1
            tableHoursOfDay = []
            counterOnDay = 0
            countBusyHours++
          }else{

            if(this.daysAndHours[whichDay].firstHour<busyHours[countBusyHours] && counterOnDay==0){
              tableHoursOfDay.push(this.daysAndHours[whichDay].firstHour)
              tableHoursOfDay.push(busyHours[countBusyHours])
              counterOnDay++
            }else if(this.daysAndHours[whichDay].lastHour>busyHours[countBusyHours] && (busyHours[countBusyHours+1]==undefined || busyHours[countBusyHours+1]<0)){
              tableHoursOfDay.push(busyHours[countBusyHours])
              tableHoursOfDay.push(this.daysAndHours[whichDay].lastHour)

              this.freeHoursTable[dayOfTheMonth] = tableHoursOfDay

              counterOnDay++
            }else if(this.daysAndHours[whichDay].firstHour==busyHours[countBusyHours]){
              counterOnDay++
            }else if(this.daysAndHours[whichDay].lastHour==busyHours[countBusyHours]){
              this.freeHoursTable[dayOfTheMonth] = tableHoursOfDay
              counterOnDay++
            }
            else{
              tableHoursOfDay.push(busyHours[countBusyHours])
              counterOnDay++
            }
            countBusyHours++
          }
        }
      }else{
        tableHoursOfDay = []
        tableHoursOfDay.push(this.daysAndHours[whichDay].firstHour)
        tableHoursOfDay.push(this.daysAndHours[whichDay].lastHour)
        this.freeHoursTable[i+1] = tableHoursOfDay
      }
    }

    this.breaksBetweenRides()
  }

  lengthOfBreakBetweenRides: number = 1

  //checks whether the instructor has free places on a given day or not
  tableBreaksBetweenRides: {[key: number]: boolean} = {}
  breaksBetweenRides(){

    var breakBool = false
    for(var i=0; i<this.addLi.length; i++){
      for(var j=1; j<this.freeHoursTable[i+1].length; j++){

        var subtraction = this.subtractingHours(this.freeHoursTable[i+1][j], this.freeHoursTable[i+1][j-1])
        j++

        if(subtraction<this.BreakBetweenRides){
          breakBool = false
        }else if(subtraction>=this.BreakBetweenRides){
          breakBool = true
          break
        }
      }
      this.tableBreaksBetweenRides[i+1] = breakBool
    }
  }

  subtractingHours(higherValue: number, smallerValue: number): number{

    if(higherValue.toString().split('.').length == 2 || smallerValue.toString().split('.').length == 2){

      var value1Split
      var value1ToMinutes
      if(higherValue.toString().split('.').length == 2){
        value1Split = higherValue.toString().split('.')
        if(value1Split[1].split('').length == 1){
          value1ToMinutes = (parseInt(value1Split[0])*60)+parseInt(`${value1Split[1]}0}`)
        }else{
          value1ToMinutes = (parseInt(value1Split[0])*60)+parseInt(value1Split[1])
        }
      }else{
        value1Split = higherValue.toString()
        value1ToMinutes = (parseInt(value1Split)*60)
      }

      var value2Split
      var value2ToMinutes
      if(smallerValue.toString().split('.').length == 2){
        value2Split = smallerValue.toString().split('.')
        if(value2Split[1].split('').length == 1){
          value2ToMinutes = (parseInt(value2Split[0])*60)+parseInt(`${value2Split[1]}0`)
        }else{
          value2ToMinutes = (parseInt(value2Split[0])*60)+parseInt(value2Split[1])
        }
      }else{
        value2Split = smallerValue.toString()
        value2ToMinutes = (parseInt(value2Split)*60)
      }

      var toHours = value1ToMinutes - value2ToMinutes

      var timeDifference = ''
      if(toHours<60){
        if(toHours<10){
          timeDifference = `0.0${toHours}`
        }else{
          timeDifference = `0.${toHours}`
        }
      }else if(toHours>60){

        var divideWholeHours = Math.trunc(toHours/60)
        var restFromDivision = toHours%60
        if(restFromDivision<10){
          timeDifference = `${divideWholeHours}.0${restFromDivision}`
        }else{
          timeDifference = `${divideWholeHours}.${restFromDivision}`
        }
      }else{
        var divideWholeHoursElse = toHours/60
        timeDifference = `${divideWholeHoursElse}`
      }

      return parseFloat(timeDifference)

    }else{
      return (higherValue-smallerValue)
    }
  }

  convertDateString(year: string, month: string, day: string): string{
    var monthNumber = Number(month)
    var dayNumber = Number(day)

    var date = `${year}-`
    if(monthNumber<10){
      date +='0'+month+'-'
    } else{
      date += month+'-'
    }

    if(dayNumber < 10){
      date += '0'+day
    }else{
      date += day
    }

    return date
  }

  //setting the style of displaying sick leave and absences
  setStyleAbsence(): string{
    return 'background-color: #FFCC99'
  }
}
