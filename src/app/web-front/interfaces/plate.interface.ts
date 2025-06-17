export type MenuCategory = 'entry' | 'dish' | 'dessert' | 'drink';

export interface Plate {
  name: string;
  description: string;
  category: MenuCategory;
  image: string;
}
