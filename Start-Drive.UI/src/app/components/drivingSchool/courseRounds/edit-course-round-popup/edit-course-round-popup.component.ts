import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-edit-course-round-popup',
  templateUrl: './edit-course-round-popup.component.html',
  styleUrls: ['./edit-course-round-popup.component.css']
})
export class EditCourseRoundPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseRoundsService: CourseRoundsService){}

  selectedCourseRound: CourseRoundsModel = this.data.selected
  schoolId: number = this.data.schoolIdRoute

  scrollPosition: number = this.data.scrollPosition
  scrollPositionCurrent: number = this.data.scrollPositionCurrent
  scrollPositionFuture: number = this.data.scrollPositionFuture
  scrollPositionPast: number = this.data.scrollPositionPast

  showDate(dateToConvert: Date): string{
    var toLocaleDateString = new Date(dateToConvert).toLocaleDateString()
    var splitDate = toLocaleDateString.split('.')

    if(splitDate[0].split('').length == 1){
      return `${splitDate[2]}-${splitDate[1]}-0${splitDate[0]}`
    } else{
      return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    }
  }

  buttonDisabled: boolean = false

  //check if the first date is less than the second date
  validationInput: boolean = true
  validationDate(input1: string, input2: string){

    if(input1<=input2){
      this.validationInput = true
      this.buttonDisabled = false
    }else{
      this.validationInput = false
      this.buttonDisabled = true
    }
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  fromFormString = this.showDate(this.selectedCourseRound.from)
  toFormString = this.showDate(this.selectedCourseRound.to)

  nameForm: string = ''+this.selectedCourseRound.name

  putCourseRoundRoute(){
    this.savedDataAfterRefreshing()

    var updateCourseRoundData: CourseRoundsModel = {
      name: this.nameForm,
      from:  new Date(this.fromFormString),
      to:  new Date(this.toFormString),

      studentsThisRoundCourse: []
    }

    if(this.selectedCourseRound.id != undefined){
      this.courseRoundsService.editCourseRound(this.schoolId, this.selectedCourseRound.id, updateCourseRoundData)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionMain', `${this.scrollPosition}`)

    if(new Date(this.fromFormString)<=new Date() && new Date(this.toFormString)>=new Date()){
      localStorage.setItem('scrollPositionCurrent', `${this.scrollPositionCurrent}`)
    }else if(new Date(this.fromFormString)>new Date()){
      localStorage.setItem('scrollPositionFuture', `${this.scrollPositionFuture}`)
    }else{
      localStorage.setItem('scrollPositionPast', `${this.scrollPositionPast}`)
    }
  }
}
