import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformFreeHours'
})
export class TransformFreeHoursPipe implements PipeTransform {

  transform(value: number, arg: number): string {

    var hour = `${value}`
    if(hour.split('').length <= 2){
      hour+='.00'
    }
    if(hour.split('.')[0].split('').length == 1){
      hour ='0'+hour
    }
    if(hour.split('.')[1].split('').length == 1){
      hour+='0'
    }
    hour = hour.replace(".", ":")

    var freeHoursString = ''
    var count = arg

    freeHoursString+=hour

    if(count % 2 == 0){
      freeHoursString+=' -'
    }else{
      freeHoursString+=','
    }

    return freeHoursString;
  }

}
