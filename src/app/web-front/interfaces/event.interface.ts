export type Category = 'bebida' | 'comida';

export interface Event {
  title: string;
  description: string;
  category: Category;
  date: string;
}
