import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformDate'
})
export class TransformDatePipe implements PipeTransform {

  transform(value: string): string {
    var splitValue = value.split('-')
    var returnValue = ''+splitValue[0]

    if(splitValue[1].split('').length == 1){
      returnValue += '-0'+splitValue[1]
    }else{
      returnValue += '-'+splitValue[1]
    }

    if(splitValue[2].split('').length == 1){
      returnValue += '-0'+splitValue[2]
    }else{
      returnValue += '-'+splitValue[2]
    }

    return returnValue;
  }

}
