import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-add-students-popup',
  templateUrl: './add-students-popup.component.html',
  styleUrls: ['./add-students-popup.component.css']
})
export class AddStudentsPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService){}

  schoolId: number = this.data.schoolIdRoute

  nameForm: string = ''
  lastNameForm: string = ''
  dateOfBirthForm: Date = new Date('20-5-2000')
  placeOfBirthForm: string = ''
  addressForm: string = ''
  phoneNumberForm: string = ''
  emailForm: string = ''


  //------------------------------------------------------Router logic------------------------------------------------------

  addStudentRoute(){

    let studentObject: Student = {

      name: this.nameForm,
      lastName: this.lastNameForm,
      dateOfBirth: this.dateOfBirthForm,
      placeOfBirth: this.placeOfBirthForm,
      address: this.addressForm,
      phoneNumber: this.phoneNumberForm,

      email: this.emailForm,
    }

    this.studentService.addStudent(this.schoolId, studentObject)
  }
}
