import { RegisterSchool } from 'src/app/models/register-school.model';
import { Component } from '@angular/core';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-register-school',
  templateUrl: './register-school.component.html',
  styleUrls: ['./register-school.component.css']
})
export class RegisterSchoolComponent {

  ngOnInit(): void{
    localStorage.clear()
  }

  constructor(private registerLoginService: RegisterLoginService){}

  passwordValue :string = ''
  repeatPasswordValue :string = ''
  isDisable :boolean = false

  checkedPassword(){
    if(this.passwordValue != this.repeatPasswordValue || this.passwordValue.length<6){
      this.isDisable = true
    } else{
      this.isDisable = false
    }
  }

  nameForm: string = ''
  addressForm: string = ''
  cityForm: string = ''
  phoneNumberForm: string = ''
  accountNumberForm: string = ''
  descriptionForm: string = ''
  emailForm: string = ''

  registerHttp(){

    let registerSchoolData: RegisterSchool = {
      name: this.nameForm,
      address: this.addressForm,
      city: this.cityForm,
      phoneNumber: this.phoneNumberForm,
      accountNumber: this.accountNumberForm,
      description: this.descriptionForm,

      email: this.emailForm,
      password: this.passwordValue
    };

    this.registerLoginService.registerSchool(registerSchoolData)

    alert("Rejestracja szkoły jazdy przebiegła pomyślnie")
    window.location.href = '/startDrive/logowanie'
  }
}
