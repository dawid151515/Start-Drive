import { Component } from '@angular/core';
import { RegisterStudentInstructor } from 'src/app/models/register-student-instructor.model';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})

export class RegisterStudentComponent {

  ngOnInit(): void{
    localStorage.clear()
  }

  constructor(private registerLoginService: RegisterLoginService){}

  generatedCode: string = ''
  schoolEmail: string = ''
  studentEmail: string = ''

  passwordValue :string = ''
  repeatPasswordValue :string = ''
  isDisable :boolean = false
  passwordLength: boolean = false


  checkedPassword(){
    if(this.passwordValue != this.repeatPasswordValue || this.passwordValue.length<6){
      this.isDisable = true
    } else{
      this.isDisable = false
    }

    if(this.passwordValue.length<6){
      this.passwordLength = false
    }else{
      this.passwordLength = true
    }
  }

  checkDataCorrect: number = 0
  invalidSchool: boolean = true
  invalidStudent: boolean = true
  invalidCode: boolean = true
  invalidData: boolean = true

  checkDataCorrectFunction(){
    if(this.checkDataCorrect == -1){
      this.invalidSchool = false
      this.invalidStudent = true
      this.invalidCode = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -2){
      this.invalidStudent = false
      this.invalidSchool = true
      this.invalidCode = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -3){
      this.invalidCode = false
      this.invalidSchool = true
      this.invalidStudent = true
      this.invalidData = true
    }else if(this.checkDataCorrect == -4){
      this.invalidData = false
      this.invalidSchool = true
      this.invalidStudent = true
      this.invalidCode = true
    }
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  addStudentAccountRoute(){

    let studentAccountObject: RegisterStudentInstructor = {

      generatedCode: this.generatedCode,
      drivingSchoolEmail: this.schoolEmail,
      personEmail: this.studentEmail,
      password: this.passwordValue
    }

    this.registerLoginService.addStudentAccount(studentAccountObject).subscribe((response) => {

      this.checkDataCorrect = response
      this.checkDataCorrectFunction()

      if(this.checkDataCorrect >= 0){
        alert("Rejestracja kursanta przebiegła pomyślnie")
        window.location.href = '/startDrive/logowanie'
      }
    })
  }
}
