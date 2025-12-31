import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snils',
  standalone: true
})
export class SnilsPipe implements PipeTransform {

  transform(value: string | undefined): string {
    if (!value) return '';

    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) return value;

    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)} ${digits.slice(9)}`;
  }

}
