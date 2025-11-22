import { JsonPipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
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
import { lucideChevronDown, lucideCreditCard } from '@ng-icons/lucide';

import type {
  Customer,
  PaymentType,
  ReservationForm,
  SeatNumbers,
} from '@front/interfaces/reservation.interface';
import type { Address } from '@front/interfaces/address.interface';
import { EventService } from '@front/services/event.service';
import { AddressService } from '@front/services/address.service';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';

@Component({
  selector: 'reservation-form',
  imports: [
    ReactiveFormsModule,
    NgClass,
    BrnPopover,
    BrnPopoverTrigger,
    BrnSelectImports,
    BrnPopoverContent,
    HlmPopoverContent,
    HlmCalendar,
    HlmSelectImports,
    HlmFormFieldImports,
    HlmInputImports,
    HlmTextareaImports,
    HlmRadioGroupImports,
    HlmIcon,
    NgIcon,
    UpperCasePipe,
    JsonPipe,
  ],
  providers: [
    provideIcons({ lucideChevronDown, lucideCreditCard }),
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
  private readonly defaultPrice = 50;

  private readonly formBuilder = inject(FormBuilder);

  public readonly eventsService = inject(EventService);
  public readonly addressService = inject(AddressService);
  public guests = Array.from({ length: 300 }, (_, i) => i + 1);

  public customer = signal<Customer>({
    name: '',
    mail: '',
    phone: '',
  });

  // Fecha mínima permitida (hoy)
  public today = new Date();

  // Fecha seleccionada
  public selectedDate = signal<Date | undefined>(undefined);

  // Estado del popover
  public isPopoverOpen = signal<boolean>(false);

  public readonly discount = signal<number>(0);

  public timeSlots = this.generateTimeSlots();

  // ID de dirección seleccionada (inicializado con el primer restaurante)
  public selectedAddressId = 1;

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
    numberOfGuests: [0 as SeatNumbers, Validators.required],
    address: [{} as Address, Validators.required],
    price: [0, Validators.required],
    customer: [this.customer(), Validators.required],
    paymentType: ['cash' as PaymentType, Validators.required],
    comments: [''],
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
    console.log({
      selectedEvent,
      formEvent: this.reserveForm.controls.event.value,
    });
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

  onAddressSelect(selectedAddress: Address) {
    // if (!selectedAddress) return;
    // this.reserveForm.controls.address.setValue(selectedAddress);

    setTimeout(() => {
      console.log({
        selectedAddress,
        formAddress: this.reserveForm.controls.address.value,
      });
    }, 100);
  }

  onGuestsSelect(guests: number) {
    if (guests < 1) return;

    this.discount.set(0);

    if (guests > 5) this.discount.set(0.1);

    if (guests > 50) this.discount.set(0.15);

    if (guests > 125) this.discount.set(0.2);

    const reservePrice = this.defaultPrice * guests * (1 - this.discount());

    this.reserveForm.controls.price.setValue(reservePrice);

    setTimeout(() => {
      console.log({
        guests,
        formGuests: this.reserveForm.controls.numberOfGuests.value,
      });
    }, 100);
  }

  selectedAddress(): string {
    const selectedAddress = this.reserveForm.controls.address.value?.streets;

    return selectedAddress ? selectedAddress : '';
  }

  // Formateo de número de tarjeta: 1234 5678 9012 3456
  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, ''); // Quitar espacios
    value = value.replace(/\D/g, ''); // Solo números

    // Agrupar en bloques de 4
    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formatted;
  }

  // Formateo de fecha de expiración: MM/AA
  formatExpiry(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Solo números

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    input.value = value;
  }

  // Formateo de CVC: solo números, máximo 4 dígitos
  formatCvc(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, ''); // Solo números
  }

  constructor() {
    this.reserveForm.valueChanges.subscribe(() => {
      console.log({
        formValue: this.reserveForm.value,
        isFormValid: this.reserveForm.valid,
        errors: {
          event: this.reserveForm.controls.event.errors,
          date: this.reserveForm.controls.date.errors,
          time: this.reserveForm.controls.time.errors,
          numberOfGuests: this.reserveForm.controls.numberOfGuests.errors,
          address: this.reserveForm.controls.address.errors,
          price: this.reserveForm.controls.price.errors,
          customer: this.reserveForm.controls.customer.errors,
          paymentType: this.reserveForm.controls.paymentType.errors,
        },
      });
    });
  }
}
