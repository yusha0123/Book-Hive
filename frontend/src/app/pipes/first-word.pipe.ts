import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstWord',
})
export class FirstWordPipe implements PipeTransform {
  transform(value: string | undefined | null): string {
    if (!value) {
      return '';
    }
    const words = value.split(' ');
    return words[0];
  }
}
