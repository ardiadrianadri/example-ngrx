import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngrxpipe'
})

export class DatePipe implements PipeTransform {
  transform(value: any, format: string): string {

    const regularExpDay = /##dd##/g;
    const regularExpMonth = /##mm##/g;
    const regularExpYear = /##yyyy##/g;
    const regularExpHour = /##HH##/g;
    const regularExpMin = /##MM##/g;
    const regularExpSec = /##SS##/g;
    let result = value;

    if (value instanceof Date) {
      result = format.replace(regularExpDay, value.getDate().toString());
      result = result.replace(regularExpMonth, (value.getMonth() + 1).toString());
      result = result.replace(regularExpYear, value.getFullYear().toString());
      result = result.replace(regularExpHour, value.getHours().toString());
      result = result.replace(regularExpMin, value.getMinutes().toString());
      result = result.replace(regularExpSec, value.getSeconds().toString());
    }

    return result;
  }
}
