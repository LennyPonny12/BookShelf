import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: any, lenght: number) {
    if (value.length > lenght) {
      return value.substr(0, lenght) + '...';
    }

    return value;
  }
}
