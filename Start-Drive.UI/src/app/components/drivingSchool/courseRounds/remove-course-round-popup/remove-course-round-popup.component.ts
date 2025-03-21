import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-remove-course-round-popup',
  templateUrl: './remove-course-round-popup.component.html',
  styleUrls: ['./remove-course-round-popup.component.css']
})
export class RemoveCourseRoundPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseRoundsService: CourseRoundsService){}

  selectedCourseRound: CourseRoundsModel = this.data.selected
  schoolId: number = this.data.schoolIdRoute

  scrollPosition: number = this.data.scrollPosition
  scrollPositionCurrent: number = this.data.scrollPositionCurrent
  scrollPositionFuture: number = this.data.scrollPositionFuture
  scrollPositionPast: number = this.data.scrollPositionPast

  //------------------------------------------------------Router logic------------------------------------------------------

  removeCourseRoundRoute(){
    this.savedDataAfterRefreshing()
    if(this.selectedCourseRound.id != undefined){
      this.courseRoundsService.removeCourseRound(this.schoolId, this.selectedCourseRound.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionMain', `${this.scrollPosition}`)

    if(new Date(this.selectedCourseRound.from)<=new Date() && new Date(this.selectedCourseRound.to)>=new Date()){
      localStorage.setItem('scrollPositionCurrent', `${this.scrollPositionCurrent}`)
    }else if(new Date(this.selectedCourseRound.from)>new Date()){
      localStorage.setItem('scrollPositionFuture', `${this.scrollPositionFuture}`)
    }else{
      localStorage.setItem('scrollPositionPast', `${this.scrollPositionPast}`)
    }
  }
}
