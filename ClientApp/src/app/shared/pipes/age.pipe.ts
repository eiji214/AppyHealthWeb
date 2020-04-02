import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'age'})
export class AgePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) { return value; }

    function calculateAge(dob: Date) { // birthday is a date
      const ageDifMs = Date.now() - dob.getTime();
      const ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function monthDiff(d1: Date, d2: Date) {
      if (d1 < d2) {
        const months = d2.getMonth() - d1.getMonth();
        return months <= 0 ? 0 : months;
      }
      return 0;
    }

    function getDateFromString(str) {
      const parts = str.split('-');
      parts[2] = parts[2].substr(0, 2);
      // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
      // January - 0, February - 1, etc.
      const mydate = new Date(parts[0], parts[1] - 1, parts[2]);
      return mydate;
    }

    const birthday = getDateFromString(value);

    const age = calculateAge(birthday);
    if (age === 0) {
      return monthDiff(birthday, new Date()) + ' months';
    }
    return age;
  }
}

