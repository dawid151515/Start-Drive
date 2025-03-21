import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Questions } from 'src/app/models/forumModel/questions.model';
import { ForumService } from 'src/app/service/forum-service/forum.service';

@Component({
  selector: 'app-delete-question-for-student-popup',
  templateUrl: './delete-question-for-student-popup.component.html',
  styleUrls: ['./delete-question-for-student-popup.component.css']
})
export class DeleteQuestionForStudentPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private forumService: ForumService){}

  schoolId: number = this.data.schoolIdRoute
  selectedQuestion: Questions = this.data.selectedQuestion

  scrollPosition: number = this.data.scrollPosition

  // ----------------------------------------------------router logic--------------------------------------------------

  deleteQuestionRoute(){
    this.savedDataAfterRefreshing()

    if(this.selectedQuestion.id != undefined){
      this.forumService.deleteQuestion(this.schoolId, this.selectedQuestion.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionQuestionStudent', `${this.scrollPosition}`)
  }
}
