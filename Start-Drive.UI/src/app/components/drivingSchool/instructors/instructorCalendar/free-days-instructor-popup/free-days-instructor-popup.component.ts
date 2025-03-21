import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RomoveFreeDaysCalendarPopupComponent } from '../romove-free-days-calendar-popup/romove-free-days-calendar-popup.component';
import { InstructorAbsence } from 'src/app/models/instructorModel/instructor-absence.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-free-days-instructor-popup',
  templateUrl: './free-days-instructor-popup.component.html',
  styleUrls: ['./free-days-instructor-popup.component.css']
})
export class FreeDaysInstructorPopupComponent implements OnInit{
  ngOnInit(): void {
    this.convertObject()
    this.validationDate(this.dateAbsenceKeyFrom, this.dateAbsenceKeyTo)
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialog, private instructorService: InstructorService){}

  instructorDaysOffAbsenceModel: InstructorAbsence[] = this.data.instructorDaysOffAbsenceToSend
  freeDaysInstructor: {[dayInYear: string]: string} = this.data.instructorAbsence
  schoolId: number = this.data.schoolIdRoute
  instructorId: number = this.data.instructorIdRoute
  scrollPosition: number = this.data.scrollPosition
  dateToSend: string = this.data.dateSend


  freeDaysInstructorConvert: {key: string, value: string}[] = []

  freeDaysInstructorThisMonth: {from: string, to: string, value: string}[] = []

  deleteFreeDaysDialog(selected: {from: string, to: string, value: string}){
    this.dialogRef.open(RomoveFreeDaysCalendarPopupComponent, {
      data: {
        instructorDaysOffAbsenceToSend: this.instructorDaysOffAbsenceModel,
        freeDaysInstructorRoute: this.freeDaysInstructor,
        freeDaysInstructorThisMonthSelected: selected,
        schoolIdRoute: this.schoolId,
        instructorIdRoute: this.instructorId,
        scrollPosition: this.scrollPosition,
        dateAbsenceKeyFrom: this.dateToSend
      }
    })
  }

  convertObject(){

    if(Object.keys(this.freeDaysInstructor).length != 0){
      //convert the dictionary with instructor absences to a key value object to operate on the board and not on the dictionary
      for(var i=0; i<Object.values(this.freeDaysInstructor).length; i++){
        this.freeDaysInstructorConvert.push({key: Object.keys(this.freeDaysInstructor)[i], value: Object.values(this.freeDaysInstructor)[i]})
      }

      //we filter absences from the currently selected month and year
      var freeDaysCurrentMonthYear = this.freeDaysInstructorConvert.filter(({key}) => new Date(key).getFullYear() == this.data.year && (new Date(key).getMonth()+1) == this.data.month)

      if(freeDaysCurrentMonthYear.length != 0){
        //sort so that when earlier absences are added later, they are displayed correctly in order
        freeDaysCurrentMonthYear.sort((first, second) => first.key>second.key ? -1 : 1)

        var counterFirst = 0
        var counterSecond = 0
        var firstObjKey = freeDaysCurrentMonthYear[0].key
        var lastObjKey = freeDaysCurrentMonthYear[0].key
        for(var j=0; j<freeDaysCurrentMonthYear.length; j++){

          var s = 0
          if(freeDaysCurrentMonthYear[j+1] != undefined){
            var d1 = Date.UTC(new Date(freeDaysCurrentMonthYear[j].key).getFullYear(), new Date(freeDaysCurrentMonthYear[j].key).getMonth(), new Date(freeDaysCurrentMonthYear[j].key).getDate())
            var d2 = Date.UTC(new Date(freeDaysCurrentMonthYear[j+1].key).getFullYear(), new Date(freeDaysCurrentMonthYear[j+1].key).getMonth(), new Date(freeDaysCurrentMonthYear[j+1].key).getDate())

            //86400000 is how many milliseconds there are in 1 day
            s = (d1-d2)/86400000
          }

          if(counterSecond > 0){
            firstObjKey = freeDaysCurrentMonthYear[j].key
            counterSecond = 0
          }
          if(freeDaysCurrentMonthYear[j+1] != undefined && (freeDaysCurrentMonthYear[j+1].value != freeDaysCurrentMonthYear[j].value || s > 1)){
            lastObjKey = freeDaysCurrentMonthYear[j].key
            counterFirst = 0
            counterSecond++
            this.freeDaysInstructorThisMonth.push({from: lastObjKey, to: firstObjKey, value: freeDaysCurrentMonthYear[j].value})
          }else if(freeDaysCurrentMonthYear[j+1] != undefined && freeDaysCurrentMonthYear[j+1].value == freeDaysCurrentMonthYear[j].value && counterFirst == 0){
            firstObjKey = freeDaysCurrentMonthYear[j].key
            counterFirst++
          }else if(freeDaysCurrentMonthYear[j+1] == undefined){
            lastObjKey = freeDaysCurrentMonthYear[j].key
            this.freeDaysInstructorThisMonth.push({from: lastObjKey, to: firstObjKey, value: freeDaysCurrentMonthYear[j].value})
          }
        }
      }
    }
  }

