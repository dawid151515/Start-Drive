import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformHour'
})
export class TransformHourPipe implements PipeTransform {

  transform(value: number, ...args: number[]): string {
    var convert = value.toString()

    if(convert.split('').length <= 2){
      convert+='.00'
    }
    if(convert.split('.')[1].split('').length == 1){
      convert+='0'
    }

    var valueTransform = convert.replace('.', ':')

    return valueTransform;
  }

}
