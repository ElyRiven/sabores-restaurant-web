import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EventService } from '@front/services/event.service';

@Component({
  selector: 'upcoming-events-section',
  imports: [RouterLink, DatePipe, TitleCasePipe],
  templateUrl: './upcoming-events-section.component.html',
})
export class UpcomingEventsSectionComponent {
  readonly eventsService = inject(EventService);
}
