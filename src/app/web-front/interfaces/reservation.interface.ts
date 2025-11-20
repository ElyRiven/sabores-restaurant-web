import { FormControl } from '@angular/forms';

import { Address } from './address.interface';

export type SeatNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type PaymentType = 'cash' | 'card' | 'transfer';

export interface Customer {
  name: string;
  mail: string;
  phone: string;
  comments?: string;
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
}
