import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseRoundsStudentsId } from 'src/app/models/course-rounds-students-id.model';
import { CourseRoundsModel } from 'src/app/models/course-rounds.model';

@Injectable({
  providedIn: 'root'
})
export class CourseRoundsService {

  constructor(private http: HttpClient) { }

  private courseRoundsUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/turyKursow'
  private courseRoundsAddStudentUrl: string = this.courseRoundsUrl+'/dodajKursanta'

  getCourseRounds(schoolId: number){
    return this.http.get<CourseRoundsModel[]>(this.courseRoundsUrl+'/'+schoolId)
  }

  addCourseRound(schoolId: number, courseRoundObject: CourseRoundsModel){
    this.http.post(this.courseRoundsUrl+'/'+schoolId, courseRoundObject).subscribe((response) => {
      location.reload()
    })
  }

  editCourseRound(schoolId: number, selectedCourseRoundId: number, updateCourseRoundData: CourseRoundsModel){
    this.http.put(this.courseRoundsUrl+'/'+schoolId+'/'+selectedCourseRoundId, updateCourseRoundData).subscribe((response) => {
      location.reload()
    })
  }

  removeCourseRound(schoolId: number, selectedCourseRoundId: number){
    this.http.delete(this.courseRoundsUrl+'/'+schoolId+'/'+selectedCourseRoundId)
    .subscribe(() => {
      console.log('Tura kursów została usunięta')
      location.reload()
    })
  }

  addStudentToCourseRound(schoolId: number, selectedCourseRoundId: number, studentObject: CourseRoundsStudentsId){
    this.http.post(this.courseRoundsAddStudentUrl+'/'+schoolId+'/'+selectedCourseRoundId, studentObject).subscribe((response) => {
      location.reload()
    })
  }

  removeStudentCourseRound(schoolId: number, selectedCourseRoundId: number, selectedStudentFromCourseRoundId: number){
    this.http.delete(this.courseRoundsUrl+'/'+schoolId+'/'+selectedCourseRoundId+'/'+selectedStudentFromCourseRoundId)
    .subscribe(() => {
      console.log('Kursant został usunięty z tury kursów')
      location.reload()
    })
  }
}
