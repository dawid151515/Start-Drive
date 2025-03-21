import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-delete-reply-for-student-popup',
  templateUrl: './delete-reply-for-student-popup.component.html',
  styleUrls: ['./delete-reply-for-student-popup.component.css']
})
export class DeleteReplyForStudentPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  schoolId: number = this.data.schoolIdRoute
  selectedQuestion: Questions = this.data.selectedQuestion
  selectedAnswer: Answers = this.data.selectedAnswer

  index: number = this.data.index
  scrollPosition: number = this.data.scrollPosition

  // ----------------------------------------------------router logic--------------------------------------------------

  deleteReplyRoute(){
    this.savedDataAfterRefreshing()

    if(this.selectedQuestion.id != undefined && this.selectedAnswer.id != undefined){
      this.forumService.deleteReply(this.schoolId, this.selectedQuestion.id, this.selectedAnswer.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionQuestionStudent', `${this.scrollPosition}`)
    localStorage.setItem('indexQuestionStudent', `${this.index}`)
  }
}
