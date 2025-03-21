import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-ask-question-popup',
  templateUrl: './ask-question-popup.component.html',
  styleUrls: ['./ask-question-popup.component.css']
})
export class AskQuestionPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  // ----------------------------------------------------router logic--------------------------------------------------

  questionTextForm: string = ''

  schoolId: number = this.data.schoolIdRoute
  askQuestionRoute(){

    let questionObject: Questions = {
      personId: this.schoolId,

      askedQuestion: 'school',
      dateAdded: new Date(),
      questionText: this.questionTextForm,
      answer: [],
    }

    this.forumService.askQuestion(this.schoolId, questionObject)
  }
}
