import { Component, inject } from '@angular/core';
import { DatePipe, UpperCasePipe } from '@angular/common';

import { HlmBadgeImports } from '@spartan-ng/helm/badge';

import { EventService } from '@front/services/event.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-page',
  imports: [HeroSection, DatePipe, UpperCasePipe, HlmBadgeImports, RouterLink],
  templateUrl: './events-page.component.html',
})
export class EventsPageComponent {
  public readonly eventService = inject(EventService);
}
