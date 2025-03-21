import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-answer-question-for-instructor-popup',
  templateUrl: './answer-question-for-instructor-popup.component.html',
  styleUrls: ['./answer-question-for-instructor-popup.component.css']
})
export class AnswerQuestionForInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  schoolId: number = this.data.schoolIdRoute
  instructorId: number = this.data.instructorIdRoute
  selectedQuestion: Questions = this.data.selectedQuestion
  index: number = this.data.index
  scrollPosition: number = this.data.scrollPosition

  answerTextForm: string = ''

  // ----------------------------------------------------router logic--------------------------------------------------

   answerQuestionRoute(){
    this.savedDataAfterRefreshing()

    let answerObject: Answers = {
      questionsId: this.selectedQuestion.id,
      personId: this.instructorId,

      whoReplied: 'instructor',
      dateAdded: new Date(),
      answerText: this.answerTextForm,
    }

    if(this.selectedQuestion.id != undefined){
      this.forumService.answerQuestion(this.schoolId, this.selectedQuestion.id, answerObject)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionQuestionInstructor', `${this.scrollPosition}`)
    localStorage.setItem('indexQuestionInstructor', `${this.index}`)
  }
}
