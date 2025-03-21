import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpenClose } from 'src/app/models/open-close.model';
import { SingleClose } from 'src/app/models/single-close.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  private settingsUrl: string = 'http://localhost:7149/startDrive/stronaGlowna/ustawienia'
  private settingsSingleFreeUrl: string = this.settingsUrl+'/pojedynczeWolne'
  private settingsTimeBetweenRidesUrl: string = this.settingsUrl+'/czasMiedzyJazdami'

  getOpenClose(schoolId: number){
    return this.http.get<OpenClose[]>(this.settingsUrl+'/'+schoolId)
  }

  updateOpenClose(schoolId: number, openCloseObject: OpenClose[]){
    this.http.put<OpenClose[]>(this.settingsUrl+'/'+schoolId, openCloseObject).subscribe((response) => {
      location.reload()
    })
  }

  getSingleClose(schoolId: number){
    return this.http.get<SingleClose[]>(this.settingsSingleFreeUrl+'/'+schoolId)
  }

  addSingleClose(schoolId: number, singleCloseObject: SingleClose){
    this.http.post<SingleClose>(this.settingsSingleFreeUrl+'/'+schoolId, singleCloseObject).subscribe((response) => {
      location.reload()
    })
  }

  deleteSingleClose(schoolId: number, selectedDayId: number){
    this.http.delete(this.settingsSingleFreeUrl+'/'+schoolId+'/'+selectedDayId).subscribe(() => {
      console.log('Pojedyńczy dzień wolny został usunięty')
      location.reload()
    })
  }

  getBreakBetweenRides(schoolId: number){
    return this.http.get<number>(this.settingsTimeBetweenRidesUrl+'/'+schoolId)
  }

  updateBreakBetweenRiders(schoolId: number, breakBetweenRidesObject: number){
    this.http.put<number>(this.settingsTimeBetweenRidesUrl+'/'+schoolId, breakBetweenRidesObject).subscribe((response) => {
      location.reload()
    })
  }
}
