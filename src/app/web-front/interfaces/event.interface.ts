export type Category = 'bebida' | 'comida';

export interface Event {
  title: string;
  description: string;
  image: string;
  date: string; // MM-dd | 12-25
  category: Category;
}
