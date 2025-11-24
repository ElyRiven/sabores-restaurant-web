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
        image: 'assets/photos/menu/entries/bocado.webp',
        price: 9.99,
      },
      {
        name: 'Tesoro del mar',
        description:
          'Selección premium de mariscos frescos servidos en su punto perfecto',
        image: 'assets/photos/menu/entries/sea-treasure.webp',
        price: 12.5,
      },
      {
        name: 'Nido al pomodoro',
        description:
          'Pasta artesanal al dente con salsa de tomate confitado y albahaca fresca',
        image: 'assets/photos/menu/entries/pomodoro-nest.webp',
        price: 8,
      },
      {
        name: 'Rissoto de champiñones',
        description:
          'Rissoto cremoso con champiñones y un toque de queso parmesano',
        image: 'assets/photos/menu/entries/rissoto-mushrooms.webp',
        price: 8,
      },
      {
        name: 'Paella de verduras',
        description:
          'Un vibrante plato de arroz español relleno de una mezcla de verduras de temporada',
        image: 'assets/photos/menu/entries/vegetable-paella.webp',
        price: 9.99,
      },
      {
        name: 'Ensalada de aguacate y frijoles negros',
        description:
          'Una ensalada refrescante con aguacate cremoso, frijoles negros, maíz y una vinagreta de lima picante',
        image: 'assets/photos/menu/entries/avocado-salad.webp',
        price: 8,
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
        image: 'assets/photos/menu/dishes/rice-chicken.webp',
        price: 15.99,
      },
      {
        name: 'Salmón a la parrilla',
        description:
          'Filete de salmón a la parrilla con arroz, verduras y salsa especial de la casa',
        image: 'assets/photos/menu/dishes/grilled-salmon.webp',
        price: 25,
      },
      {
        name: 'Pollo con Mole',
        description:
          'Una presa de pollo horneado acompañado de una porción de mole',
        image: 'assets/photos/menu/dishes/potato-chicken.webp',
        price: 15.99,
      },
      {
        name: 'Solomillo de Cerdo Glaseado',
        description:
          'Solomillo de cerdo cocido a baja temperatura y glaseado con salsa de naranja y miel. Acompañado de un cremoso puré de patatas y brócoli asado',
        image: 'assets/photos/menu/dishes/pig-solomillo.webp',
        price: 19.99,
      },
      {
        name: 'Tournedó Rossini',
        description:
          'Filete de lomo de res envuelto en tocineta, cubierto con una lasca de foie gras a la plancha. Bañado con salsa de trufa negra y servido con patatas gratinadas',
        image: 'assets/photos/menu/dishes/tournedo-rossini.webp',
        price: 23,
      },
      {
        name: 'Brochetas de Langostino',
        description:
          'Brochetas de langostinos gigantes marinados y salteados, acompañados de verduras orientales, aderezado con salsa de la casa',
        image: 'assets/photos/menu/dishes/prawn-skewers.webp',
        price: 25.5,
      },
      {
        name: 'Ossobuco al jugo',
        description:
          'Ossobuco de ternera cocido lentamente hasta la ternura, bañado en su jugo y un toque de ralladura de limón. Servido sobre un lecho de cremoso risotto al azafrán',
        image: 'assets/photos/menu/dishes/ossobuco.webp',
        price: 20.99,
      },
      {
        name: 'Lasaña de Osobuco',
        description:
          'Capas de pasta fresca de lasaña rellenas de un rico osobuco de ternera cocido a fuego lento, con una cremosa salsa bechamel de trufa y queso parmesano',
        image: 'assets/photos/menu/dishes/ossobuco-lasagna.webp',
        price: 22.5,
      },
      {
        name: 'Rigatoni Bistecca',
        description:
          'Rigatoni cocido al dente, mezclado con tiras de bistec de solomillo de res y una rica salsa cremosa de champiñones',
        image: 'assets/photos/menu/dishes/rigatoni-bistecca.webp',
        price: 19.99,
      },
      {
        name: 'Spaghetti con Ragú de Pato',
        description:
          'Spaghetti servido con un ragú de pato desmenuzado y cocido a fuego lento, con salsa de tomate y un toque de oregano. Finalizado con queso rallado',
        image: 'assets/photos/menu/dishes/spaghetti.webp',
        price: 22.5,
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
      {
        name: 'Esfera dulce',
        description:
          'Postre en forma de esfera, compuesto por un bizcocho de avellana, un corazón líquido de caramelo y una cobertura de glaze de chocolate con leche',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 53.3,
      },
      {
        name: 'Volcán esmeralda',
        description:
          'Base crujiente de galleta de almendra, rellena de una crema de lima dulce. Terminada con merengue ligeramente tostado y ralladura de chocolate',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 90.526,
      },
      {
        name: 'Milhojas de Vainilla',

        description:
          'Hojaldre caramelizado y crujiente en capas, crema pastelera de vainilla negra. Acompañado de frambuesas y moras',
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
        description: 'Refrescante y equilibrado vino blanco',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 10.85,
      },
      {
        name: 'Diamante Negro',
        description: 'Cóctel de vodka y licor de café con un toque ahumado',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 9.6558,
      },
      {
        name: 'Vino tinto nuitte',
        description:
          'Vino tinto intenso, con cuerpo y notas profundas de frutas maduras',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 62.15,
      },
      {
        name: 'Oro Tostado',
        description:
          'Ron oscuro, jarabe de caramelo y un toque de crema de coco',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 10.85,
      },
      {
        name: 'Naranja Fizz',
        description: 'Suave mezcla de jugo de naranja con agua mineral',
        image: 'assets/photos/menu/entries/placeholder-dish.webp',
        price: 9.6558,
      },
      {
        name: 'Mora Carmesí',
        description: 'Vibrante mezcla de jugo de mora dulce con agua mineral',
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
