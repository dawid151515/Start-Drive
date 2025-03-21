import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Information } from 'src/app/models/information.model';

@Injectable({
  providedIn: 'root'
})
export class InformationService {

  constructor(private http: HttpClient) { }

  private informationUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/informacje'


  getInfromation(schoolId: number){
    return this.http.get<Information[]>(this.informationUrl+'/'+schoolId)
  }

  addInformation(schoolId: number, informationObject: Information){
    this.http.post(this.informationUrl+'/'+schoolId, informationObject).subscribe((response) => {
      location.reload()
    })
  }

  deleteInformation(schoolId: number, informationObjectId: number){
    this.http.delete(this.informationUrl+'/'+schoolId+'/'+informationObjectId)
     .subscribe(() => {
       console.log('Informacja została usunięta')
       location.reload()
     })
  }
}
