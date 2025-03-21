import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InstructorAbsence } from 'src/app/models/instructorModel/instructor-absence.model';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http: HttpClient) { }

  private instructorUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/instruktorzy'
  private instructorAbsenceUrl: string = this.instructorUrl+'/nieobecnosc'
  private instructorAccountUrl: string = this.instructorUrl+'/kontoInstruktora'

  getInstructor(schoolId: number, instructorId: number){
    return this.http.get<Instructor>(this.instructorUrl+'/'+schoolId+'/'+instructorId)
  }

  getInstructors(schoolId: number){
    return this.http.get<Instructor[]>(this.instructorUrl+'/'+schoolId)
  }

  addInstructor(schoolId: number, instructorObject: Instructor){
    this.http.post(this.instructorUrl+'/'+schoolId, instructorObject).subscribe((response) => {
      location.reload()
    })
  }

  editInstructor(schoolId: number, instructorId: number, updateInstructorData: Instructor){
    this.http.put(this.instructorUrl+'/'+schoolId+'/'+instructorId, updateInstructorData).subscribe((response) => {
      location.reload()
    })
  }

  removeInstructor(schoolId: number, instructorId: number){
    return this.http.delete(this.instructorUrl+'/'+schoolId+'/'+instructorId).subscribe(() => {
      console.log('Instruktor został usunięty')
      location.reload()
    })
  }


  //------------------------------------------------------ Instructor Absence ---------------------------------------------------

  addInstructorAbsence(schoolId: number, instructorId: number, instructorAbsenceListObject: InstructorAbsence[]){
    this.http.post(this.instructorAbsenceUrl+'/'+schoolId+'/'+instructorId, instructorAbsenceListObject)
      .subscribe((response) => {
        console.log(response)
        location.reload()
      })
  }

  deleteAbsence(schoolId: number, instructorId: number, idTableToDeleteObject: number[]){
    this.http.put(this.instructorAbsenceUrl+'/'+schoolId+'/'+instructorId, idTableToDeleteObject).subscribe((response) => {
      console.log(response)
      location.reload()
    })
  }



  //-------------------------------------------------- Delete instructor account, Instructor Page ------------------------------------------

  deleteInstructorAccount(schoolId: number, logInInstructorId: number){
    this.http.delete(this.instructorAccountUrl+'/'+schoolId+'/'+logInInstructorId)
    .subscribe(() => {
      console.log('Instruktor został usunięty')
      alert("Konto instruktora zostało poprawnie usunięte!")
      window.location.href = '/startDrive/logowanie'
    })
  }
}
