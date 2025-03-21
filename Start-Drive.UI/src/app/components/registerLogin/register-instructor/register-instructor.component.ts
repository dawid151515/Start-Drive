import { Component } from '@angular/core';
import { RegisterStudentInstructor } from 'src/app/models/register-student-instructor.model';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';


@Component({
  selector: 'app-register-instructor',
  templateUrl: './register-instructor.component.html',
  styleUrls: ['./register-instructor.component.css']
})
export class RegisterInstructorComponent {

  ngOnInit(): void{
    localStorage.clear()
  }

  constructor(private registerLoginService: RegisterLoginService){}

  generatedCode: string = ''
  schoolEmail: string = ''
  instructorEmail: string = ''

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

  checkDataCorrect: number = 0
  invalidSchool: boolean = true
  invalidInstructor: boolean = true
  invalidCode: boolean = true
  invalidData: boolean = true

  checkDataCorrectFunction(){
    if(this.checkDataCorrect == -1){
      this.invalidSchool = false
      this.invalidInstructor = true
      this.invalidCode = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -2){
      this.invalidInstructor = false
      this.invalidSchool = true
      this.invalidCode = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -3){
      this.invalidCode = false
      this.invalidSchool = true
      this.invalidInstructor = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -4){
      this.invalidData = false
      this.invalidSchool = true
      this.invalidInstructor = true
      this.invalidCode = true
    }
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  addInstructorAccountRoute(){

    let instructorAccountObject: RegisterStudentInstructor = {

      generatedCode: this.generatedCode,
      drivingSchoolEmail: this.schoolEmail,
      personEmail: this.instructorEmail,
      password: this.passwordValue
    }

    this.registerLoginService.addInstructorAccount(instructorAccountObject).subscribe((response) => {
      this.checkDataCorrect = response
      this.checkDataCorrectFunction()

      if(this.checkDataCorrect >= 0){
        alert("Rejestracja instruktora przebiegła pomyślnie")
        window.location.href = '/startDrive/logowanie'
      }
    })
  }
}
