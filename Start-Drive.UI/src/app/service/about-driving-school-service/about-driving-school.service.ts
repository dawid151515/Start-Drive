import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADrivingSchool } from 'src/app/models/about-driving-school.model';

@Injectable({
  providedIn: 'root'
})
export class AboutDrivingSchoolService {

  constructor(private http: HttpClient) { }

  private aboutDrivingSchoolUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/oSzkoleJazdy'


  getAboutDrivingSchool(schoolId: number){
    return this.http.get<ADrivingSchool>(this.aboutDrivingSchoolUrl+'/'+schoolId)
  }

  updateADrivingSchool(schoolId: number, aDrivingSchoolId: number, aDrivingSchoolObject: ADrivingSchool){
    this.http.put<ADrivingSchool>(this.aboutDrivingSchoolUrl+'/'+schoolId+'/'+aDrivingSchoolId, aDrivingSchoolObject).subscribe((response) => {
      location.reload()
    })
  }
}
