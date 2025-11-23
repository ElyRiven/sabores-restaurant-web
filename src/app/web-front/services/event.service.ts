import { Injectable } from '@angular/core';
import { Event } from '@front/interfaces/event.interface';
import { AddressService } from './address.service';

const addressService = new AddressService();

const eventsArray: Event[] = [
  {
    title: 'Cata de Vinos',
    description:
      'Descubre el arte del vino en una cata guiada por expertos, donde cada copa se acompaña de maridajes gourmet. Una experiencia ideal para quienes buscan explorar sabores con sofisticación.',
    image: 'assets/photos/events/event1.webp',
    date: '03-20-2025',
    time: '',
    categories: ['coctel', 'degustación'],
    address: addressService.getAddressById(1),
  },
  {
    title: 'Noche de Sabores',
    description:
      'Celebra con nosotros y viaja con el paladar a través de una cena temática con platos emblemáticos de distintas culturas, preparados con técnica gourmet para celebrar nuestro aniversario anual.',
    image: 'assets/photos/events/event2.webp',
    date: '04-25-2025',
    time: '',
    categories: ['aniversario', 'gourmet', 'coctel'],
    address: addressService.getAddressById(2),
  },
  {
    title: 'Cena de Navidad',
    description:
      'Celebra la magia de la Navidad con una cena especial, donde sabores tradicionales se reinventan con un toque gourmet. Una velada perfecta para compartir en familia.',
    image: 'assets/photos/events/event3.webp',
    date: '12-25-2025',
    time: '',
    categories: ['gourmet', 'invitado'],
    address: addressService.getAddressById(3),
  },
  {
    title: 'Degustación del Chef',
    description:
      'Disfruta de un menú exclusivo de pasos diseñado por nuestro chef ejecutivo, que destaca lo mejor de la temporada con técnica y presentación impecables.',
    image: 'assets/photos/events/event4.webp',
    date: '07-12-2025',
    time: '',
    categories: ['degustación', 'gala', 'gourmet'],
    address: addressService.getAddressById(1),
  },
  {
    title: 'Tarde de Cócteles',
    description:
      'Relájate con cócteles y una selección de bebidas gourmet en una tarde ideal para compartir. Sabores intensos, combinaciones creativas y un ambiente distendido para disfrutar entre amigos.',
    image: 'assets/photos/events/event5.webp',
    date: '10-05-2025',
    time: '',
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
