import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-add-instructor-popup',
  templateUrl: './add-instructor-popup.component.html',
  styleUrls: ['./add-instructor-popup.component.css']
})
export class AddInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instructorService: InstructorService){}

  schoolId: number = this.data.schoolIdRoute

  nameForm: string = ''
  lastNameForm: string = ''
  dateOfBirthForm: Date = new Date('01-01-2000')
  placeOfBirthForm: string = ''
  addressForm: string = ''
  phoneNumberForm: string = ''
  emailForm: string = ''


  //------------------------------------------------------Router logic------------------------------------------------------

  addInstructorRoute(){

    let instructorObject: Instructor = {

      name: this.nameForm,
      lastName: this.lastNameForm,
      dateOfBirth: this.dateOfBirthForm,
      placeOfBirth: this.placeOfBirthForm,
      address: this.addressForm,
      phoneNumber: this.phoneNumberForm,

      email: this.emailForm,
    }

    this.instructorService.addInstructor(this.schoolId, instructorObject)
  }
}
