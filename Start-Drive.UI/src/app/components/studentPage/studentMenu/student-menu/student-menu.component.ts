import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/models/student.model';
import { StudentService } from 'src/app/service/student-service/student.service';

@Component({
  selector: 'app-student-menu',
  templateUrl: './student-menu.component.html',
  styleUrls: ['./student-menu.component.css']
})
export class StudentMenuComponent {

  constructor(private aRoute: ActivatedRoute, private studentService: StudentService){}

  ngOnInit(): void{
    this.getMenuDataRoute()
    this.setStyleActive()
  }

  logInStudent: Student = {
    name: "",
    lastName: "",
    dateOfBirth: new Date("2000-01-01"),
    placeOfBirth: "",
    address: "",
    phoneNumber: '',
    email: ""
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
  studentId: number = -30
  getMenuDataRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))
    this.studentId = Number(this.aRoute.snapshot.paramMap.get('studentId'))

    this.studentService.getStudent(this.schoolId, this.studentId).subscribe((response) => {
      this.logInStudent = response
    })
  }
}
