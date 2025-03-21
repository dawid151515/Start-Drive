import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Information } from 'src/app/models/information.model';
import { ShowInformationForInstructorsPopupComponent } from '../show-information-for-instructors-popup/show-information-for-instructors-popup.component';
import { ActivatedRoute } from '@angular/router';
import { InformationService } from 'src/app/service/information-service/information.service';

@Component({
  selector: 'app-information-for-instructors',
  templateUrl: './information-for-instructors.component.html',
  styleUrls: ['./information-for-instructors.component.css']
})
export class InformationForInstructorsComponent {

  ngOnInit(): void{
    this.getInfromationRoute()
  }

  pageName: string= 'Informacje dla ...'

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private informationService: InformationService){}

  informationForMembers: Information[] = []

  generalInformation: Information[] = []
  informationForInstructors: Information[] = []

  separateInformation(){
    for(var i=0; i<this.informationForMembers.length; i++){

      if(this.informationForMembers[i].forWhom == 'general'){
        this.generalInformation.push(this.informationForMembers[i])
      }else if(this.informationForMembers[i].forWhom == 'instructors'){
        this.informationForInstructors.push(this.informationForMembers[i])
      }
    }
  }

  showInformationDialog(informationObj: Information){
    this.dialogRef.open(ShowInformationForInstructorsPopupComponent, {
      data: {
        objInfo: informationObj
      }
    })
  }


   //------------------------------------------------------Router logic------------------------------------------------------

   schoolId: number = -30
   getInfromationRoute(){
     this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

     this.informationService.getInfromation(this.schoolId).subscribe((response) => {
      this.informationForMembers = response
      this.separateInformation()
    })
   }
}
