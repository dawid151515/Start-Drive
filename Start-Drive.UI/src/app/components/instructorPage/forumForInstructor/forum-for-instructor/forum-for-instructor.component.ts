import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AskQuestionForInstructorPopupComponent } from '../ask-question-for-instructor-popup/ask-question-for-instructor-popup.component';
import { AnswerQuestionForInstructorPopupComponent } from '../answer-question-for-instructor-popup/answer-question-for-instructor-popup.component';
import { DeleteQuestionForInstructorPopupComponent } from '../delete-question-for-instructor-popup/delete-question-for-instructor-popup.component';
import { DeleteReplyForInstructorPopupComponent } from '../delete-reply-for-instructor-popup/delete-reply-for-instructor-popup.component';
import { Student } from 'src/app/models/student.model';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student-service/student.service';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-forum-for-instructor',
  templateUrl: './forum-for-instructor.component.html',
  styleUrls: ['./forum-for-instructor.component.css']
})
export class ForumForInstructorComponent {

  ngOnInit(): void{
    this.getInstructorRoute()
    this.showEverythingTable()
  }

  pageName: string= 'Forum'

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private studentService: StudentService,
    private instructorService: InstructorService, private forumService: ForumService){}

  logInInstructor: Instructor = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: "",
    instructorDaysOff: []
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

    if(localStorage.getItem('scrollPositionQuestionInstructor') != null){

      var indexQuestion = localStorage.getItem('indexQuestionInstructor')
      if(indexQuestion != null){

        this.showEverything[Number(indexQuestion)] = true
        localStorage.removeItem('indexQuestionInstructor')
      }

      setTimeout(() => {
        var scroll = Number(localStorage.getItem('scrollPositionQuestionInstructor'))
        window.scroll(0, scroll)
        localStorage.removeItem('scrollPositionQuestionInstructor')
      }, 500)
    }
  }

  showEverythingHidden(indexFunction: number): boolean{
    return this.showEverything[indexFunction]
  }


  askQuestionDialog(){
    this.dialogRef.open(AskQuestionForInstructorPopupComponent,{
      data: {
        schoolIdRoute: this.schoolId,
        instructorIdRoute: this.instructorId
      }
    })
  }
  answerQuestionDialog(question: Questions, index: number){
    this.dialogRef.open(AnswerQuestionForInstructorPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        instructorIdRoute: this.instructorId,
        selectedQuestion: question,
        index: index,
        scrollPosition: scrollY
      }
    })
  }
  deleteQuestionDialog(question: Questions){
    this.dialogRef.open(DeleteQuestionForInstructorPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        selectedQuestion: question,
        scrollPosition: scrollY
      }
    })
  }
  deleteReplyDialog(question: Questions, answer: Answers, index: number){
    this.dialogRef.open(DeleteReplyForInstructorPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        selectedQuestion: question,
        selectedAnswer: answer,
        index: index,
        scrollPosition: scrollY
      }
    })
  }


  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  instructorId: number = -20
  getInstructorRoute(){

    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.instructorId = Number(this.aRoute.snapshot.paramMap.get('instructorId'))

    this.instructorService.getInstructor(this.schoolId, this.instructorId).subscribe((response) => {
      this.logInInstructor = response
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
