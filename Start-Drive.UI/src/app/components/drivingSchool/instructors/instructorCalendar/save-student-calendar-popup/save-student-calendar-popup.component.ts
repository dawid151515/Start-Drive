import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';

@Component({
  selector: 'app-save-student-calendar-popup',
  templateUrl: './save-student-calendar-popup.component.html',
  styleUrls: ['./save-student-calendar-popup.component.css']
})
export class SaveStudentCalendarPopupComponent implements OnInit {
  ngOnInit(): void {
    this.convertHoursToString()
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mainCalendarService: MainCalendarService){}

  scrollPosition: number = this.data.scrollPosition

  day: number = this.data.currentDay
  month: number = this.data.currentMonth
  year: number = this.data.currentYear

  arrayPerson: Student[] = this.data.arrayStudentsRoute

  arrayPersonSearch: Student[] = this.arrayPerson
  selectedStudent: Student = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2001-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }


  firstHour: number = this.data.firstHour
  lastHour: number = this.data.lastHour
  firstHourString: string = `${this.firstHour}`
  lastHourString: string = `${this.lastHour}`

  convertHoursToString(){

    if(this.firstHourString.split('').length == 1){
      this.firstHourString = '0'+this.firstHourString+'.00'
    }
    if(this.firstHourString.includes('.') == false && this.firstHourString.split('').length > 1){
      this.firstHourString = this.firstHourString+'.00'
    }
    if(this.firstHourString.includes('.') == true && this.firstHourString.split('.')[0].length == 1){
      this.firstHourString = '0'+this.firstHourString.split('.')[0]+'.'+this.firstHourString.split('.')[1]
    }
    if(this.firstHourString.includes('.') == true && this.firstHourString.split('.')[1].length == 1){
      this.firstHourString += '0'
    }
    this.firstHourString = this.firstHourString.replace('.', ':')

    if(this.lastHourString.split('').length == 1){
      this.lastHourString = '0'+this.lastHourString+'.00'
    }
    if(this.lastHourString.includes('.') == false && this.lastHourString.split('').length > 1){
      this.lastHourString = this.lastHourString+'.00'
    }
    if(this.lastHourString.includes('.') == true && this.lastHourString.split('.')[0].length == 1){
      this.lastHourString = '0'+this.lastHourString.split('.')[0]+'.'+this.lastHourString.split('.')[1]
    }
    if(this.lastHourString.includes('.') == true && this.lastHourString.split('.')[1].length == 1){
      this.lastHourString += '0'
    }
    this.lastHourString = this.lastHourString.replace('.', ':')
  }

  search(e: any){
    this.arrayPersonSearch = []
    var inputData = e.target.value
    this.arrayPersonSearch = this.arrayPerson.filter(str => str.email.toLowerCase().includes(inputData.toLowerCase()) || str.name.toLowerCase().includes(inputData.toLowerCase()) || str.lastName.toLowerCase().includes(inputData.toLowerCase()))
  }

  isDisabledPerson: boolean = true
  coutClick: number = 0
  autocomboxDisplayFalse(){
    if(this.coutClick == -3){
      this.isDisabledPerson = true
    } else{
      this.coutClick = -2
      this.isDisabledPerson = false
      this.coutClick++
    }
  }
  autocomboxDisplayTrue(){
    if(this.coutClick >= 0){
      this.isDisabledPerson = true
    }

    this.coutClick++
  }

  selectStudent(select: Student){
    this.selectedStudent = select
    this.isDisabledInput = true
    this.coutClick = -3
  }

  isDisabledInput: boolean = false
  removeSelectedStudent(){
    this.selectedStudent = {
      id: -1,
      name: "",
      lastName: "",
      dateOfBirth: new Date("2001-01-01"),
      placeOfBirth: "",
      address: "",
      phoneNumber: '',
      email: ""
    }
    this.isDisabledInput = false
    this.validButtonBoolean = true
  }

  colorValue: string = ''
  selectColor(value: any){
    this.colorValue = 'background-color: '+value
  }

  incorrectTime: boolean = true
  incorrectTimeFunction(){
    if(this.mainHourFromFormString < this.mainHourToFromString && this.mainHourFromFormString>=this.firstHourString && this.mainHourToFromString<=this.lastHourString){
      this.incorrectTime = false
    }else{
      this.incorrectTime = true
    }
  }

  validButtonBoolean = true
  orSelected = true
  validButton(){
    this.orSelected = true
    this.validButtonBoolean == true
    if(this.dayOffLayout == true){
      if(this.selectedStudent.id == -1){
        this.orSelected = true
        this.validButtonBoolean = true
      } else{
        this.orSelected = false
        this.incorrectTimeFunction()
        if(this.incorrectTime == false){
          this.validButtonBoolean = false
        }else{
          this.validButtonBoolean = true
        }
      }
    }else{
      this.orSelected = false
      this.validButtonBoolean = true
      this.incorrectTimeFunction()

      if(this.incorrectTime == false){
        this.validButtonBoolean = false
      }else{
        this.validButtonBoolean = true
      }
    }
  }

  dayOffLayout: boolean = true
  radioInputValue(event: any){
    var value = event.target.value
    if(value == 'Zapisz kursanta'){
      this.dayOffLayout = true
      this.colorValue = 'background-color: #FFFFFF'
    }else if(value == 'Wolne godziny'){
      this.dayOffLayout = false
      this.orSelected = false
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

  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = this.data.schoolIdRoute
  instructorId: number = this.data.instructorIdRoute

  setStudent(): number{
    if(this.selectedStudent.id != undefined){
      return this.selectedStudent.id
    }else{
      return -1
    }
  }

  mainHourFromFormString: string = ''
  mainHourToFromString: string = ''

  dateAddedDriveFormString: string = ''

  studentIdForm: number = this.setStudent()
  dateAddedDriveForm: Date = new Date()
  mainHourFromForm: number = -1
  mainHourToFrom: number = -1
  colorFrom: string = ''
  descriptionFrom: string = ''

  sendDataToConvert(){
    this.studentIdForm = this.setStudent()
    this.dateAddedDriveFormString = this.convertDateString(`${this.year}`, `${this.month}`, `${this.day}`)
    this.dateAddedDriveForm = new Date(`${this.year}-${this.month}-${this.day}`)

    var from = this.mainHourFromFormString.replace(':', '.')
    var to = this.mainHourToFromString.replace(':', '.')

    this.mainHourFromForm = Number(from)
    this.mainHourToFrom = Number(to)

    if(this.dayOffLayout == true && this.colorValue == ''){
      this.colorFrom = 'background-color: #FFFFFF'
    }else if(this.dayOffLayout == false){
      this.colorFrom = 'background-color: #00FF00'
    }else{
      this.colorFrom = this.colorValue
    }
  }

  addStudentsHourDriveRoute(){
    this.savedDataAfterRefreshing()
    this.sendDataToConvert()

    let hourDriveObject: StudentsHourDrive = {

      studentId: this.studentIdForm,
      dateAddedDrive: this.dateAddedDriveForm,
      mainHourFrom: this.mainHourFromForm,
      mainHourTo: this.mainHourToFrom,
      color: this.colorFrom,
      description: this.descriptionFrom
    }

    this.mainCalendarService.addStudentsHourDrive(this.schoolId, this.instructorId, this.dateAddedDriveFormString, hourDriveObject)
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionDay', `${this.scrollPosition}`)
    localStorage.setItem('instructorId', `${this.instructorId}`)
    localStorage.setItem('day', `${this.day}`)
    localStorage.setItem('month', `${this.month}`)
    localStorage.setItem('year', `${this.year}`)
  }
}
