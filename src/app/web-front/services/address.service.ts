import { Injectable } from '@angular/core';
import { Address } from '@front/interfaces/address.interface';

const addressArray: Address[] = [
  {
    id: 1,
    name: 'Sabores Norte',
    streets: 'Av. Sol Naciente 1457, Barrio El Encino',
    latitude: -0.17694597703713247,
    longitude: -78.48579314094667,
  },
  {
    id: 2,
    name: 'Sabores Centro',
    streets: 'Av. Del Olivo 309, Sector Monte Claro',
    latitude: -2.121217737095276,
    longitude: -79.89386292786222,
  },
  {
    id: 3,
    name: 'Sabores Sur',
    streets: 'Av. Horizonte Azul 880, Zona Mirador Norte',
    latitude: -2.8975632632878106,
    longitude: -79.02249545166758,
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
