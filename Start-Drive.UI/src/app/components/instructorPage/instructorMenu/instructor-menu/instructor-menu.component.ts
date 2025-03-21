import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instructor } from 'src/app/models/instructorModel/instructor.model';
import { InstructorService } from 'src/app/service/instructor-service/instructor.service';

@Component({
  selector: 'app-instructor-menu',
  templateUrl: './instructor-menu.component.html',
  styleUrls: ['./instructor-menu.component.css']
})
export class InstructorMenuComponent {

  constructor(private aRoute: ActivatedRoute, private instructorService: InstructorService){}

  ngOnInit(): void{
    this.getMenuDataRoute()
    this.setStyleActive()
  }

  logInInstructor: Instructor = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: "instruktor",
    instructorDaysOff: []
  }

  @Input()
  pageNameParent: string = ''

  setStyleActive(){
    var selectorA = document.querySelectorAll('.topnav .mainMenu a')

    for(var i=0; i<selectorA.length; i++){
      if(this.pageNameParent == selectorA[i].firstChild?.textContent){
        selectorA[i].classList.add('active')
      }else{
        selectorA[i].classList.remove('active')
      }

    }
  }


  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  instructorId: number = -20
  getMenuDataRoute(){

    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.instructorId = Number(this.aRoute.snapshot.paramMap.get('instructorId'))

    this.instructorService.getInstructor(this.schoolId, this.instructorId).subscribe((response) => {
      this.logInInstructor = response
    })
  }
}
