import { Component, signal } from '@angular/core';
import { Category } from '@front/interfaces/event.interface';
import { CategoryTitlePipe } from '@front/pipes/category.pipe';

@Component({
  selector: 'app-events-page',
  imports: [CategoryTitlePipe],
  templateUrl: './events-page.component.html',
})
export class EventsPageComponent {
  public categoryList: Category[] = ['bebida', 'comida'];

  public selectedCategory = signal<Category | null>(null);

  onCategoryChange(category: Category) {
    this.selectedCategory.set(category);
  }
}
