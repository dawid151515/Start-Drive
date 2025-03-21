import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { Student } from 'src/app/models/student.model';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-remove-student-course-popup',
  templateUrl: './remove-student-course-popup.component.html',
  styleUrls: ['./remove-student-course-popup.component.css']
})
export class RemoveStudentCoursePopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseRoundsService: CourseRoundsService){}

  selectedStudentFromCourseRound: CourseRoundsStudentsId = this.data.selected
  schoolId: number = this.data.schoolIdRoute
  selectedCourseRound: CourseRoundsModel = this.data.selectedCourseRound
  arrayPersons: Student[] = this.data.students

  scrollPosition: number = this.data.scrollPosition
  scrollPositionCurrent: number = this.data.scrollPositionCurrent
  scrollPositionFuture: number = this.data.scrollPositionFuture
  scrollPositionPast: number = this.data.scrollPositionPast

  findStudent: Student = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2001-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }
  getStudent(id: number){
    var findStudent = this.arrayPersons.find(a => a.id == id)
    if(findStudent != null){
      this.findStudent = findStudent
    }
  }

   //------------------------------------------------------Router logic------------------------------------------------------

  removeStudentCourseRoundRoute(){
    this.savedDataAfterRefreshing()
    if(this.selectedCourseRound.id != undefined && this.selectedStudentFromCourseRound.id != undefined){
      this.courseRoundsService.removeStudentCourseRound(this.schoolId, this.selectedCourseRound.id, this.selectedStudentFromCourseRound.id)
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
