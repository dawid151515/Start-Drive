import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Information } from 'src/app/models/information.model';
import { InformationService } from 'src/app/service/information-service/information.service';

@Component({
  selector: 'app-add-information-popup',
  templateUrl: './add-information-popup.component.html',
  styleUrls: ['./add-information-popup.component.css']
})
export class AddInformationPopupComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private informationService: InformationService){}

  schoolId: number = this.data.schoolIdRoute

  forWhomInfo: string = 'students'
  information: string = ''

  //------------------------------------------------------Router logic------------------------------------------------------

  addInformationRoute(){

    let informationObject: Information = {

      forWhom: this.forWhomInfo,
      info: this.information
    }

    this.informationService.addInformation(this.schoolId, informationObject)
  }
}
