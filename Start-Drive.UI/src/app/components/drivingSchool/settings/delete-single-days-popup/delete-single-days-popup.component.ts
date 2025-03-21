import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SingleClose } from 'src/app/models/single-close.model';
import { SettingsService } from 'src/app/service/settings-service/settings.service';

@Component({
  selector: 'app-delete-single-days-popup',
  templateUrl: './delete-single-days-popup.component.html',
  styleUrls: ['./delete-single-days-popup.component.css']
})
export class DeleteSingleDaysPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private settingsService: SettingsService){}

  selectedDay: SingleClose = this.data.day
  schoolId: number = this.data.schoolId
  scrollPosition: number = this.data.scrollPosition

  //------------------------------------------------------Router logic------------------------------------------------------


  deleteSingleCloseRoute(){
    this.savedDataAfterRefreshing()

    if(this.selectedDay.id != undefined){
      this.settingsService.deleteSingleClose(this.schoolId, this.selectedDay.id)
    }
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionSettings', `${this.scrollPosition}`)
  }
}
