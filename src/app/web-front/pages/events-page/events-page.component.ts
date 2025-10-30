import { Component, inject, OnInit, signal } from '@angular/core';
import { Category, Event } from '@front/interfaces/event.interface';
import { CategoryTitlePipe } from '@front/pipes/category.pipe';
import { EventDatePipe } from '@front/pipes/event-date.pipe';
import { EventService } from '@front/services/event.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-events-page',
  imports: [CategoryTitlePipe, EventDatePipe, HeroSection],
  templateUrl: './events-page.component.html',
})
export class EventsPageComponent implements OnInit {
  #eventService = inject(EventService);

  public categoryList: Category[] = ['bebida', 'comida'];
  public selectedCategory = signal<Category | null>(null);
  public eventsArray = signal<Event[] | null>(null);

  ngOnInit(): void {
    this.eventsArray.set(this.#eventService.getAllEvents());
  }

  onCategoryChange(category: Category) {
    this.selectedCategory.set(category);

    this.eventsArray.set(this.#eventService.getEventsByCategory(category));
  }
}
