import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { Login } from 'src/app/models/login.model';
import { RegisterSchool } from 'src/app/models/register-school.model';
import { RegisterStudentInstructor } from 'src/app/models/register-student-instructor.model';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = 'http://localhost:7149/startDrive'
  private loginUrl: string = this.baseUrl+'/login'
  private registerUrl: string = this.baseUrl+'/rejestracja'
  private registerInstructorUrl: string = this.registerUrl+'/instruktor'
  private registerStudentUrl: string = this.registerUrl+'/kursant'

  // ------------------------------------------------------- driving school ----------------------------------------------------------

  storeToken(tokenValue: string){
    localStorage.setItem('token', tokenValue)
  }

  getToken(){
    return localStorage.getItem('token')
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token')
  }

  logInSchool(loginData: Login){
    return this.http.post(this.loginUrl, loginData)
  }

  registerSchool(registerSchoolData: RegisterSchool){

    this.http.post(this.registerUrl, registerSchoolData).subscribe((resultData: any) => {})
  }

  getRegisterSchoolData(schoolId: number){
    return this.http.get<RegisterSchool>(this.registerUrl+'/'+schoolId)
  }

  putRegisterSchoolData(schoolId: number, registerSchoolObject: RegisterSchool){
    return this.http.put<RegisterSchool>(this.registerUrl+'/'+schoolId, registerSchoolObject)
  }

  deleteRegisterSchool(schoolId: number){
    return this.http.delete(this.registerUrl+'/'+schoolId)
  }


  // ------------------------------------------------------- instructor ----------------------------------------------------------

  logInInstructor(loginData: Login){
    return this.http.post<Instructor>(this.loginUrl, loginData)
  }

  addInstructorAccount(instructorAccountObject: RegisterStudentInstructor){
    return this.http.post<number>(this.registerInstructorUrl, instructorAccountObject)
  }



  // ------------------------------------------------------- student ----------------------------------------------------------

  logInStudent(loginData: Login){
    return this.http.post<Student>(this.loginUrl, loginData)
  }

  addStudentAccount(studentAccountObject: RegisterStudentInstructor){
    return this.http.post<number>(this.registerStudentUrl, studentAccountObject)
  }
}
