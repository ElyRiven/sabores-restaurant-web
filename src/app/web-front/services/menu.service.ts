import { Injectable } from '@angular/core';

import { Plate } from '@front/interfaces/plate.interface';

const menuArray: Plate[] = [
  {
    name: 'Bocado de la casa',
    description:
      'Filete sellado con especias, acompañado de papas asadas y brotes frescos',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry1.webp',
  },
  {
    name: 'Tesoro del mar',
    description:
      'Selección premium de mariscos frescos servidos en su punto perfecto',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry2.webp',
  },
  {
    name: 'Nido al pomodoro',
    description:
      'Pasta artesanal al dente con salsa de tomate confitado y albahaca fresca',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry3.webp',
  },
  {
    name: 'Rissoto de champiñones',
    description:
      'Rissoto cremoso con champiñones y un toque de queso parmesano',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry4.webp',
  },
  {
    name: 'Tofu salteado con sésamo y jengibre',
    description:
      'Tofu crujiente salteado con verduras en un sabroso glaseado de sésamo y jengibre, servido sobre arroz al vapor',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry5.webp',
  },
  {
    name: 'Paella de verduras',
    description:
      'Un vibrante plato de arroz español relleno de una mezcla de verduras de temporada',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry6.webp',
  },
  {
    name: 'Ensalada de aguacate y frijoles negros',
    description:
      'Una ensalada refrescante con aguacate cremoso, frijoles negros, maíz y una vinagreta de lima picante',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry7.webp',
  },
  {
    name: 'Salmón a la parrilla con salsa de limón',
    description:
      'Filete de salmón recién asado con una salsa picante de limón y hierbas, acompañado de espárragos asados',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry8.webp',
  },
  {
    name: 'Sopa de Lentejas con pan crujiente',
    description:
      'Suculenta sopa de lentejas cocinada a fuego lento con verduras aromáticas y especias, servida con pan crujiente',
    category: 'entry',
    image: 'assets/photos/menu/entries/entry9.webp',
  },
  {
    name: 'Pollo al Horno',
    description:
      'Delicioso pollo al horno con especias para un toque de sabor único',
    category: 'dish',
    image: 'assets/photos/menu/dishes/dish1.webp',
  },
  {
    name: 'Salmón a las parrilla',
    description: 'Filete de salmón a la parrilla con un toque de verduras',
    category: 'dish',
    image: 'assets/photos/menu/dishes/dish2.webp',
  },
  {
    name: 'Pollo con Mole',
    description:
      'Una presa de pollo horneado acompañado de una porción de mole',
    category: 'dish',
    image: 'assets/photos/menu/dishes/dish3.webp',
  },
  {
    name: 'Cheesecake de vainilla',
    description: 'Un postre fresco y delicioso con un toque de limón',
    category: 'dessert',
    image: 'assets/photos/menu/desserts/dessert1.webp',
  },
  {
    name: 'Brownie de chocolate',
    description: 'Delicioso brownie con relleno líquido de chocolate',
    category: 'dessert',
    image: 'assets/photos/menu/desserts/dessert2.webp',
  },
  {
    name: 'Cupcake de frutas',
    description: 'Un cupcake con relleno y sabor a frutas',
    category: 'dessert',
    image: 'assets/photos/menu/desserts/dessert3.webp',
  },
  {
    name: 'Vino blanco serenetta',
    description:
      'Refrescante y equilibrado, ideal para acompañar platos ligeros y entradas gourmet',
    category: 'drink',
    image: 'assets/photos/menu/drinks/drink1.webp',
  },
  {
    name: 'Champagne brut espumante',
    description:
      'Elegancia en cada burbuja. Perfecto para brindar o acompañar celebraciones especiales',
    category: 'drink',
    image: 'assets/photos/menu/drinks/drink2.webp',
  },
  {
    name: 'Vino tinto nuitte',
    description:
      'Un vino tinto intenso, con cuerpo y notas profundas de frutas maduras',
    category: 'drink',
    image: 'assets/photos/menu/drinks/drink3.webp',
  },
];

@Injectable({ providedIn: 'root' })
export class MenuService {
  getAllPlates(): Plate[] {
    return menuArray;
  }

  getPlatesByCategory(category: string): Plate[] {
    return menuArray.filter((plate) => plate.category === category);
  }
}
