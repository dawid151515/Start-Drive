import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-delete-for-student-popup',
  templateUrl: './delete-for-student-popup.component.html',
  styleUrls: ['./delete-for-student-popup.component.css']
})
export class DeleteForStudentPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService){}

  schoolId: number = this.data.schoolIdRoute
  logInStudent: Student = this.data.studentData


  //------------------------------------------------------Router logic------------------------------------------------------

  deleteStudentAccountRoute(){
    if(this.logInStudent.id != undefined){
      this.studentService.deleteStudentAccount(this.schoolId, this.logInStudent.id)
    }
  }
}
