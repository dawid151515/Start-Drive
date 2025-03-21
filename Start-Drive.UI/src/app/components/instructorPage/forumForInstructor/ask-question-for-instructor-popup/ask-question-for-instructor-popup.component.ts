import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-ask-question-for-instructor-popup',
  templateUrl: './ask-question-for-instructor-popup.component.html',
  styleUrls: ['./ask-question-for-instructor-popup.component.css']
})
export class AskQuestionForInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  questionTextForm: string = ''

  schoolId: number = this.data.schoolIdRoute
  instructorId: number = this.data.instructorIdRoute

  // ----------------------------------------------------router logic--------------------------------------------------

  askQuestionRoute(){

    let questionObject: Questions = {
      personId: this.instructorId,

      askedQuestion: 'instructor',
      dateAdded: new Date(),
      questionText: this.questionTextForm,
      answer: [],
    }

    this.forumService.askQuestion(this.schoolId, questionObject)
  }
}
