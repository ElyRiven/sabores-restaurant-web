import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';

import { EventService } from '@front/services/event.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-events-page',
  imports: [HeroSection, DatePipe],
  templateUrl: './events-page.component.html',
})
export class EventsPageComponent {
  public readonly eventService = inject(EventService);
}
