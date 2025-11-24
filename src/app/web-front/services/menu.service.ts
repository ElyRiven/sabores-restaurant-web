import { Injectable } from '@angular/core';

import type { Menu } from '@front/interfaces/plate.interface';

const menu: Menu = {
  entries: {
    image: '/assets/photos/front/entries-section.webp',
    dishes: [
      {
        name: 'Bocado de la casa',
        description:
          'Filete sellado con especias, acompañado de papas asadas y brotes frescos',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 40.99,
      },
      {
        name: 'Tesoro del mar',
        description:
          'Selección premium de mariscos frescos servidos en su punto perfecto',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 30.147,
      },
      {
        name: 'Nido al pomodoro',
        description:
          'Pasta artesanal al dente con salsa de tomate confitado y albahaca fresca',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 50.025,
      },
      {
        name: 'Rissoto de champiñones',
        description:
          'Rissoto cremoso con champiñones y un toque de queso parmesano',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 2.2,
      },
      {
        name: 'Tofu salteado con sésamo y jengibre',
        description:
          'Tofu crujiente salteado con verduras en un sabroso glaseado de sésamo y jengibre, servido sobre arroz al vapor',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 3.25898,
      },
      {
        name: 'Paella de verduras',
        description:
          'Un vibrante plato de arroz español relleno de una mezcla de verduras de temporada',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 4.8,
      },
      {
        name: 'Ensalada de aguacate y frijoles negros',
        description:
          'Una ensalada refrescante con aguacate cremoso, frijoles negros, maíz y una vinagreta de lima picante',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 53.251,
      },
      {
        name: 'Salmón a la parrilla con salsa de limón',
        description:
          'Filete de salmón recién asado con una salsa picante de limón y hierbas, acompañado de espárragos asados',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 9.64556,
      },
      {
        name: 'Sopa de Lentejas con pan crujiente',
        description:
          'Suculenta sopa de lentejas cocinada a fuego lento con verduras aromáticas y especias, servida con pan crujiente',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 43.2,
      },
    ],
  },
  dishes: {
    image: '/assets/photos/front/dishes-section.webp',
    dishes: [
      {
        name: 'Pollo al Horno',
        description:
          'Delicioso pollo al horno con especias para un toque de sabor único',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 10.0,
      },
      {
        name: 'Salmón a las parrilla',
        description: 'Filete de salmón a la parrilla con un toque de verduras',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 20.89556,
      },
      {
        name: 'Pollo con Mole',
        description:
          'Una presa de pollo horneado acompañado de una porción de mole',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 95.1,
      },
    ],
  },
  desserts: {
    image: '/assets/photos/front/desserts-section.webp',
    dishes: [
      {
        name: 'Cheesecake de vainilla',
        description: 'Un postre fresco y delicioso con un toque de limón',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 53.3,
      },
      {
        name: 'Brownie de chocolate',
        description: 'Delicioso brownie con relleno líquido de chocolate',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 90.526,
      },
      {
        name: 'Cupcake de frutas',
        description: 'Un cupcake con relleno y sabor a frutas',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 45.8,
      },
    ],
  },
  drinks: {
    image: '/assets/photos/front/drinks-section.webp',
    dishes: [
      {
        name: 'Vino blanco serenetta',
        description:
          'Refrescante y equilibrado, ideal para acompañar platos ligeros y entradas gourmet',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 10.85,
      },
      {
        name: 'Champagne brut espumante',
        description:
          'Elegancia en cada burbuja. Perfecto para brindar o acompañar celebraciones especiales',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 9.6558,
      },
      {
        name: 'Vino tinto nuitte',
        description:
          'Un vino tinto intenso, con cuerpo y notas profundas de frutas maduras',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 62.15,
      },
    ],
  },
};

@Injectable({ providedIn: 'root' })
export class MenuService {
  getMenu(): Menu {
    return menu;
  }
}
