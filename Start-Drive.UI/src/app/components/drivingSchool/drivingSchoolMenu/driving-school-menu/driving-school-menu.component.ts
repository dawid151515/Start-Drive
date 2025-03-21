import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterSchool } from 'src/app/models/register-school.model';
import { RegisterLoginService } from 'src/app/service/register-login-service/register-login.service';

@Component({
  selector: 'app-driving-school-menu',
  templateUrl: './driving-school-menu.component.html',
  styleUrls: ['./driving-school-menu.component.css']
})
export class DrivingSchoolMenuComponent {
  constructor(private aRoute: ActivatedRoute, private router: Router, private registerLoginService: RegisterLoginService){}

  ngOnInit(): void{
    this.getMenuDataRoute()
    this.setStyleActive()
  }

  schoolUser: RegisterSchool = {
    name: 'brak',
    address: 'brak',
    city: 'brak',
    phoneNumber: 'brak',

    email: 'brak',
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

  logOut(){
    localStorage.clear()
    this.router.navigate(['startDrive/logowanie'])
  }

  // ----------------------------------------------------router logic--------------------------------------------------

  schoolId: number = -30
  getMenuDataRoute(){
    this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

    this.registerLoginService.getRegisterSchoolData(this.schoolId).subscribe((response) => {
      this.schoolUser = response
    })
  }
}
