import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortText'
})
export class ShortTextPipe implements PipeTransform {

  transform(value: string): unknown {
    if(value.length<=30){
      return value;
    }
    return value.substring(0,30)+"...";
  }

}
