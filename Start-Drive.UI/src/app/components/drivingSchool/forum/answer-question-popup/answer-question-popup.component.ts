import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-answer-question-popup',
  templateUrl: './answer-question-popup.component.html',
  styleUrls: ['./answer-question-popup.component.css']
})
export class AnswerQuestionPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  schoolId: number = this.data.schoolIdRoute
  selectedQuestion: Questions = this.data.selectedQuestion
  index: number = this.data.index
  scrollPosition: number = this.data.scrollPosition

  answerTextForm: string = ''

  // ----------------------------------------------------router logic--------------------------------------------------

   answerQuestionRoute(){
    this.savedDataAfterRefreshing()

    let answerObject: Answers = {
      questionsId: this.selectedQuestion.id,
      personId: this.schoolId,

      whoReplied: 'school',
      dateAdded: new Date(),
      answerText: this.answerTextForm,
    }

    if(this.selectedQuestion.id != undefined){
      this.forumService.answerQuestion(this.schoolId, this.selectedQuestion.id, answerObject)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionQuestion', `${this.scrollPosition}`)
    localStorage.setItem('indexQuestion', `${this.index}`)
  }
}
