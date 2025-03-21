import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { ShowForStudentPopupComponent } from '../show-for-student-popup/show-for-student-popup.component';
import { DeleteForStudentPopupComponent } from '../delete-for-student-popup/delete-for-student-popup.component';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-show-delete-for-student',
  templateUrl: './show-delete-for-student.component.html',
  styleUrls: ['./show-delete-for-student.component.css']
})
export class ShowDeleteForStudentComponent {

  ngOnInit(): void{
    this.getStudentRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private studentService: StudentService){}

  pageName: string= 'Pokaż / usuń dane kursanta'

  logInStudent: Student = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
  }

  showStudentDialog(){
    this.dialogRef.open(ShowForStudentPopupComponent, {
      data: {
        studentData: this.logInStudent
      }
    })
  }
  deleteStudentDialog(){
    this.dialogRef.open(DeleteForStudentPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        studentData: this.logInStudent
      }
    })
  }


  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  studentId: number = -20
  getStudentRoute(){

    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.studentId = Number(this.aRoute.snapshot.paramMap.get('studentId'))

    this.studentService.getStudent(this.schoolId, this.studentId).subscribe((response) => {
      this.logInStudent = response
    })
  }
}
