import { Injectable } from '@angular/core';
import { Address } from '@front/interfaces/address.interface';

const addressArray: Address[] = [
  {
    id: 1,
    latitude: 1,
    longitude: 1,
  },
  {
    id: 2,
    latitude: 1,
    longitude: 1,
  },
  {
    id: 3,
    latitude: 1,
    longitude: 1,
  },
];

@Injectable({ providedIn: 'root' })
export class AddressService {
  getAddressById(id: number): Address {
    return addressArray.find((address) => address.id === id) ?? addressArray[0];
  }
}
