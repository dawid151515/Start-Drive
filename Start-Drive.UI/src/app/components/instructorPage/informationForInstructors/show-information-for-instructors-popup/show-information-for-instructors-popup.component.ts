import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Information } from 'src/app/models/information.model';

@Component({
  selector: 'app-show-information-for-instructors-popup',
  templateUrl: './show-information-for-instructors-popup.component.html',
  styleUrls: ['./show-information-for-instructors-popup.component.css']
})
export class ShowInformationForInstructorsPopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any){}

  showInformation: Information = this.data.objInfo
}
