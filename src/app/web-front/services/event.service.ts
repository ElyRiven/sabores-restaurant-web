import { Injectable } from '@angular/core';
import { Category, Event } from '@front/interfaces/event.interface';

const eventsArray: Event[] = [
  {
    title: 'Cata de Vinos',
    description:
      'Descubre el arte del vino en una cata guiada por expertos, donde cada copa se acompaña de maridajes gourmet. Una experiencia ideal para quienes buscan explorar sabores con sofisticación.',
    image: 'assets/photos/events/event1.webp',
    date: '03-20',
    category: 'bebida',
  },
  {
    title: 'Noche de Sabores',
    description:
      'Viaja con el paladar a través de una cena temática con platos emblemáticos de distintas culturas, preparados con técnica gourmet. Ideal para amantes de la gastronomía internacional.',
    image: 'assets/photos/events/event2.webp',
    date: '04-25',
    category: 'comida',
  },
  {
    title: 'Cena de Navidad',
    description:
      'Celebra la magia de la Navidad con una cena especial, donde sabores tradicionales se reinventan con un toque gourmet. Una velada perfecta para compartir en familia.',
    image: 'assets/photos/events/event3.webp',
    date: '12-25',
    category: 'comida',
  },
  {
    title: 'Degustación del Chef',
    description:
      'Disfruta de un menú exclusivo de pasos diseñado por nuestro chef ejecutivo, que destaca lo mejor de la temporada con técnica y presentación impecables.',
    image: 'assets/photos/events/event4.webp',
    date: '07-12',
    category: 'comida',
  },
  {
    title: 'Tarde de Cócteles',
    description:
      'Relájate con cócteles y una selección de bebidas gourmet en una tarde ideal para compartir. Sabores intensos, combinaciones creativas y un ambiente distendido para disfrutar entre amigos.',
    image: 'assets/photos/events/event5.webp',
    date: '10-05',
    category: 'bebida',
  },
];

@Injectable({ providedIn: 'root' })
export class EventService {
  getAllEvents(): Event[] {
    return [...eventsArray];
  }

  getEventsByCategory(category: Category) {
    return [...eventsArray.filter((event) => event.category === category)];
  }
}
