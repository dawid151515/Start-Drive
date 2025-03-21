import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-edit-instructor-popup',
  templateUrl: './edit-instructor-popup.component.html',
  styleUrls: ['./edit-instructor-popup.component.css']
})
export class EditInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instructorService: InstructorService){}

  selectedInstructorData: Instructor = this.data.selectInstuctor
  schoolId: number = this.data.schoolIdRoute
  scrollPosition: number = this.data.scrollPosition

  showDate(dateToConvert: Date): string{
    var toLocaleDateString = new Date(dateToConvert).toLocaleDateString()
    var splitDate = toLocaleDateString.split('.')

    if(splitDate[0].split('').length == 1){
      return `${splitDate[2]}-${splitDate[1]}-0${splitDate[0]}`
    } else{
      return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`
    }
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  dateOfBirthString: string = this.showDate(this.selectedInstructorData.dateOfBirth)

  nameForm: string = `${this.selectedInstructorData.name}`
  lastNameForm: string = `${this.selectedInstructorData.lastName}`
  dateOfBirthForm: Date = new Date(this.dateOfBirthString)
  placeOfBirthForm: string = `${this.selectedInstructorData.placeOfBirth}`
  addressForm: string = `${this.selectedInstructorData.address}`
  phoneNumberForm: string = `${this.selectedInstructorData.phoneNumber}`
  emailForm: string = `${this.selectedInstructorData.email}`

  putInstructorsRoute(){
    this.savedDataAfterRefreshing()

    var updateInstructorData: Instructor = {
      name: this.nameForm,
      lastName: this.lastNameForm,
      dateOfBirth: new Date(this.dateOfBirthString),
      placeOfBirth: this.placeOfBirthForm,
      address: this.addressForm,
      phoneNumber: this.phoneNumberForm,

      email: this.emailForm,
    }

    if(this.selectedInstructorData.id != undefined){
      this.instructorService.editInstructor(this.schoolId, this.selectedInstructorData.id, updateInstructorData)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionHome', `${this.scrollPosition}`)
    localStorage.setItem('instructorId', `${this.selectedInstructorData.id}`)
  }
}
