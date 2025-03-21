import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ADrivingSchool } from 'src/app/models/about-driving-school.model';
import { EditInformationPopupComponent } from '../edit-information-popup/edit-information-popup.component';
import { ActivatedRoute } from '@angular/router';
import { AboutDrivingSchoolService } from 'src/app/service/about-driving-school-service/about-driving-school.service';

@Component({
  selector: 'app-about-driving-school',
  templateUrl: './about-driving-school.component.html',
  styleUrls: ['./about-driving-school.component.css']
})
export class AboutDrivingSchoolComponent {

  ngOnInit(): void{
    this.getAboutDrivingSchoolRoute()
  }

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private aboutDrivingSchoolService: AboutDrivingSchoolService){}

  pageName: string= 'O szkole jazdy'

  drivingSchoolInfo: ADrivingSchool = {
    aboutText: ''
  }

  stringToHtml(str: string){
    return str.replace('\n', '<br>')
  }

  editDialog(){
    this.dialogRef.open(EditInformationPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        info: this.drivingSchoolInfo
      }
    })
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getAboutDrivingSchoolRoute(){
   this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

   this.aboutDrivingSchoolService.getAboutDrivingSchool(this.schoolId).subscribe((response) => {
      this.drivingSchoolInfo = response
    })
  }
}
