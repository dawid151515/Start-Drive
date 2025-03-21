import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { AskQuestionForStudentPopupComponent } from '../ask-question-for-student-popup/ask-question-for-student-popup.component';
import { AnswerQuestionForStudentPopupComponent } from '../answer-question-for-student-popup/answer-question-for-student-popup.component';
import { DeleteQuestionForStudentPopupComponent } from '../delete-question-for-student-popup/delete-question-for-student-popup.component';
import { DeleteReplyForStudentPopupComponent } from '../delete-reply-for-student-popup/delete-reply-for-student-popup.component';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student-service/student.service';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-forum-for-student',
  templateUrl: './forum-for-student.component.html',
  styleUrls: ['./forum-for-student.component.css']
})
export class ForumForStudentComponent {

  ngOnInit(): void{
    this.getLogInStudentRoute()
    this.showEverythingTable()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private studentService: StudentService,
    private instructorService: InstructorService, private forumService: ForumService){}

  pageName: string= 'Forum'


  logInStudent: Student = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  arrayInstructors: Instructor[] = []

  arrayStudents: Student[] = []

  questionTable: Questions[] = []

  findPerson(askedQuestion: string, personId: number){
    if(askedQuestion == 'school'){
      return 'Szkoła jazdy'
    }else if(askedQuestion == 'instructor'){
      var findInstructor = this.arrayInstructors.find((element) => element.id == personId)

      return 'Instruktor: '+findInstructor?.name+' '+findInstructor?.lastName+', '+findInstructor?.email
    }else if(askedQuestion == 'student'){
      var findStudent = this.arrayStudents.find((element) => element.id == personId)

      return 'Student: '+findStudent?.name+' '+findStudent?.lastName+', '+findStudent?.email
    }else{
      return ''
    }
  }

  setStylePersonPostDate(askedQuestion:string, questionAnswer: boolean): string{
    if(askedQuestion == 'school'){
      if(questionAnswer == true){
        return 'background-color: #FF0000'
      }else{
        return 'background-color: #FF6666'
      }
    }else if(askedQuestion == 'instructor'){
      if(questionAnswer == true){
        return 'background-color: #00CCCC'
      }else{
        return 'background-color: #00FFFF'
      }
    }else if(askedQuestion = 'student'){
      if(questionAnswer == true){
        return 'background-color: #00CC00'
      }else{
        return 'background-color: #00FF00'
      }
    }else{
      return 'background-color: #E0E0E0'
    }
  }

  questionTableSearch: Questions[] = this.questionTable
  search(e: any){
    this.questionTableSearch = []
    var inputData = e.target.value
    this.questionTableSearch = this.questionTable.filter(str => str.questionText.toLowerCase().includes(inputData.toLowerCase()))
  }

  showEverything: boolean[] = []
  showEverythingTable(){
    for(var i=0; i<this.questionTable.length; i++){
      this.showEverything[i] = true
    }
  }

  index: number = -1
  showEverythingFunction(indexFunction: number){
    if(this.showEverything[indexFunction] == true){
      this.showEverything[indexFunction] = false
    } else{
      this.showEverything[indexFunction] = true
    }
    this.index = indexFunction
  }

  showEverythingHidden(indexFunction: number): boolean{
    return this.showEverything[indexFunction]
  }

  convertLocaleTime(date: Date): string{
    var setDate = new Date(date)

    var hour = setDate.getHours()
    var minute = setDate.getMinutes()
    var second = setDate.getSeconds()

    return this.convertTimeString(`${hour}`, `${minute}`, `${second}`)
  }
  convertLocaleDate(date: Date): string{
    var setDate = new Date(date)

    var day = setDate.getDate()
    var month = setDate.getMonth()+1
    var year = setDate.getFullYear()

    return this.convertDateString(`${year}`, `${month}`, `${day}`)
  }

  convertDateString(year: string, month: string, day: string): string{
    var monthNumber = Number(month)
    var dayNumber = Number(day)

    var date = ``

    if(dayNumber < 10){
      date += '0'+day+'.'
    }else{
      date += day+'.'
    }

    if(monthNumber<10){
      date +='0'+month+'.'
    } else{
      date += month+'.'
    }

    date +=  `${year}`

    return date
  }

  convertTimeString(hours: string, minutes: string, seconds: string): string{
    var hoursNumber = Number(hours)
    var minutesNumber = Number(minutes)
    var secondsNumber = Number(seconds)

    var time = ``

    if(hoursNumber < 10){
      time += '0'+hoursNumber+':'
    }else{
      time += hoursNumber+':'
    }

    if(minutesNumber<10){
      time +='0'+minutesNumber+':'
    } else{
      time += minutesNumber+':'
    }

    if(secondsNumber<10){
      time +=  `0${secondsNumber}`
    }else{
      time +=  `${secondsNumber}`
    }

    return time
  }

  refreshData(){

    if(localStorage.getItem('scrollPositionQuestionStudent') != null){

      var indexQuestion = localStorage.getItem('indexQuestionStudent')
      if(indexQuestion != null){

        this.showEverything[Number(indexQuestion)] = true
        localStorage.removeItem('indexQuestionStudent')
      }

      setTimeout(() => {
        var scroll = Number(localStorage.getItem('scrollPositionQuestionStudent'))
        window.scroll(0, scroll)
        localStorage.removeItem('scrollPositionQuestionStudent')
      }, 500)
    }
  }


  askQuestionDialog(){
    this.dialogRef.open(AskQuestionForStudentPopupComponent,{
      data: {
        schoolIdRoute: this.schoolId,
        studentIdRoute: this.studentId
      }
    })
  }
  answerQuestionDialog(question: Questions, index: number){
    this.dialogRef.open(AnswerQuestionForStudentPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        studentIdRoute: this.studentId,
        selectedQuestion: question,
        index: index,
        scrollPosition: scrollY
      }
    })
  }
  deleteQuestionDialog(question: Questions){
    this.dialogRef.open(DeleteQuestionForStudentPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        selectedQuestion: question
      }
    })
  }
  deleteReplyDialog(question: Questions, answer: Answers, index: number){
    this.dialogRef.open(DeleteReplyForStudentPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        selectedQuestion: question,
        selectedAnswer: answer,
        index: index,
        scrollPosition: scrollY
      }
    })
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  studentId: number = -30
  getLogInStudentRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.studentId = Number(this.aRoute.snapshot.paramMap.get('studentId'))

    this.studentService.getStudent(this.schoolId, this.studentId).subscribe((response) => {
      this.logInStudent = response
    })

    this.getInstructorsRoute()
    this.getStudentsRoute()
    this.getQuestionsAnswersRoute()
  }

  getInstructorsRoute(){

    this.instructorService.getInstructors(this.schoolId).subscribe((response) => {
      this.arrayInstructors = response
    })
  }

  getStudentsRoute(){

    this.studentService.getStudents(this.schoolId).subscribe((response) => {
      this.arrayStudents = response
    })
  }

  getQuestionsAnswersRoute(){

    this.forumService.getQuestionsAnswers(this.schoolId).subscribe((response) => {
      this.questionTable = response
      this.questionTableSearch = this.questionTable
      this.refreshData()
    })
  }
}
