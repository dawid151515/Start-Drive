import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';

@Component({
  selector: 'app-show-for-instructor-popup',
  templateUrl: './show-for-instructor-popup.component.html',
  styleUrls: ['./show-for-instructor-popup.component.css']
})
export class ShowForInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}

  logInInstructor: Instructor = this.data.instructorData

  convertLocaleDate(date: Date): string{
    var setDate = new Date(date)

    var day = setDate.getDate()
    var month = setDate.getMonth()+1
    var year = setDate.getFullYear()

    return this.convertDateString(`${year}`, `${month}`, `${day}`)
  }

  convertDateString(year: string, month: string, day: string): string{
    var monthNumber = Number(month)
    var dayNumber = Number(day)

    var date = ``

    if(dayNumber < 10){
      date += '0'+day+'.'
    }else{
      date += day+'.'
    }

    if(monthNumber<10){
      date +='0'+month+'.'
    } else{
      date += month+'.'
    }

    date +=  `${year}`

    return date
  }
}
