import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTypeOfAbsence'
})
export class TransformTypeOfAbsencePipe implements PipeTransform {

  transform(value: string, arg: number): string {
    var absence = value.split(' ')

    var returnValue = ''
    if(arg == 1){

      if(absence[0].toLocaleLowerCase() == 'urlop'){
        returnValue = 'Urlop'
      }else if(absence[0].toLocaleLowerCase() == 'chorobowe'){
        returnValue = 'Chorobowe'
      }else{
        returnValue = 'Nieobecność'
      }

    }else{

      if(absence.length > 1){

        var reasonText = ''
        for(var i=1; i<absence.length; i++){
          if(i == absence.length-1){
            reasonText += absence[i]
          }else{
            reasonText += absence[i]+' '
          }
        }

        var reasonForAbsence = reasonText.split('')

        if(reasonForAbsence.length<=31){
          returnValue = reasonText.toLocaleLowerCase()

        }else{
          for(var i=0; i<31; i++){
            returnValue += reasonForAbsence[i].toLocaleLowerCase()
          }
          returnValue += '...'
        }
      }else{

        var splitAbsence = absence[0].split('')
        if(splitAbsence.length <= 31){
          returnValue = absence[0]
        }else{
          for(var i=0; i<31; i++){
            returnValue += splitAbsence[i].toLocaleLowerCase()
          }
          returnValue += '...'
        }

      }
    }

    return returnValue;
  }

}
