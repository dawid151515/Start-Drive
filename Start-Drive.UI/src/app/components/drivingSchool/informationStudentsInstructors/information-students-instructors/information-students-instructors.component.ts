import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Information } from 'src/app/models/information.model';
import { DeleteInformationPopupComponent } from '../delete-information-popup/delete-information-popup.component';
import { ShowInformationPopupComponent } from '../show-information-popup/show-information-popup.component';
import { AddInformationPopupComponent } from '../add-information-popup/add-information-popup.component';
import { ActivatedRoute } from '@angular/router';
import { InformationService } from 'src/app/service/information-service/information.service';

@Component({
  selector: 'app-information-students-instructors',
  templateUrl: './information-students-instructors.component.html',
  styleUrls: ['./information-students-instructors.component.css']
})
export class InformationStudentsInstructorsComponent {

  ngOnInit(): void{
    this.getInfromationRoute()
  }

  pageName: string= 'Informacje dla ...'

  constructor(private dialogRef: MatDialog, private aRoute: ActivatedRoute, private informationService: InformationService){}

  informationForMembers: Information[] = []

  generalInformation: Information[] = []
  informationForStudents: Information[] = []
  informationForInstructors: Information[] = []

  separateInformation(){
    for(var i=0; i<this.informationForMembers.length; i++){

      if(this.informationForMembers[i].forWhom == 'general'){
        this.generalInformation.push(this.informationForMembers[i])
      }else if(this.informationForMembers[i].forWhom == 'students'){
        this.informationForStudents.push(this.informationForMembers[i])
      }else if(this.informationForMembers[i].forWhom == 'instructors'){
        this.informationForInstructors.push(this.informationForMembers[i])
      }
    }
  }

  refreshData(){
    if(localStorage.getItem('scrollPositionInformation') != null){
      setTimeout(() => {
        var scroll = Number(localStorage.getItem('scrollPositionInformation'))
        window.scroll(0, scroll)
        localStorage.removeItem('scrollPositionInformation')
      }, 500)
    }
  }

  deleteInformationDialog(information: string, infoObj: Information, event:any){

    event.stopPropagation() //(click) child and does not trigger a click on the parent

    this.dialogRef.open(DeleteInformationPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId,
        info: information,
        informationObj: infoObj,
        scrollPosition: scrollY
      }
    })
  }
  showInformationDialog(informationObj: Information){
    this.dialogRef.open(ShowInformationPopupComponent, {
      data: {
        objInfo: informationObj
      }
    })
  }
  addInformationDialog(){
    this.dialogRef.open(AddInformationPopupComponent, {
      data: {
        schoolIdRoute: this.schoolId
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
      this.refreshData()
    })
  }
}
