import { Component, computed, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import type {
  Reservation,
  ReserveSeatNumbers,
} from '@front/interfaces/reservation.interface';
import { ReservationService } from '@front/services/reservation.service';
import { FormUtils } from '@front/utils/form-utils';
import { HeroSection } from '@front/components/hero-section/hero-section.component';
import { EventService } from '@front/services/event.service';

@Component({
  selector: 'app-reservations-page',
  imports: [ReactiveFormsModule, HeroSection],
  templateUrl: './reservations-page.component.html',
})
export class ReservationsPageComponent {
  #formBuilder = inject(FormBuilder);
  #reservationService = inject(ReservationService);

  public readonly eventsService = inject(EventService);

  public formUtils = FormUtils;

  public wasSaved = signal<boolean>(false);
  public isError = signal<boolean>(false);

  public today: string = new Date().toISOString().split('T')[0];
  public seatNumbers: ReserveSeatNumbers[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  public reserveForm: FormGroup = this.#formBuilder.group({
    name: ['', Validators.required],
    mail: ['', [Validators.required, Validators.email]],
    reservationDate: ['', Validators.required],
    reservationTime: ['', Validators.required],
    phone: ['', Validators.required],
    numberOfPersons: [1, Validators.required],
    comment: ['', Validators.maxLength(80)],
  });

  onSelect(selectedEvent: string) {
    console.log({ selectedEvent });
  }

  onReserve() {
    if (this.reserveForm.invalid) {
      this.reserveForm.markAllAsTouched();

      this.isError.set(true);

      setTimeout(() => {
        this.isError.set(false);
      }, 3000);

      return;
    }

    const {
      name,
      mail,
      reservationDate,
      reservationTime,
      phone,
      numberOfPersons,
      comments,
    } = this.reserveForm.value;
    const reservationDateTime = `${reservationDate}T${reservationTime}`;
    const newReservation: Reservation = {
      name,
      mail,
      reservationDateTime,
      phone,
      numberOfPersons,
    };

    this.#reservationService.postReservation(newReservation);

    this.wasSaved.set(true);

    setTimeout(() => {
      this.wasSaved.set(false);
    }, 3000);
  }
}
