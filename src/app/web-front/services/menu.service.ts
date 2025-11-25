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
          'Ensalada con aguacate cremoso, frijoles negros, maíz y una vinagreta de lima picante',
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
          'Solomillo de cerdo (glaseado naranja y miel), puré de patatas cremoso, brócoli asado',
        image: 'assets/photos/menu/dishes/pig-solomillo.webp',
        price: 19.99,
      },
      {
        name: 'Tournedó Rossini',
        description:
          'Lomo de res envuelto en tocineta, foie gras, salsa de trufa negra y patatas gratinadas',
        image: 'assets/photos/menu/dishes/tournedo-rossini.webp',
        price: 23,
      },
      {
        name: 'Brochetas de Langostino',
        description:
          'Brochetas de langostinos gigantes, salteado de verduras orientales y salsa de la casa',
        image: 'assets/photos/menu/dishes/prawn-skewers.webp',
        price: 25.5,
      },
      {
        name: 'Ossobuco al jugo',
        description:
          'Ossobuco de ternera (cocción lenta), toque de limón. Acompañado de risotto cremoso al azafrán',
        image: 'assets/photos/menu/dishes/ossobuco.webp',
        price: 20.99,
      },
      {
        name: 'Lasaña de Osobuco',
        description:
          'Lasaña de ossobuco de ternera. Gratinada con bechamel cremosa de trufa y queso parmesano',
        image: 'assets/photos/menu/dishes/ossobuco-lasagna.webp',
        price: 22.5,
      },
      {
        name: 'Rigatoni Bistecca',
        description:
          'Rigatoni al dente con tiras de solomillo de res y una rica salsa cremosa de champiñones',
        image: 'assets/photos/menu/dishes/rigatoni-bistecca.webp',
        price: 19.99,
      },
      {
        name: 'Spaghetti con Ragú de Pato',
        description:
          'Spaghetti con ragú de pato y salsa de tomate, orégano y queso rallado',
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
        description:
          'Fresco Cheesecake de vainilla con un toque de salsa de limón',
        image: 'assets/photos/menu/desserts/vanilla-cheesecake.webp',
        price: 6.99,
      },
      {
        name: 'Brownie de chocolate',
        description: 'Delicioso brownie con relleno líquido de chocolate',
        image: 'assets/photos/menu/desserts/brownie.webp',
        price: 9.99,
      },
      {
        name: 'Cupcake de frutas',
        description: 'Un cupcake con relleno y sabor a frutas',
        image: 'assets/photos/menu/desserts/fruit-cupcake.webp',
        price: 5,
      },
      {
        name: 'Esfera dulce',
        description:
          'Esfera de postre: bizcocho de avellana, corazón líquido de caramelo y glaze de chocolate con leche',
        image: 'assets/photos/menu/desserts/sweet-sphere.webp',
        price: 12,
      },
      {
        name: 'Volcán esmeralda',
        description:
          'Tarta de lima dulce terminada con merengue ligeramente tostado y chocolate',
        image: 'assets/photos/menu/desserts/emerald-volcano.webp',
        price: 10.5,
      },
      {
        name: 'Milhojas de Vainilla',

        description:
          'Hojaldre crujiente y crema pastelera de vainilla negra. Servido con frambuesas y moras',
        image: 'assets/photos/menu/desserts/berries-millefeuille.webp',
        price: 12,
      },
    ],
  },
  drinks: {
    image: '/assets/photos/front/drinks-section.webp',
    dishes: [
      {
        name: 'Vino blanco serenetta',
        description: 'Refrescante y equilibrado vino blanco',
        image: 'assets/photos/menu/drinks/white-wine.webp',
        price: 9,
      },
      {
        name: 'Diamante Negro',
        description: 'Cóctel de vodka y licor de café con un toque ahumado',
        image: 'assets/photos/menu/drinks/black-diamond.webp',
        price: 11.5,
      },
      {
        name: 'Vino tinto nuitte',
        description:
          'Vino tinto intenso, con cuerpo y notas profundas de frutas maduras',
        image: 'assets/photos/menu/drinks/red-wine.webp',
        price: 9,
      },
      {
        name: 'Oro Tostado',
        description:
          'Ron oscuro, jarabe de caramelo y un toque de crema de coco',
        image: 'assets/photos/menu/drinks/toast-gold.webp',
        price: 10,
      },
      {
        name: 'Naranja Fizz',
        description: 'Suave mezcla de jugo de naranja con agua mineral',
        image: 'assets/photos/menu/drinks/orange.webp',
        price: 8.5,
      },
      {
        name: 'Mora Carmesí',
        description: 'Vibrante mezcla de jugo de mora dulce con agua mineral',
        image: 'assets/photos/menu/drinks/blackberry.webp',
        price: 8.5,
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
