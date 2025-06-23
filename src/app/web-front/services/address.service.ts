import { Injectable } from '@angular/core';
import { Address } from '@front/interfaces/address.interface';

const addressArray: Address[] = [
  {
    id: 1,
    latitude: -0.18547102137356256,
    longitude: -78.48472728337971,
  },
  {
    id: 2,
    latitude: -2.158863039604382,
    longitude: -79.8996753022897,
  },
  {
    id: 3,
    latitude: -2.8972528788523166,
    longitude: -79.00486337982943,
  },
];

@Injectable({ providedIn: 'root' })
export class AddressService {
  getAllAddress(): Address[] {
    return [...addressArray];
  }

  getAddressById(id: number): Address {
    return addressArray.find((address) => address.id === id) ?? addressArray[0];
  }
}
