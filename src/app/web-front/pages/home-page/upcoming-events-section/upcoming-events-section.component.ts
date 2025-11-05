import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventDatePipe } from '@front/pipes/event-date.pipe';
import { EventService } from '@front/services/event.service';

@Component({
  selector: 'upcoming-events-section',
  imports: [RouterLink, EventDatePipe],
  templateUrl: './upcoming-events-section.component.html',
})
export class UpcomingEventsSectionComponent {
  readonly eventsService = inject(EventService);
}
