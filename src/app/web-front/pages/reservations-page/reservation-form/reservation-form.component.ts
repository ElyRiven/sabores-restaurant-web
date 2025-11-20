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
  BrnPopover,
  BrnPopoverContent,
  BrnPopoverTrigger,
} from '@spartan-ng/brain/popover';
import { HlmCalendar } from '@spartan-ng/helm/calendar';
import { HlmPopoverContent } from '@spartan-ng/helm/popover';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown } from '@ng-icons/lucide';

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
  imports: [
    ReactiveFormsModule,
    NgClass,
    BrnPopover,
    BrnPopoverTrigger,
    BrnPopoverContent,
    HlmPopoverContent,
    HlmCalendar,
    NgIcon,
    HlmIcon,
  ],
  providers: [
    provideIcons({ lucideChevronDown }),
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

  // Fecha mínima permitida (hoy)
  public today = new Date();

  // Fecha seleccionada
  public selectedDate = signal<Date | undefined>(undefined);

  // Estado del popover
  public isPopoverOpen = signal<boolean>(false);

  public timeSlots = this.generateTimeSlots();

  // Función para deshabilitar domingos
  public isSunday = (date: Date): boolean => {
    return date.getDay() === 0;
  };

  // Formato de fecha para mostrar
  public formatDisplayDate(date: Date | undefined): string {
    if (!date) return '';

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
  }

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
    const now = new Date();
    const today = new Date();

    // Verificar si estamos generando para hoy
    const isToday =
      this.selectedDate() &&
      this.selectedDate()!.getDate() === today.getDate() &&
      this.selectedDate()!.getMonth() === today.getMonth() &&
      this.selectedDate()!.getFullYear() === today.getFullYear();

    let startHour = 10;
    let startMinutes = 0;
    const endHour = 20;

    // Si es hoy, calcular la siguiente hora válida
    if (isToday) {
      const currentHour = now.getHours();
      const currentMinutes = now.getMinutes();

      startHour = currentHour;
      startMinutes = currentMinutes <= 30 ? 30 : 0;

      // Si ya pasamos el minuto 30, la siguiente hora válida es la hora siguiente
      if (currentMinutes > 30) {
        startHour++;
        startMinutes = 0;
      }

      // Si la hora de inicio ya es mayor o igual a las 8pm, no hay slots disponibles
      if (startHour >= endHour) {
        return [];
      }
    }

    for (let hour = startHour; hour <= endHour; hour++) {
      const minutesToIterate =
        hour === startHour && isToday && startMinutes === 30 ? [30] : [0, 30];

      for (const minutes of minutesToIterate) {
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

  onDateSelect(selectedDate: Date | undefined) {
    if (!selectedDate) return;

    this.selectedDate.set(selectedDate);

    // Regenerar timeSlots basándose en la fecha seleccionada
    this.timeSlots = this.generateTimeSlots();

    // Convertir Date a string en formato ISO
    const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    this.reserveForm.controls.date.setValue(dateString);

    // Cerrar el popover
    this.isPopoverOpen.set(false);

    console.log({
      formDate: this.reserveForm.controls.date.value,
      selectedDate,
      dateString,
      availableSlots: this.timeSlots.length,
    });
  }
}
