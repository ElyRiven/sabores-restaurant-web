import { Component } from '@angular/core';

import { RouterLink } from '@angular/router';
import { HeroSection } from '@front/components/hero-section/hero-section.component';
import { UpcomingEventsSectionComponent } from './upcoming-events-section/upcoming-events-section.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HeroSection, UpcomingEventsSectionComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
