import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(value: any) {
    if (value.length > 180) {
      return value.substr(0, 180) + '...';
    }

    return value;
  }
}
