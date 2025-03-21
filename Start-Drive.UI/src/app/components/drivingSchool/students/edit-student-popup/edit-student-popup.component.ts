import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-edit-student-popup',
  templateUrl: './edit-student-popup.component.html',
  styleUrls: ['./edit-student-popup.component.css']
})
export class EditStudentPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService){}

  selectedStudentData: Student = this.data.selectStudent
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

  dateOfBirthString: string = this.showDate(this.selectedStudentData.dateOfBirth)

  nameForm: string = `${this.selectedStudentData.name}`
  lastNameForm: string = `${this.selectedStudentData.lastName}`
  dateOfBirthForm: Date = new Date(this.dateOfBirthString)
  placeOfBirthForm: string = `${this.selectedStudentData.placeOfBirth}`
  addressForm: string = `${this.selectedStudentData.address}`
  phoneNumberForm: string = `${this.selectedStudentData.phoneNumber}`
  emailForm: string = `${this.selectedStudentData.email}`

  putStudentRoute(){
    this.savedDataAfterRefreshing()

    var updateStudentData: Student = {
      name: this.nameForm,
      lastName: this.lastNameForm,
      dateOfBirth: new Date(this.dateOfBirthString),
      placeOfBirth: this.placeOfBirthForm,
      address: this.addressForm,
      phoneNumber: this.phoneNumberForm,

      email: this.emailForm,
    }

    if(this.selectedStudentData.id != undefined){
      this.studentService.editStudent(this.schoolId, this.selectedStudentData.id, updateStudentData)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionStudent', `${this.scrollPosition}`)
    localStorage.setItem('studentId', `${this.selectedStudentData.id}`)
  }
}
