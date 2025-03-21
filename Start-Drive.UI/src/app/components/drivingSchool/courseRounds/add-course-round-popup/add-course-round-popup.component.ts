import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-add-course-round-popup',
  templateUrl: './add-course-round-popup.component.html',
  styleUrls: ['./add-course-round-popup.component.css']
})
export class AddCourseRoundPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseRoundsService: CourseRoundsService){}

  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = this.data.schoolIdRoute

  nameForm: string = ''
  fromForm: string = ''
  toForm: string = ''

  buttonDisabled: boolean = true

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

  addCourseRoundRoute(){

    let courseRoundObject: CourseRoundsModel = {

      name: this.nameForm,
      from: new Date(this.fromForm),
      to: new Date(this.toForm),

      studentsThisRoundCourse: []
    }

    this.courseRoundsService.addCourseRound(this.schoolId, courseRoundObject)
  }
}
