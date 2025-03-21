import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';


@Component({
  selector: 'app-delete-reply-popup',
  templateUrl: './delete-reply-popup.component.html',
  styleUrls: ['./delete-reply-popup.component.css']
})
export class DeleteReplyPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  schoolId: number = this.data.schoolIdRoute
  selectedQuestion: Questions = this.data.selectedQuestion
  selectedanswer: Answers = this.data.selectedanswer

  index: number = this.data.index
  scrollPosition: number = this.data.scrollPosition

  // ----------------------------------------------------router logic--------------------------------------------------

  deleteReplyRoute(){
    this.savedDataAfterRefreshing()
    if(this.selectedQuestion.id != undefined && this.selectedanswer.id != undefined){
      this.forumService.deleteReply(this.schoolId, this.selectedQuestion.id, this.selectedanswer.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionQuestion', `${this.scrollPosition}`)
    localStorage.setItem('indexQuestion', `${this.index}`)
  }
}
