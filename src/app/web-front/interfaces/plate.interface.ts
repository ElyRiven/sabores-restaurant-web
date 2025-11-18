export type MenuCategories = 'entries' | 'dishes' | 'desserts' | 'drinks';

export type Menu = {
  [K in MenuCategories]: {
    image: string;
    dishes: Dish[];
  };
};

export interface Dish {
  name: string;
  description: string;
  image: string;
  price: number;
}