  //if we select the other option when selecting the type of absence, an input is displayed with the possibility of entering a different type of absence
  choseDifferent(value: string): boolean{
    if(value == 'inne'){
      this.reasonAbsenceValueForm = this.differentReasonAbsenceValueForm
      return false
    }else{
      this.reasonAbsenceValueForm = value
      return true
    }
  }


  //changing the style of buttons by clicking on them and displaying either adding absences or displaying absences
  absenceDisabled: boolean = true
  changeStyle1() {
    this.absenceDisabled = true

    const button1 = document.getElementsByClassName('addAbsenceButton');
    const button2 = document.getElementsByClassName('seeAbsenceButton');
    if (button1[0].classList.contains('absenceButtonClick')) {
        return
    } else {
        button1[0].classList.add('absenceButtonClick');
        button2[0].classList.remove('absenceButtonClick')
    }
  }
  changeStyle2() {
    this.absenceDisabled = false

    const button1 = document.getElementsByClassName('addAbsenceButton');
    const button2 = document.getElementsByClassName('seeAbsenceButton');
    if (button2[0].classList.contains('absenceButtonClick')) {
        return
    } else {
        button2[0].classList.add('absenceButtonClick');
        button1[0].classList.remove('absenceButtonClick')
    }
  }

  buttonDisabled: boolean = true
  //check if the first date is less than the second date
  validationInput: boolean = true
  dateExistsInput: boolean = true
  validationDate(input1: string, input2: string){

    if(input1<=input2){
      this.validationInput = true
      this.buttonDisabled = false
    }else{
      this.validationInput = false
      this.buttonDisabled = true
    }

    var datefrom = new Date(`${input1}`).getTime()
    var dateto = new Date(input2).getTime()
    var days = (dateto-datefrom)/86400000

    var date = new Date(this.dateAbsenceKeyFrom)
    for(var i=0; i<=days; i++){
      if(this.freeDaysInstructor[`${this.showDate(date)}`] != undefined){
        this.dateExistsInput = false
        this.buttonDisabled = true
        break;
      }else{
        this.dateExistsInput = true
      }
      date.setDate(date.getDate() + 1)
    }
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  showDate(dateToConvert: Date): string{
    var toLocaleDateString = new Date(dateToConvert).toLocaleDateString()
    var splitDate = toLocaleDateString.split('.')

    if(splitDate[0].split('').length == 1){
      return `${splitDate[2]}-${splitDate[1]}-0${splitDate[0]}`
    } else{
      return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    }
  }

  dateAbsenceKeyFrom: string = `${this.dateToSend}`
  dateAbsenceKeyTo: string = `${this.dateToSend}`

  freeDaysInstructorToAdd: InstructorAbsence[] = []
  createAbsenceModel(){
    var datefrom = new Date(this.dateAbsenceKeyFrom).getTime()
    var dateto = new Date(this.dateAbsenceKeyTo).getTime()
    var days = (dateto-datefrom)/86400000

    var date = new Date(this.dateAbsenceKeyFrom)
    for(var i=0; i<=days; i++){
      this.freeDaysInstructorToAdd.push({dateAbsenceKey: `${this.showDate(date)}`, reasonAbsenceValue: this.reasonAbsenceValueForm})
      date.setDate(date.getDate() + 1)
    }
  }

  dateAbsenceKeyFormDate: Date = new Date()
  differentReasonAbsenceValueForm: string = ''

  dateAbsenceKeyForm: string = ''
  reasonAbsenceValueForm: string = ''


  addInstructorAbsenceRoute(){

    this.createAbsenceModel()

    let instructorAbsenceListObject: InstructorAbsence[] = this.freeDaysInstructorToAdd

    this.instructorService.addInstructorAbsence(this.schoolId, this.instructorId, instructorAbsenceListObject)

    this.savedDataAfterRefreshing()
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPosition', `${this.scrollPosition}`)
    localStorage.setItem('instructorId', `${this.instructorId}`)
    localStorage.setItem('month', `${(new Date(this.dateAbsenceKeyFrom).getMonth()+1)}`)
    localStorage.setItem('year', `${new Date(this.dateAbsenceKeyFrom).getFullYear()}`)
  }
}
