import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answers } from 'src/app/models/forumModel/answers.model';
import { Questions } from 'src/app/models/forumModel/questions.model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient) { }

  private forumUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/forum'

  getQuestionsAnswers(schoolId: number){
    return this.http.get<Questions[]>(this.forumUrl+'/'+schoolId)
  }

  askQuestion(schoolId: number, questionObject: Questions){
    this.http.post(this.forumUrl+'/'+schoolId, questionObject).subscribe((response) => {
      location.reload()
    })
  }

  deleteQuestion(schoolId: number, selectedQuestionId: number){
    this.http.delete(this.forumUrl+'/'+schoolId+'/'+selectedQuestionId)
     .subscribe(() => {
       console.log('Pytanie zostało usunięte')
       location.reload()
     })
  }

  answerQuestion(schoolId: number, selectedQuestionId: number, answerObject: Answers){
    this.http.post(this.forumUrl+'/'+schoolId+'/'+selectedQuestionId, answerObject).subscribe((response) => {
      location.reload()
    })
  }

  deleteReply(schoolId: number, selectedQuestionId: number, selectedanswerId: number){
    this.http.delete(this.forumUrl+'/'+schoolId+'/'+selectedQuestionId+'/'+selectedanswerId)
    .subscribe(() => {
      console.log('Odpowiedź została usunięta')
      location.reload()
    })
  }
}
