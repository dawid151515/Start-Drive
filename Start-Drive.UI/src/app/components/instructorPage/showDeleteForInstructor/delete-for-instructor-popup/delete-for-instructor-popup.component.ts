import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-delete-for-instructor-popup',
  templateUrl: './delete-for-instructor-popup.component.html',
  styleUrls: ['./delete-for-instructor-popup.component.css']
})
export class DeleteForInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instructorService: InstructorService){}

  schoolId: number = this.data.schoolIdRoute
  logInInstructor: Instructor = this.data.instructorData

  //------------------------------------------------------Router logic------------------------------------------------------

  deleteInstructorAccountRoute(){
    if(this.logInInstructor.id != undefined){
      this.instructorService.deleteInstructorAccount(this.schoolId, this.logInInstructor.id)
    }
  }
}
