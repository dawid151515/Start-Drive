import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InstructorAbsence } from 'src/app/models/instructorModel/instructor-absence.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-romove-free-days-calendar-popup',
  templateUrl: './romove-free-days-calendar-popup.component.html',
  styleUrls: ['./romove-free-days-calendar-popup.component.css']
})
export class RomoveFreeDaysCalendarPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instructorService: InstructorService){}

  instructorDaysOffAbsenceModel: InstructorAbsence[] = this.data.instructorDaysOffAbsenceToSend
  freeDaysInstructor: {[dayInYear: string]: string} = this.data.instructorAbsence
  scrollPosition: number = this.data.scrollPosition
  dateAbsenceKeyFrom: string = this.data.dateAbsenceKeyFrom

  freeDaysInstructorThisMonth: {from: string, to: string, value: string} = this.data.freeDaysInstructorThisMonthSelected

  schoolId: number = this.data.schoolIdRoute
  instructorId: number = this.data.instructorIdRoute


  idTableToDelete: number[] = []
  selerctAbsencesIdToDelete(){
    this.idTableToDelete = []
    this.instructorDaysOffAbsenceModel.forEach(element => {
      if(element.dateAbsenceKey>=this.freeDaysInstructorThisMonth.from && element.dateAbsenceKey<=this.freeDaysInstructorThisMonth.to){
        if(element.id != undefined){
          this.idTableToDelete.push(element.id)
        }

      }
    })
  }

  deleteAbsenceRoute(){
    this.savedDataAfterRefreshing()
    this.selerctAbsencesIdToDelete()

    var idTableToDeleteObject: number[] = this.idTableToDelete

    this.instructorService.deleteAbsence(this.schoolId, this.instructorId, idTableToDeleteObject)
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPosition', `${this.scrollPosition}`)
    localStorage.setItem('instructorId', `${this.instructorId}`)
    localStorage.setItem('month', `${(new Date(this.dateAbsenceKeyFrom).getMonth()+1)}`)
    localStorage.setItem('year', `${new Date(this.dateAbsenceKeyFrom).getFullYear()}`)
  }
}
