import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformInformation'
})
export class TransformInformationPipe implements PipeTransform {

  transform(value: string): string {

    if(value == 'students'){
      return 'kursantów'
    }else if(value == 'instructors'){
      return 'instruktorów'
    }else if(value == 'general'){
      return 'wszystkich'
    }else{
      return ''
    }
  }

}
