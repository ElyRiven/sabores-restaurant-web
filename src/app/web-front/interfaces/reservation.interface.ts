import { FormControl } from '@angular/forms';

import { Address } from './address.interface';

export type SeatNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PaymentType = 'cash' | 'card' | 'transfer';

export enum FormStage {
  firstStage = 1,
  secondStage = 2,
  thirdStage = 3,
  fourthStage = 4,
  fifthStage = 5,
  sixthStage = 6,
}

export interface Customer {
  name: string;
  mail: string;
  phone: string;
}

export interface ReservationForm {
  event: FormControl<string | null>;
  date: FormControl<string | null>;
  time: FormControl<string | null>;
  numberOfGuests: FormControl<SeatNumbers | null>;
  address: FormControl<Address | null>;
  price: FormControl<number | null>;
  customer: FormControl<Customer | null>;
  paymentType: FormControl<PaymentType | null>;
  comments: FormControl<string | null>;
}
