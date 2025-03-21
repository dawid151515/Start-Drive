import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteSingleDaysPopupComponent } from '../delete-single-days-popup/delete-single-days-popup.component';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';
import { ActivatedRoute } from '@angular/router';
import { SettingsService } from 'src/app/service/settings-service/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  ngOnInit(): void {
    this.getOpenCloseRoute()
    this.getSingleCloseRoute()
    this.getBreakBetweenRidesRoute()
  }

  pageName: string= 'Ustawienia'

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private settingsService: SettingsService){}

  breakBetweenRidesMain: number = 0.3

  daysOfTheWeek: string[] = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
   //tabela z dniami wolnymi od pracy, w kazdym miesiacu, weekendy itd. wraz z godzinami pracy w kazdy dzien tygodnia
   daysAndHoursMain: OpenClose[] = [
    {dayOfTheWeek: 0, isOpen: false, firstHour: 1, lastHour: 23}, // i=0 czyli niedziela
    {dayOfTheWeek: 1, isOpen: true, firstHour: 1, lastHour: 23}, // i=1 czyli poniedziałek
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

  daysAndHoursIsClose(isOpen: boolean){
    if(isOpen == false){
      return true
    }else{
      return false
    }
  }

  daysAndHoursOnchange(value: string, indexfunction: number): boolean{

    if(value == 'open' && this.daysAndHoursMain[indexfunction].isOpen == true){
      return false
    }else if(value == 'open' && this.daysAndHoursMain[indexfunction].isOpen == false){
      return false
    }else{
      return true
    }
  }

  selectOnChange(value: string, indexfunction: number, firstSecondFunction: number){

    if(firstSecondFunction == 0){
      if(value == "open"){
        this.daysAndHoursMain[indexfunction+1].isOpen = true
      }else if(value == "close"){
        this.daysAndHoursMain[indexfunction+1].isOpen = false
      }
    }

    if(firstSecondFunction == 1){
      if(value == "open"){
        this.daysAndHoursMain[indexfunction].isOpen = true
      }else if(value == "close"){
        this.daysAndHoursMain[indexfunction].isOpen = false
      }
    }
  }

  inputFirstHourOnChange(value: string, indexfunction: number, firstSecondFunction: number){

    if(firstSecondFunction == 0){

      var getFirstHour = this.convertStringHourToNumber(value)
      this.daysAndHoursMain[indexfunction+1].firstHour = getFirstHour
    }

    if(firstSecondFunction == 1){

      var getFirstHour = this.convertStringHourToNumber(value)
      this.daysAndHoursMain[indexfunction].firstHour = getFirstHour
    }
  }

  inputLastHourOnChange(value: string, indexfunction: number, firstSecondFunction: number){

    if(firstSecondFunction == 0){
      var getLastHour = this.convertStringHourToNumber(value)
      this.daysAndHoursMain[indexfunction+1].lastHour = getLastHour
    }

    if(firstSecondFunction == 1){
      var getLastHour = this.convertStringHourToNumber(value)
      this.daysAndHoursMain[indexfunction].lastHour = getLastHour
    }
  }

  convertHourFunction(numberDateToString: number){
    var value = `${numberDateToString}`
    var convertValue = ''

    if(value.split('.').length > 1){
      if(value.split('.')[0].length == 1){
        convertValue +=`0${value.split('.')[0]}`
      }else{
        convertValue += `${value.split('.')[0]}`
      }

      if(value.split('.')[1].length == 1){
        convertValue +=`:${value.split('.')[1]}0`
      }else{
        convertValue += `:${value.split('.')[1]}`
      }
    } else{
      if(value.split('').length == 1){
        convertValue += `0${value}:00`
      }else{
        convertValue += `${value}:00`
      }
    }

    return convertValue
  }

  convertToNumberHourFunction(hour: string){
    var hourToNumber = ''

    var hourSplit = hour.split(':')
    if(hourSplit[0].split('')[0] == '0'){
      hourToNumber+=hourSplit[0].split('')[1]+'.'
    } else {
      hourToNumber+=hourSplit[0]+'.'
    }

    if(hourSplit[1].split('')[1] == '0'){
      hourToNumber+=hourSplit[1].split('')[0]
    } else {
      hourToNumber+=hourSplit[1]
    }

    this.breakBetweenRidesMain = Number(hourToNumber)
  }

  isCorrectValue: boolean[] = [true, true, true, true, true, true, true]
  backgroundColorIsCorrect: string[] = ['background:#FFFFFF;', 'background:#FFFFFF;', 'background:#FFFFFF;', 'background:#FFFFFF;', 'background:#FFFFFF;', 'background:#FFFFFF;', 'background:#FFFFFF;']
  isCorrectHourFunction(firstHour: string, lastHour: string, indexfunction: number, firstSecondFunction: number){

    if(firstSecondFunction == 0){

      if(firstHour>lastHour){
        this.isCorrectValue[indexfunction+1] = false
        this.backgroundColorIsCorrect[indexfunction+1] = 'background:#FF0000;'
      }else{
        this.isCorrectValue[indexfunction+1] = true
        this.backgroundColorIsCorrect[indexfunction+1] = 'background:#FFFFFF;'
      }
    }

    if(firstSecondFunction == 1){

      if(firstHour>lastHour){
        this.isCorrectValue[indexfunction] = false
        this.backgroundColorIsCorrect[indexfunction] = 'background:#FF0000;'
      }else{
        this.isCorrectValue[indexfunction] = true
        this.backgroundColorIsCorrect[indexfunction] = 'background:#FFFFFF;'
      }
    }
  }

  isDisabledHourFunction(): boolean{

    var isDisabled = false
    for(var i=0; i<this.isCorrectValue.length; i++){
      if(this.isCorrectValue[i] == false){
        isDisabled = true
        break
      }
    }
    return isDisabled
  }

  consoleLog(){
    console.log(this.daysAndHoursMain)
    console.log(this.isCorrectValue)
  }

  convertStringHourToNumber(hour: string): number{
    var hourString = hour.split(':')
    var hourConvert = ''

    if(hourString[0].split('')[0] == '0'){
      hourConvert = `${hourString[0].split('')[1]}.${hourString[1]}`
      return Number(hourConvert)
    }else{
      hourConvert = `${hourString[0]}.${hourString[1]}`
      return Number(hourConvert)
    }
  }

  freeDaysCalendarMainToConvert: SingleClose[] = [
    // { dateCloseKey: '2023-12-8', openCloseValue: false },
    // { dateCloseKey: '2023-12-9', openCloseValue: false },
    // { dateCloseKey: '2023-12-10', openCloseValue: false },
    // { dateCloseKey: '2023-12-11', openCloseValue: false },
    // { dateCloseKey: '2023-12-12', openCloseValue: false },
    // { dateCloseKey: '2023-12-13', openCloseValue: false },
    // { dateCloseKey: '2023-12-14', openCloseValue: false },
    // { dateCloseKey: '2023-12-15', openCloseValue: false },
    // { dateCloseKey: '2023-12-16', openCloseValue: false },
    // { dateCloseKey: '2023-12-17', openCloseValue: false },
    // { dateCloseKey: '2023-12-18', openCloseValue: false },
    // { dateCloseKey: '2023-12-19', openCloseValue: false },
    // { dateCloseKey: '2023-12-20', openCloseValue: false },
    // { dateCloseKey: '2023-12-22', openCloseValue: false },
    // { dateCloseKey: '2023-12-23', openCloseValue: false }
  ]

  freeDaysConvert(){
    this.freeDaysCalendarMain = {}
    this.freeDaysCalendarMainToConvert.forEach(free => {
      this.freeDaysCalendarMain[`${free.dateCloseKey}`] = free.openCloseValue
    });
    console.log('this.freeDaysCalendarMain = '+this.freeDaysCalendarMain[0])
  }

  //tabela z pojedynczymi dniami wolnymi od pracy, świeta itd.
  freeDaysCalendarMain: {[dayInYear: string]: boolean} = {
    // '2023-12-8': false,
    // '2023-12-9': false,
    // '2023-12-10': false,
    // '2023-12-11': false,
    // '2023-12-12': false,
    // '2023-12-13': false,
    // '2023-12-14': false,
    // '2023-12-15': false,
    // '2023-12-16': false,
    // '2023-12-17': false,
    // '2023-12-18': false,
    // '2023-12-19': false,
    // '2023-12-20': false,
    // '2023-12-21': false,
    // '2023-12-22': false,
    // '2023-12-23': false
  }

  // freeDaysCalendarMainTable: {key: string, value: boolean}[] = []

  // freeDaysCalendarMainConvert(){
  //   if(Object.keys(this.freeDaysCalendarMain).length != 0){
  //     for(var i=0; i<Object.values(this.freeDaysCalendarMain).length; i++){
  //       this.freeDaysCalendarMainTable.push({key: Object.keys(this.freeDaysCalendarMain)[i], value: Object.values(this.freeDaysCalendarMain)[i]})
  //     }
  //   }
  //   console.log('freeDaysCalendarMainTable = '+this.freeDaysCalendarMainTable)
  // }

  addSingleCloseInput: string = ''
  disabledSingleClose: boolean = true
  styleSingleClose: string = 'background:#FFFFFF;'
  checkDateExists(){
    console.log(this.addSingleCloseInput)
    if(this.addSingleCloseInput != '' && this.freeDaysCalendarMain[this.addSingleCloseInput] == undefined){

      this.disabledSingleClose = false
      this.styleSingleClose = 'background:#FFFFFF;'
    }else{

      this.disabledSingleClose = true
      this.styleSingleClose = 'background:#FF0000;'
    }
  }

  refreshData(){

    if(localStorage.getItem('scrollPositionSettings') != null){
      setTimeout(() => {
        var scroll = Number(localStorage.getItem('scrollPositionSettings'))
        window.scroll(0, scroll)
        localStorage.removeItem('scrollPositionSettings')
      }, 250)
    }
  }

  deleteDaysDialog(selectedDay: SingleClose){
    this.dialogRef.open(DeleteSingleDaysPopupComponent, {
      data: {
        schoolId: this.schoolId,
        day: selectedDay,
        scrollPosition: scrollY
      }
    })
  }


   //------------------------------------------------------Router logic------------------------------------------------------

   schoolId: number = -30

   getOpenCloseRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
     console.log(this.schoolId )

     this.settingsService.getOpenClose(this.schoolId).subscribe((response) => {
      console.log(response)
      this.daysAndHoursMain = response
      this.checkCorrectOrderDaysAndHours()
    })
   }

   getSingleCloseRoute(){

    this.settingsService.getSingleClose(this.schoolId).subscribe((response) => {
       console.log(response)
       this.freeDaysCalendarMainToConvert = response
       this.freeDaysConvert()
       this.refreshData()
     })

    //  this.freeDaysCalendarMainConvert()
   }

   getBreakBetweenRidesRoute(){

    this.settingsService.getBreakBetweenRides(this.schoolId).subscribe((response) => {
      console.log(response)
      this.breakBetweenRidesMain = response
    })
   }


   updateOpenCloseRoute(){
    this.savedDataAfterRefreshing()

    let openCloseObject: OpenClose[] = this.daysAndHoursMain

    console.log(this.schoolId)
    this.settingsService.updateOpenClose(this.schoolId, openCloseObject)
  }

  addSingleCloseRoute(){
    this.savedDataAfterRefreshing()

    let singleCloseObject: SingleClose = {
      dateCloseKey: `${this.addSingleCloseInput}`,
      openCloseValue: false
    }

    console.log(this.schoolId)
    this.settingsService.addSingleClose(this.schoolId, singleCloseObject)
  }

  updateBreakBetweenRiders(){
    this.savedDataAfterRefreshing()

    let breakBetweenRidesObject: number = this.breakBetweenRidesMain

    console.log(this.schoolId)
    this.settingsService.updateBreakBetweenRiders(this.schoolId, breakBetweenRidesObject)
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionSettings', `${scrollY}`)
  }

}
