import { Injectable } from '@angular/core';

import type { Event } from '@front/interfaces/event.interface';
import { AddressService } from './address.service';

const addressService = new AddressService();

const eventsArray: Event[] = [
  {
    title: 'Cata de Vinos',
    description:
      'Descubre el arte del vino en una cata guiada por expertos, donde cada copa se acompaña de maridajes gourmet. Una experiencia ideal para quienes buscan explorar sabores con sofisticación.',
    image: 'assets/photos/events/wine-taste-event.webp',
    date: '2025-03-20',
    time: '4:30 PM',
    categories: ['coctel', 'degustación'],
    address: addressService.getAddressById(1),
  },
  {
    title: 'Noche de Sabores',
    description:
      'Celebra con nosotros y viaja con el paladar a través de una cena temática con platos emblemáticos de distintas culturas, preparados con técnica gourmet para celebrar nuestro aniversario anual.',
    image: 'assets/photos/events/noche-sabores.webp',
    date: '2025-04-25',
    time: '8:00 PM',
    categories: ['aniversario', 'gourmet', 'coctel'],
    address: addressService.getAddressById(2),
  },
  {
    title: 'Cena de Navidad',
    description:
      'Celebra la magia de la Navidad con una cena especial, donde sabores tradicionales se reinventan con un toque gourmet. Una velada perfecta para compartir en familia.',
    image: 'assets/photos/events/christmas-dinner.webp',
    date: '2025-12-25',
    time: '7:30 PM',
    categories: ['gourmet', 'invitado'],
    address: addressService.getAddressById(3),
  },
  {
    title: 'Degustación del Chef',
    description:
      'Disfruta de un menú exclusivo de platos diseñado por nuestro chef ejecutivo, que destaca lo mejor de la temporada con técnica y presentación impecables.',
    image: 'assets/photos/events/chef-degustation.webp',
    date: '2025-07-12',
    time: '1:30 PM',
    categories: ['degustación', 'gala', 'gourmet'],
    address: addressService.getAddressById(1),
  },
  {
    title: 'Tarde de Cócteles',
    description:
      'Relájate con cócteles y una selección de bebidas gourmet en una tarde ideal para compartir. Sabores intensos, combinaciones creativas y un ambiente distendido para disfrutar entre amigos.',
    image: 'assets/photos/events/coctail-afternoon.webp',
    date: '2025-10-05',
    time: '5:00 PM',
    categories: ['coctel', 'degustación'],
    address: addressService.getAddressById(3),
  },
];

@Injectable({ providedIn: 'root' })
export class EventService {
  getAllEvents(): Event[] {
    return [...eventsArray];
  }
}
