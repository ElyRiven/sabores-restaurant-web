import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

import { EventService } from '@front/services/event.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-events-page',
  imports: [HeroSection, DatePipe, UpperCasePipe],
  templateUrl: './events-page.component.html',
})
export class EventsPageComponent {
  public readonly eventService = inject(EventService);
}
