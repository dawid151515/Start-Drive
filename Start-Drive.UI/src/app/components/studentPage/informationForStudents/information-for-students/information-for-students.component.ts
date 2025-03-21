import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Information } from 'src/app/models/information.model';
import { ShowInformationForStudentsPopupComponent } from '../show-information-for-students-popup/show-information-for-students-popup.component';
import { ActivatedRoute } from '@angular/router';
import { InformationService } from 'src/app/service/information-service/information.service';

@Component({
  selector: 'app-information-for-students',
  templateUrl: './information-for-students.component.html',
  styleUrls: ['./information-for-students.component.css']
})
export class InformationForStudentsComponent {

  ngOnInit(): void{
    this.getInfromationRoute()
  }

  pageName: string= 'Informacje dla ...'

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private informationService: InformationService){}

  informationForMembers: Information[] = []

  generalInformation: Information[] = []
  informationForStudents: Information[] = []

  separateInformation(){
    for(var i=0; i<this.informationForMembers.length; i++){

      if(this.informationForMembers[i].forWhom == 'general'){
        this.generalInformation.push(this.informationForMembers[i])
      }else if(this.informationForMembers[i].forWhom == 'students'){
        this.informationForStudents.push(this.informationForMembers[i])
      }
    }
  }

  showInformationDialog(informationObj: Information){
    this.dialogRef.open(ShowInformationForStudentsPopupComponent, {
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
