import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-remove-student-popup',
  templateUrl: './remove-student-popup.component.html',
  styleUrls: ['./remove-student-popup.component.css']
})
export class RemoveStudentPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private studentService: StudentService){}

  selectedStudentData: Student = this.data.selectStudent
  schoolId: number = this.data.schoolIdRoute

  //------------------------------------------------------Router logic------------------------------------------------------

  deleteStudentRoute(){
    if(this.selectedStudentData.id != undefined){
      this.studentService.deleteStudent(this.schoolId, this.selectedStudentData.id)
    }
  }

}
