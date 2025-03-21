import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-remove-instructor-popup',
  templateUrl: './remove-instructor-popup.component.html',
  styleUrls: ['./remove-instructor-popup.component.css']
})
export class RemoveInstructorPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private instructorService: InstructorService){}

  selectedInstructorData: Instructor = this.data.selectInstuctor
  schoolId: number = this.data.schoolIdRoute


  //------------------------------------------------------Router logic------------------------------------------------------
  removeInstructorRoute(){
    if(this.selectedInstructorData.id != undefined){

      this.instructorService.removeInstructor(this.schoolId, this.selectedInstructorData.id)
    }
  }
}
