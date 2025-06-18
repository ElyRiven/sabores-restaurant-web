import { Pipe, PipeTransform } from '@angular/core';
import { ReserveSeatNumbers } from '@front/interfaces/reservation.interface';

@Pipe({
  name: 'seatNumbers',
})
export class SeatNumbersPipe implements PipeTransform {
  transform(value: ReserveSeatNumbers): string {
    if (value === 1) return `${value} persona`;
    return `${value} personas`;
  }
}
