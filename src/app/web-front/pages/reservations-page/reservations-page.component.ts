import { Component, signal } from '@angular/core';

import { HeroSection } from '@front/components/hero-section/hero-section.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';

@Component({
  selector: 'app-reservations-page',
  imports: [HeroSection, ReservationFormComponent],
  templateUrl: './reservations-page.component.html',
})
export class ReservationsPageComponent {
  public wasSaved = signal<boolean>(false);
  public isError = signal<boolean>(false);
}
