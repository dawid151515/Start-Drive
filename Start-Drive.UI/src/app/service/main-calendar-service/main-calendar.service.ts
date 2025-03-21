import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';

@Injectable({
  providedIn: 'root'
})
export class MainCalendarService {

  constructor(private http: HttpClient) { }

  private mainCalendarUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/kalendarz'


  getHoursDrive(schoolId: number){
    return this.http.get<StudentsHourDrive[]>(this.mainCalendarUrl+'/'+schoolId)
  }

  getStudentHoursDrive(schoolId: number, studentId: number){
    return this.http.get<StudentsHourDrive[]>(this.mainCalendarUrl+'/'+schoolId+'/'+studentId)
  }

  addStudentsHourDrive(schoolId: number, instructorId: number, dateAddedDriveFormString: string, hourDriveObject: StudentsHourDrive){
    this.http.post<StudentsHourDrive>(this.mainCalendarUrl+'/'+schoolId+'/'+instructorId+'/'+dateAddedDriveFormString, hourDriveObject).subscribe((response) => {
      location.reload()
    })
  }

  removeDrivingHour(schoolId: number, instructorId: number, drivingLessonDeleteId: number){
    this.http.delete(this.mainCalendarUrl+'/'+schoolId+'/'+instructorId+'/'+drivingLessonDeleteId)
    .subscribe(() => {
      console.log('Godzina jazdy została usunięta')
      location.reload()
    })
  }
}
