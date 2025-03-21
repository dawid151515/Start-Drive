import { Information } from './../../../../models/information.model';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationService } from 'src/app/service/information-service/information.service';

@Component({
  selector: 'app-delete-information-popup',
  templateUrl: './delete-information-popup.component.html',
  styleUrls: ['./delete-information-popup.component.css']
})
export class DeleteInformationPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private informationService: InformationService){}

  schoolId: number = this.data.schoolIdRoute
  deleteInformation: string = this.data.info
  informationObject: Information = this.data.informationObj

  scrollPosition: number = this.data.scrollPosition


  // ----------------------------------------------------router logic--------------------------------------------------

  deleteInformationRoute(){
    this.savedDataAfterRefreshing()
    if(this.informationObject.id != undefined){
      this.informationService.deleteInformation(this.schoolId, this.informationObject.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionInformation', `${this.scrollPosition}`)
  }
}
