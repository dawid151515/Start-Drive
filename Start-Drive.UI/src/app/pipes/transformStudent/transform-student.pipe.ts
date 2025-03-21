import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/models/student.model';

@Pipe({
  name: 'transformStudent'
})
export class TransformStudentPipe implements PipeTransform {

  transform(value: Student, ...args: Student[]): string {
    var student = value
    if(student.id == -1){
      return ''
    } else{
      var stringToReturn = student.email+', '+student.name+' '+student.lastName
      return stringToReturn
    }
  }

}
