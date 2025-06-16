import { Injectable } from '@angular/core';

import { Plate } from '@front/interfaces/plate.interface';

const menuArray: Plate[] = [
  {
    name: 'bocado de la casa',
    description:
      'filete sellado con especias, acompañado de papas asadas y brotes frescos',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry1.webp',
  },
  {
    name: 'tesoro del mar',
    description:
      'selección premium de mariscos frescos servidos en su punto perfecto',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry2.webp',
  },
  {
    name: 'nido al pomodoro',
    description:
      'pasta artesanal al dente con salsa de tomate confitado y albahaca fresca',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry3.webp',
  },
  {
    name: 'rissoto de champiñones',
    description:
      'rissoto cremoso con champiñones y un toque de queso parmesano',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry4.webp',
  },
  {
    name: 'tofu salteado con sésamo y jengibre',
    description:
      'tofu crujiente salteado con verduras en un sabroso glaseado de sésamo y jengibre, servido sobre arroz al vapor',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry5.webp',
  },
  {
    name: 'paella de verduras',
    description:
      'un vibrante plato de arroz español relleno de una mezcla de verduras de temporada',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry6.webp',
  },
  {
    name: 'ensalada de aguacate y frijoles negros',
    description:
      'una ensalada refrescante con aguacate cremoso, frijoles negros, maíz y una vinagreta de lima picante',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry7.webp',
  },
  {
    name: 'salmón a la parrilla con salsa de limón',
    description:
      'Filete de salmón recién asado con una salsa picante de limón y hierbas, acompañado de espárragos asados',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry8.webp',
  },
  {
    name: 'sopa de Lentejas con pan crujiente',
    description:
      'Suculenta sopa de lentejas cocinada a fuego lento con verduras aromáticas y especias, servida con pan crujiente',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry9.webp',
  },
];

@Injectable({ providedIn: 'root' })
export class MenuService {
  getAllPlates(): Plate[] {
    return menuArray;
  }

  getEntries(): Plate[] {
    return menuArray.filter((plate) => plate.category === 'entry');
  }
}
