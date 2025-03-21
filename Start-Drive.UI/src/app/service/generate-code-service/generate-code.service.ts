import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneratedRegistrationCode } from 'src/app/models/generated-registration-code.model';

@Injectable({
  providedIn: 'root'
})
export class GenerateCodeService {

  constructor(private http: HttpClient) { }

  private generateCodeUrl: string = 'http://localhost:7149/startDrive/generujKod'

  addGeneratedCode(schoolId: number, generatedCodeObject: GeneratedRegistrationCode){
    this.http.post(this.generateCodeUrl+'/'+schoolId, generatedCodeObject).subscribe((response) => {
      location.reload()
    })
  }
}
