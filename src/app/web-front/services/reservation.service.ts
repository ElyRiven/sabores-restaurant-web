import { Injectable } from '@angular/core';
import { Reservation } from '@front/interfaces/reservation.interface';

const reservationsArray: Reservation[] = [];

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  public postReservation(newReservation: Reservation): boolean {
    reservationsArray.push(newReservation);

    console.log({ reservationsArray });

    return true;
  }
}
