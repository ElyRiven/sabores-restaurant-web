import { Injectable } from '@angular/core';

import type { Chef } from '@front/interfaces/chef.interface';

const chefsArray: Chef[] = [
  {
    name: 'Isabel Rossi',
    role: 'Chef Ejecutiva',
    quote: 'Disfruto combinar técnica y creatividad en cada plato que creo',
    image: '/assets/photos/chefs/chef1.webp',
  },
  {
    name: 'Michael Gómez',
    role: 'Sous Chef',
    quote: 'Me apasiona reinventar sabores clásicos y darles un toque moderno',
    image: '/assets/photos/chefs/chef2.webp',
  },
  {
    name: 'Kenji Tanaka',
    role: 'Chef de Estación',
    quote:
      'Me especializo en cocinar platos con énfasis en ingredientes locales',
    image: '/assets/photos/chefs/chef3.webp',
  },
];

@Injectable({ providedIn: 'root' })
export class ChefService {
  getChefs(): Chef[] {
    return [...chefsArray];
  }
}
