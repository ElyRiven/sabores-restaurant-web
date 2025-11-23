import {
  DatePipe,
  JsonPipe,
  LowerCasePipe,
  NgClass,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
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
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmCalendar } from '@spartan-ng/helm/calendar';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmPopoverContent } from '@spartan-ng/helm/popover';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { HlmFormFieldImports } from '@spartan-ng/helm/form-field';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronDown, lucideCreditCard } from '@ng-icons/lucide';

import {
  Customer,
  CustomerForm,
  FormStage,
  PaymentType,
  ReservationForm,
  SeatNumbers,
} from '@front/interfaces/reservation.interface';
import type { Address } from '@front/interfaces/address.interface';
import { EventService } from '@front/services/event.service';
import { AddressService } from '@front/services/address.service';
import { FormUtils } from '@front/utils/form-utils';

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
    TitleCasePipe,
    LowerCasePipe,
    DatePipe,
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
  formUtils = FormUtils;

  private readonly formBuilder = inject(FormBuilder);

  public readonly currentStage = signal<FormStage>(FormStage.firstStage);

  public readonly isReserving = signal<boolean>(false);

  public canNavigateForward = signal<boolean>(false);

  public readonly eventsService = inject(EventService);
  public readonly addressService = inject(AddressService);
  public guests = Array.from({ length: 300 }, (_, i) => i + 1);

  public customer = signal<Customer>({
    name: '',
    mail: '',
    phone: '',
  });

  public defaultAddress = signal<Address>(
    this.addressService.getAddressById(1)
  );

  // public initialEvent = signal<Event>({})

  // Fecha mínima permitida (hoy)
  public today = new Date();

  // Fecha seleccionada
  public selectedDate = signal<Date | undefined>(undefined);

  // Estado del popover
  public isPopoverOpen = signal<boolean>(false);

  public readonly discount = signal<number>(0);

  public readonly subtotal = signal<number>(0);

  public timeSlots = this.generateTimeSlots();

  // Valores por defecto para el reset
  private readonly defaultFormValues = {
    event: '',
    date: '',
    time: '',
    numberOfGuests: 0 as SeatNumbers,
    address: this.defaultAddress(),
    price: 0,
    customer: {
      name: '',
      mail: '',
      phone: '',
    },
    paymentType: 'cash' as PaymentType,
    comments: '',
  };

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

  public customerForm: FormGroup<CustomerForm> = this.formBuilder.group({
    name: ['', Validators.required],
    mail: [
      '',
      [Validators.required, Validators.pattern(this.formUtils.emailPattern)],
    ],
    phone: ['', [Validators.required, Validators.minLength(10)]],
  });

  public reserveForm: FormGroup<ReservationForm> = this.formBuilder.group({
    event: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    numberOfGuests: [
      0 as SeatNumbers,
      [Validators.required, Validators.min(1)],
    ],
    address: [this.defaultAddress(), Validators.required],
    price: [0, [Validators.required, Validators.min(1)]],
    customer: this.customerForm,
    paymentType: ['cash' as PaymentType, Validators.required],
    comments: [''],
  });

  constructor() {
    // Suscribirse a cambios del formulario y actualizar canNavigateForward
    this.reserveForm.valueChanges.subscribe(() => {
      const fields = this.getFieldsForStage(this.currentStage());
      const currentForm =
        this.currentStage() === 4
          ? this.reserveForm.controls.customer
          : this.reserveForm;

      const isValid = this.formUtils.checkNavigation(currentForm, fields);
      this.canNavigateForward.set(isValid);
    });

    // Evaluar inmediatamente al cargar
    const initialFields = this.getFieldsForStage(this.currentStage());
    const initialValid = this.formUtils.checkNavigation(
      this.reserveForm,
      initialFields
    );
    this.canNavigateForward.set(initialValid);
  }

  setFormStage(stage: FormStage): void {
    if (!(stage in FormStage)) return;

    this.currentStage.set(stage);

    // Re-evaluar validación cuando cambia la etapa
    const fields = this.getFieldsForStage(stage);
    const isValid = this.formUtils.checkNavigation(this.reserveForm, fields);
    this.canNavigateForward.set(isValid);

    console.log({ formStage: this.currentStage() });
  }

  // Retorna los campos a validar según la etapa actual
  getFieldsForStage(stage: FormStage): string[] {
    switch (stage) {
      case FormStage.firstStage:
        return ['event', 'address'];
      case FormStage.secondStage:
        return ['date', 'time'];
      case FormStage.thirdStage:
        return ['numberOfGuests', 'price'];
      case FormStage.fourthStage:
        return ['name', 'mail', 'phone'];
      case FormStage.fifthStage:
        return ['paymentType'];
      default:
        return [];
    }
  }

  canReserve(form: FormGroup): boolean {
    if (!form.valid) return false;

    return true;
  }

  onReserve() {
    this.isReserving.set(true);

    // Generar tiempo aleatorio entre 1 y 4 segundos (1000ms - 4000ms)
    const randomDelay = Math.floor(Math.random() * 3000) + 1000;

    setTimeout(() => {
      this.isReserving.set(false);

      this.currentStage.set(FormStage.sixthStage);

      this.reserveForm.reset(this.defaultFormValues);
      this.discount.set(0);
      this.subtotal.set(0);
      this.selectedDate.set(undefined);
      this.timeSlots = this.generateTimeSlots();
    }, randomDelay);
  }

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

    this.reserveForm.controls.time.reset();

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

    this.subtotal.set(this.defaultPrice * guests);

    if (guests > 5) this.discount.set(0.1);

    if (guests > 50) this.discount.set(0.15);

    if (guests > 125) this.discount.set(0.2);

    const reservePrice = this.subtotal() * (1 - this.discount());

    this.reserveForm.controls.price.setValue(reservePrice);

    setTimeout(() => {
      console.log({
        guests,
        formGuests: this.reserveForm.controls.numberOfGuests.value,
      });
    }, 100);
  }

  selectedAddress(): Address {
    const address = this.reserveForm.controls.address.value;

    return address ? address : ({} as Address);
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

  // Formateo de teléfono: solo números, máximo 10 dígitos
  formatPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Solo números
    value = value.slice(0, 10); // Máximo 10 dígitos
    input.value = value;
  }
}
