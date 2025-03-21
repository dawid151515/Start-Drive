import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformLengthDisplayedText'
})
export class TransformLengthDisplayedTextPipe implements PipeTransform {

  //displays the number of text letters specified in the arguments and changes the first letter of the text to uppercase
  transform(value: string, arg: number): string {

    var text = value
    if (text.length > arg) {
      text = text.substring(0, arg);
      text+=' ...'
     }
     return text;

  }

}
