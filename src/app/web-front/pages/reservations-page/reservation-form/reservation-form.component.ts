import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { provideBrnCalendarI18n } from '@spartan-ng/brain/calendar';
import {
  HlmDatePickerImports,
  provideHlmDatePickerConfig,
} from '@spartan-ng/helm/date-picker';

import type {
  Customer,
  PaymentType,
  ReservationForm,
  SeatNumbers,
} from '@front/interfaces/reservation.interface';
import type { Address } from '@front/interfaces/address.interface';
import { EventService } from '@front/services/event.service';

@Component({
  selector: 'reservation-form',
  imports: [ReactiveFormsModule, HlmDatePickerImports, NgClass],
  providers: [
    provideBrnCalendarI18n({
      labelWeekday: (weekday: number) => {
        const dias = [
          'Domingo',
          'Lunes',
          'Martes',
          'Miércoles',
          'Jueves',
          'Viernes',
          'Sábado',
        ];
        return dias[weekday];
      },
      formatWeekdayName: (weekday: number) => {
        const diasCortos = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
        return diasCortos[weekday];
      },
      formatHeader: (month: number, year: number) => {
        const meses = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        return `${meses[month]} ${year}`;
      },
      formatYear: (year: number) => `${year}`,
      formatMonth: (month: number) => {
        const meses = [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ];
        return meses[month];
      },
      labelPrevious: () => 'Mes anterior',
      labelNext: () => 'Mes siguiente',
      months: () => [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      years: (startYear?: number, endYear?: number) => {
        const currentYear = new Date().getFullYear();
        const start = startYear ?? currentYear - 100;
        const end = endYear ?? currentYear + 100;
        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
      },
      firstDayOfWeek: () => 1,
    }),
    provideHlmDatePickerConfig({
      formatDate: (date: Date) => {
        if (!(date instanceof Date)) return `${date}`;

        const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
        const meses = [
          'Ene',
          'Feb',
          'Mar',
          'Abr',
          'May',
          'Jun',
          'Jul',
          'Ago',
          'Sep',
          'Oct',
          'Nov',
          'Dic',
        ];

        const dia = dias[date.getDay()];
        const mes = meses[date.getMonth()];
        const numDia = date.getDate();
        const año = date.getFullYear();

        return `${dia} ${numDia} ${mes} ${año}`;
      },
      autoCloseOnSelect: true,
    }),
  ],
  templateUrl: './reservation-form.component.html',
})
export class ReservationFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  public readonly eventsService = inject(EventService);

  public customer = signal<Customer>({
    name: '',
    mail: '',
    phone: '',
  });

  public address = signal<Address>({
    id: 0,
    name: '',
    streets: '',
    latitude: 0,
    longitude: 0,
  });

  public timeSlots = this.generateTimeSlots();

  public reserveForm: FormGroup<ReservationForm> = this.formBuilder.group({
    event: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    numberOfGuests: [1 as SeatNumbers, Validators.required],
    address: [this.address(), Validators.required],
    price: [0, Validators.required],
    customer: [this.customer(), Validators.required],
    paymentType: ['cash' as PaymentType, Validators.required],
  });

  generateTimeSlots(): string[] {
    const slots: string[] = [];
    const startHour = 10;
    const endHour = 20;

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 30) {
        if (hour === endHour && minutes > 0) break;

        const period = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        const timeString = `${displayHour}:${minutes
          .toString()
          .padStart(2, '0')} ${period}`;
        slots.push(timeString);
      }
    }

    return slots;
  }

  onEventSelect(selectedEvent: string) {
    //! DELETE LOG
    console.log({ selectedEvent });
  }

  onTimeSelect(selectedTime: string) {
    this.reserveForm.controls.time.setValue(selectedTime);

    console.log({
      formTime: this.reserveForm.controls.time.value,
      selectedTime,
    });
  }
}
