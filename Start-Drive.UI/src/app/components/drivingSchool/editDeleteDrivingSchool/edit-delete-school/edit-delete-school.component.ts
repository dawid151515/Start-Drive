import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditSchoolPopupComponent } from '../edit-school-popup/edit-school-popup.component';
import { DeleteSchoolPopupComponent } from '../delete-school-popup/delete-school-popup.component';
import { RegisterSchool } from 'src/app/models/register-school.model';
import { ActivatedRoute } from '@angular/router';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-edit-delete-school',
  templateUrl: './edit-delete-school.component.html',
  styleUrls: ['./edit-delete-school.component.css']
})
export class EditDeleteSchoolComponent {

  ngOnInit(): void{
    this.getRegisterSchoolRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private registerLoginService: RegisterLoginService){}

  pageName: string= 'Edytuj / usuń szkołę jazdy'

  schoolModel: RegisterSchool = {
    name: 'brak',
    address: 'brak',
    city: 'brak',
    phoneNumber: 'brak',

    email: 'brak',
  }

  editSchoolDialog(){
    this.dialogRef.open(EditSchoolPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        schoolData: this.schoolModel
      }
    })
  }
  deleteSchoolDialog(){
    this.dialogRef.open(DeleteSchoolPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId
      }
    })
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getRegisterSchoolRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.registerLoginService.getRegisterSchoolData(this.schoolId).subscribe((response) => {
      this.schoolModel = response
    })
  }
}
