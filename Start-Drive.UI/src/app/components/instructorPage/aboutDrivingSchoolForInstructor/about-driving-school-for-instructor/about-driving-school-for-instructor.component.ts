import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADrivingSchool } from 'src/app/models/about-driving-school.model';
import { AboutDrivingSchoolService } from 'src/app/service/about-driving-school-service/about-driving-school.service';

@Component({
  selector: 'app-about-driving-school-for-instructor',
  templateUrl: './about-driving-school-for-instructor.component.html',
  styleUrls: ['./about-driving-school-for-instructor.component.css']
})
export class AboutDrivingSchoolForInstructorComponent {

  ngOnInit(): void{
    this.getAboutDrivingSchoolRoute()
  }

  constructor(private aRoute: ActivatedRoute, private aboutDrivingSchoolService: AboutDrivingSchoolService){}

  pageName: string= 'O szkole jazdy'

  drivingSchoolInfo: ADrivingSchool = {
    aboutText: ''
  }

  stringToHtml(str: string){
    return str.replace('\n', '<br>')
  }


  //------------------------------------------------------Router logic------------------------------------------------------

  schoolId: number = -30
  getAboutDrivingSchoolRoute(){
   this.schoolId = Number(this.aRoute.snapshot.paramMap.get('schoolId'))

   this.aboutDrivingSchoolService.getAboutDrivingSchool(this.schoolId).subscribe((response) => {
      this.drivingSchoolInfo = response
    })
  }
}
