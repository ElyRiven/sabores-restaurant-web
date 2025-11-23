import { Address } from './address.interface';

export type CategoryValues =
  | 'degustación'
  | 'gourmet'
  | 'aniversario'
  | 'gala'
  | 'invitado'
  | 'coctel';

export interface Event {
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  categories: CategoryValues[];
  address: Address;
}
