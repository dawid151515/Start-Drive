import { Component } from '@angular/core';
import { DeleteForInstructorPopupComponent } from '../delete-for-instructor-popup/delete-for-instructor-popup.component';
import { ShowForInstructorPopupComponent } from '../show-for-instructor-popup/show-for-instructor-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-show-delete-for-instructor',
  templateUrl: './show-delete-for-instructor.component.html',
  styleUrls: ['./show-delete-for-instructor.component.css']
})
export class ShowDeleteForInstructorComponent {

  ngOnInit(): void{

    this.getInstructorRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private instructorService: InstructorService){}

  pageName: string= 'Pokaż / usuń dane instruktora'

  logInInstructor: Instructor = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: "",
    instructorDaysOff: []
  }

  showInstructorDialog(){
    this.dialogRef.open(ShowForInstructorPopupComponent, {
      data: {
        instructorData: this.logInInstructor
      }
    })
  }
  deleteInstructorDialog(){
    this.dialogRef.open(DeleteForInstructorPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        instructorData: this.logInInstructor
      }
    })
  }


   // ----------------------------------------------------router logic--------------------------------------------------

   schoolId: number = -30
   instructorId: number = -20
   getInstructorRoute(){

     this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
     this.instructorId = Number(this.aRoute.snapshot.paramMap.get('instructorId'))

     this.instructorService.getInstructor(this.schoolId, this.instructorId).subscribe((response) => {
      this.logInInstructor = response
    })
   }
}
