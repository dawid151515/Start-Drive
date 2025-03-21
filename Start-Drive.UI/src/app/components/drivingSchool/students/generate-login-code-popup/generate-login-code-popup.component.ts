import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneratedRegistrationCode } from 'src/app/models/generated-registration-code.model';
import { Student } from 'src/app/models/student.model';
import { GenerateCodeService } from 'src/app/service/generate-code-service/generate-code.service';

@Component({
  selector: 'app-generate-login-code-popup',
  templateUrl: './generate-login-code-popup.component.html',
  styleUrls: ['./generate-login-code-popup.component.css']
})
export class GenerateLoginCodePopupComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private generateCodeService: GenerateCodeService){}

  schoolId: number = this.data.schoolIdRoute
  selectedStudentData: Student = this.data.selectStudent
  scrollPosition: number = this.data.scrollPosition

  generateString: string = ''
  randomString() {

    var length = 15
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    var result = '';
    for ( var i = 0; i < length; i++ ) {

      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }

    result += this.selectedStudentData.email

    var currentDate = new Date()
    var currentDateJSON = currentDate.toJSON().toString()

    result += currentDateJSON

    this.generateString = result
  }

  isDisabled(): boolean{
    if(this.generateString == '' || this.selectedStudentData.email == ''){
      return true
    }else{
      return false
    }
  }

  //------------------------------------------------------Router logic------------------------------------------------------

  addGeneratedCodeRoute(){
    this.savedDataAfterRefreshing()

    let generatedCodeObject: GeneratedRegistrationCode = {

      drivingSchoolId: this.schoolId,
      personType: 'student',
      personId: this.selectedStudentData.id || -1,
      personEmail: this.selectedStudentData.email,
      generatedCode: this.generateString
    }

    this.generateCodeService.addGeneratedCode(this.schoolId, generatedCodeObject)
  }

  savedDataAfterRefreshing(){

    localStorage.setItem('scrollPositionStudent', `${this.scrollPosition}`)
    localStorage.setItem('studentId', `${this.selectedStudentData.id}`)
  }
}
