import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-delete-school-popup',
  templateUrl: './delete-school-popup.component.html',
  styleUrls: ['./delete-school-popup.component.css']
})
export class DeleteSchoolPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DeleteSchoolPopupComponent>, private router: Router,
    private registerLoginService: RegisterLoginService){}

  schoolId: number = this.data.schoolIdRoute

  // ----------------------------------------------------router logic--------------------------------------------------

  deleteRegisterSchoolRoute(){
    this.registerLoginService.deleteRegisterSchool(this.schoolId).subscribe(() => {
      console.log('Szkoła jazdy została usunięta')
      this.dialogRef.close()
      this.router.navigate(['startDrive/logowanie'])
    })
  }
}
