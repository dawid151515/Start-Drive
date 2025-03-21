import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';
import { Student } from 'src/app/models/student.model';
import { CourseRoundsService } from 'src/app/service/course-rounds-service/course-rounds.service';

@Component({
  selector: 'app-add-student-course-popup',
  templateUrl: './add-student-course-popup.component.html',
  styleUrls: ['./add-student-course-popup.component.css']
})
export class AddStudentCoursePopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private courseRoundsService: CourseRoundsService){}

  ngOnInit(): void {
    this.withoutAddedElements()
  }

  selectedCourseRound: CourseRoundsModel = this.data.selected
  schoolId: number = this.data.schoolIdRoute
  arrayPerson: Student[] = this.data.arrayPersons

  scrollPosition: number = this.data.scrollPosition
  scrollPositionCurrent: number = this.data.scrollPositionCurrent
  scrollPositionFuture: number = this.data.scrollPositionFuture
  scrollPositionPast: number = this.data.scrollPositionPast


  arrayPersonSearch: Student[] = this.arrayPerson
  selectedStudent: Student = {
    id: -1,
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  //removing the possibility of adding the same students to the same course session
  arrayWithoutAddedElements: Student[] = []
  withoutAddedElements(){
    this.arrayWithoutAddedElements = []

    if(this.selectedCourseRound.studentsThisRoundCourse.length != 0 && this.selectedCourseRound.studentsThisRoundCourse.length != this.arrayPerson.length){

      var count = 0
      for(var i=0; i<this.arrayPerson.length; i++){

        count = 0
        for(var j=0; j<this.selectedCourseRound.studentsThisRoundCourse.length; j++){
          if(this.arrayPerson[i].id == this.selectedCourseRound.studentsThisRoundCourse[j].courseRoundStudentId){
            count = 1
            break
          }
        }

        if(count == 0){
          this.arrayWithoutAddedElements.push(this.arrayPerson[i])
        }
      }
    }else if(this.selectedCourseRound.studentsThisRoundCourse.length == this.arrayPerson.length){
      this.arrayWithoutAddedElements = []
    }else{
      this.arrayWithoutAddedElements = this.arrayPerson
    }
  }

  search(e: any){
    this.arrayPersonSearch = []
    var inputData = e.target.value
    this.arrayPersonSearch = this.arrayWithoutAddedElements.filter(str => str.email.toLowerCase().includes(inputData.toLowerCase()) || str.name.toLowerCase().includes(inputData.toLowerCase()) || str.lastName.toLowerCase().includes(inputData.toLowerCase()))
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
      dateOfBirth: new Date("2000-01-01"),
      placeOfBirth: "",
      address: "",
      phoneNumber: '',
      email: ""
    }
    this.isDisabledInput = false
  }

  orSelected = false
  validButton(){
    this.orSelected = false
      if(this.selectedStudent.id == -1){
        this.orSelected = true
      } else{
        this.orSelected = false
      }
  }

  //------------------------------------------------------Router logic------------------------------------------------------


  addStudentToCourseRoundRoute(){
    this.savedDataAfterRefreshing()

    if(this.selectedStudent.id != undefined && this.selectedStudent.id != -1){
      let studentObject: CourseRoundsStudentsId = {
        courseRoundStudentId: this.selectedStudent.id
      }


      if(this.selectedCourseRound.id != undefined){
        this.courseRoundsService.addStudentToCourseRound(this.schoolId, this.selectedCourseRound.id, studentObject)
      }
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
