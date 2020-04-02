import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
  })

  export class FilterPipe implements PipeTransform {
    transform(items: any, filter: any): any {
      if (filter && Array.isArray(items)) {
        const filterKeys = Object.keys(filter);
        const results = items.filter(item =>
          filterKeys.reduce((memo, keyName) =>
            (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === '', true));

        if (results.length === 0) {
          return [-1];
        } else {
          return results;
        }
      } else {
        return items;
      }
    }
  }
