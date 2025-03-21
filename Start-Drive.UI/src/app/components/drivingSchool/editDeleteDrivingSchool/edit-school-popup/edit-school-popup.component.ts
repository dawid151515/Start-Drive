import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterSchool } from 'src/app/models/register-school.model';

@Component({
  selector: 'app-edit-school-popup',
  templateUrl: './edit-school-popup.component.html',
  styleUrls: ['./edit-school-popup.component.css']
})
export class EditSchoolPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private registerLoginService: RegisterLoginService){}

  schoolId: number = this.data.schoolIdRoute
  drivingSchoolData: RegisterSchool = this.data.schoolData

  name: string = this.drivingSchoolData.name
  address: string = this.drivingSchoolData.address
  city: string = this.drivingSchoolData.city
  phoneNumber: string = this.drivingSchoolData.phoneNumber
  accountNumber: string = this.drivingSchoolData.accountNumber || ''
  description: string = this.drivingSchoolData.description || ''
  email: string = this.drivingSchoolData.email

  passwordValue :string = ''
  repeatPasswordValue :string = ''

  isDisable :boolean = false

  changePassword: boolean = false
  changePasswordText: string = 'Zmień hasło'
  changePasswordFunction(){
    if(this.changePassword == false){
      this.changePassword = true
      this.changePasswordText = 'Nie zmieniam hasła'

      this.isDisable = true
      this.passwordValue = ''
      this.repeatPasswordValue = ''
    }else{
      this.changePassword = false
      this.changePasswordText = 'Zmień hasło'

      this.isDisable = false
      this.passwordValue = ''
      this.repeatPasswordValue = ''
    }
  }

  checkedPassword(){

    if(this.passwordValue != this.repeatPasswordValue || this.passwordValue.length<6){
      this.isDisable = true
    } else{
      this.isDisable = false
    }
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  updateSchoolDataRoute(){

    let registerSchoolObject: RegisterSchool = {
      name: this.name,
      address: this.address,
      city: this.city,
      phoneNumber: this.phoneNumber,
      accountNumber: this.accountNumber,
      description: this.description,
      email: this.email,
      password: this.passwordValue
    }

    this.registerLoginService.putRegisterSchoolData(this.schoolId, registerSchoolObject).subscribe(() => {
      location.reload()
    })
  }
}
