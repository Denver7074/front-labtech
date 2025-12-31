import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(dateString: string | undefined): string {
    if (!dateString) return '';

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU');
    } catch {
      return dateString;
    }
  }

}
