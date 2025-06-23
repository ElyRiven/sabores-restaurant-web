import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'eventDate',
})
export class EventDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const [month, day] = value.split('-');

    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const monthIndex = parseInt(month, 10) - 1;

    if (monthIndex < 0 || monthIndex > 11) return value;

    return `${months[monthIndex]} ${parseInt(day, 10)}`;
  }
}
