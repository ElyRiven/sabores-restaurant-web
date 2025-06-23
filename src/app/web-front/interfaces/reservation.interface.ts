export type ReserveSeatNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface Reservation {
  name: string;
  mail: string;
  reservationDateTime: string;
  phone: string;
  numberOfPersons: ReserveSeatNumbers;
  comments?: string;
}
