import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ADrivingSchool } from 'src/app/models/about-driving-school.model';
import { AboutDrivingSchoolService } from 'src/app/service/about-driving-school-service/about-driving-school.service';

@Component({
  selector: 'app-edit-information-popup',
  templateUrl: './edit-information-popup.component.html',
  styleUrls: ['./edit-information-popup.component.css']
})
export class EditInformationPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private aboutDrivingSchoolService: AboutDrivingSchoolService){}

  schoolId: number = this.data.schoolIdRoute
  aDrivingSchool: ADrivingSchool = this.data.info

  sendData: string = this.aDrivingSchool.aboutText

  // ----------------------------------------------------router logic--------------------------------------------------

  updateADrivingSchoolRoute(){

    let aDrivingSchoolObject: ADrivingSchool = {
      aboutText: this.sendData
    }

    if(this.aDrivingSchool.id != undefined){
      this.aboutDrivingSchoolService.updateADrivingSchool(this.schoolId, this.aDrivingSchool.id, aDrivingSchoolObject)
    }
  }
}
