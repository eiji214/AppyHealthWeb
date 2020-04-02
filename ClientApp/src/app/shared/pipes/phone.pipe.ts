import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'phone'})
export class PhonePipe implements PipeTransform {
  transform(value: string): any {

    if (!value) { return value; }

    value = value.replace(/-/g, '');

    const areaCode = value.slice(0, 3);
    const phonePart1 = value.slice(3, 6);
    const phonePart2 = value.slice(6, 10);


    return '(' + areaCode + ')' + ' ' + phonePart1 + '-' + phonePart2;
  }
}

