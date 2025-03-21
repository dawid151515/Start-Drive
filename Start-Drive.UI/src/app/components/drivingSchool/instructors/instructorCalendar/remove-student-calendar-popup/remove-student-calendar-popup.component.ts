import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentsHourDrive } from 'src/app/models/students-hour-drive.model';
import { MainCalendarService } from 'src/app/service/main-calendar-service/main-calendar.service';

@Component({
  selector: 'app-remove-student-calendar-popup',
  templateUrl: './remove-student-calendar-popup.component.html',
  styleUrls: ['./remove-student-calendar-popup.component.css']
})
export class RemoveStudentCalendarPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private mainCalendarService: MainCalendarService){}

  drivingLessonDelete: StudentsHourDrive = this.data.drivingLesson
  schoolId: number = this.data.schoolId
  instructorId: number = this.data.instructorId

  scrollPosition: number = this.data.scrollPosition

  day: number = this.data.currentDay
  month: number = this.data.currentMonth
  year: number = this.data.currentYear

  //------------------------------------------------------Router logic------------------------------------------------------

  removeDrivingHourRoute(){
    this.savedDataAfterRefreshing()
    if(this.drivingLessonDelete.id != undefined){
      this.mainCalendarService.removeDrivingHour(this.schoolId, this.instructorId, this.drivingLessonDelete.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionDay', `${this.scrollPosition}`)
    localStorage.setItem('instructorId', `${this.instructorId}`)
    localStorage.setItem('day', `${this.day}`)
    localStorage.setItem('month', `${this.month}`)
    localStorage.setItem('year', `${this.year}`)
  }
}
