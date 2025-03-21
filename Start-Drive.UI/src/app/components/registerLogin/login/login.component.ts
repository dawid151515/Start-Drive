import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login.model';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit(): void{
    localStorage.clear()
  }

  constructor(private router: Router, private registerLoginService: RegisterLoginService){}

  active1: string = 'active';
  active2: string = '';
  active3: string = '';

  emailForm: string = ''
  passwordForm: string = ''
  logObjectForm: string = 'student'

  button1(){
    this.active1 = 'active'
    this.active2 = ''
    this.active3 = ''

    this.logObjectForm = 'student'
  }
  button2(){
    this.active1 = ''
    this.active2 = 'active'
    this.active3 = ''

    this.logObjectForm = 'instructor'
  }
  button3(){
    this.active1 = ''
    this.active2 = ''
    this.active3 = 'active'

    this.logObjectForm = 'school'
  }

  invalidLoginDetails: string = ''

  //------------------------------------------------------Router logic------------------------------------------------------

  checkedLoginPassword(){

    this.invalidLoginDetails = ''

    var loginData: Login = {
      email: this.emailForm,
      password: this.passwordForm,
      schoolOrStudent: this.logObjectForm
    }


    if(this.logObjectForm == 'school'){

      this.registerLoginService.logInSchool(loginData).subscribe((resultData: any) => {
        var res = JSON.parse(JSON.stringify(resultData))

        if(res.loggedSchoolData != null){
          this.registerLoginService.storeToken(res.sendToken)
          this.router.navigate(['startDrive/stronaGlowna', res.loggedSchoolData.id])
        }else{
          this.invalidLoginDetails = 'Nieprawidłowy email lub hasło dla szkoły jazdy.'
        }
      })
    }else if(this.logObjectForm == 'instructor'){
      this.registerLoginService.logInInstructor(loginData).subscribe((resultData: any) => {
        var res = JSON.parse(JSON.stringify(resultData))

        if(res.loggedInstructorData != null){
          this.registerLoginService.storeToken(res.sendToken)
          this.router.navigate(['startDrive/instruktor/stronaGlowna', res.loggedInstructorData.drivingSchoolId, res.loggedInstructorData.id])
        }else{
          this.invalidLoginDetails = 'Nieprawidłowy email lub hasło dla instruktora.'
        }
      })
    }else if(this.logObjectForm == 'student'){
      this.registerLoginService.logInStudent(loginData).subscribe((resultData: any) => {
        var res = JSON.parse(JSON.stringify(resultData))

        if(res.loggedStudentData != null){
          this.registerLoginService.storeToken(res.sendToken)
          this.router.navigate(['startDrive/kursant/stronaGlowna', res.loggedStudentData.drivingSchoolId, res.loggedStudentData.id])
        }else{
          this.invalidLoginDetails = 'Nieprawidłowy email lub hasło dla kursanta.'
        }
      })
    }
  }
}
