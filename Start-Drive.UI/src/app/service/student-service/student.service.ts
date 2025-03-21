import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  private studentUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/kursanci'
  private studentAccountUrl: string = this.studentUrl+'/kontoKursanta'

  getStudents(schoolId: number){
    return this.http.get<Student[]>(this.studentUrl+'/'+schoolId)
  }

  getStudent(schoolId: number, studentId: number){
    return this.http.get<Student>(this.studentUrl+'/'+schoolId+'/'+studentId)
  }

  addStudent(schoolId: number, studentObject: Student){
    this.http.post(this.studentUrl+'/'+schoolId, studentObject).subscribe((response) => {
      location.reload()
    })
  }

  editStudent(schoolId: number, studentId: number, updateStudentData: Student){
    this.http.put(this.studentUrl+'/'+schoolId+'/'+studentId, updateStudentData).subscribe((response) => {
      location.reload()
    })
  }

  deleteStudent(schoolId: number, studentId: number){
    this.http.delete(this.studentUrl+'/'+schoolId+'/'+studentId)
    .subscribe(() => {
      console.log('Kursant został usunięty')
      location.reload()
    })
  }


  //-------------------------------------------------- Delete student account, Student Page ------------------------------------------

  deleteStudentAccount(schoolId: number, logInStudentId: number){
    this.http.delete(this.studentAccountUrl+'/'+schoolId+'/'+logInStudentId)
    .subscribe(() => {
      console.log('Kursant został usunięty')
      alert("Konto kursanta zostało poprawnie usunięte!")
      window.location.href = '/startDrive/logowanie'
    })
  }
}
