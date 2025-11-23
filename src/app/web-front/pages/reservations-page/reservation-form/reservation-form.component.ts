import {
  DatePipe,
  DecimalPipe,
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
    DecimalPipe,
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
  formUtils = FormUtils;

  private readonly formBuilder = inject(FormBuilder);
  public readonly eventsService = inject(EventService);
  public readonly addressService = inject(AddressService);

  private readonly defaultPrice = 50;
  public readonly discount = signal<number>(0);
  public readonly subtotal = signal<number>(0);
  public readonly currentStage = signal<FormStage>(FormStage.firstStage);
  public readonly isReserving = signal<boolean>(false);
  public canNavigateForward = signal<boolean>(false);
  public guests = Array.from({ length: 300 }, (_, i) => i + 1);

  public defaultCustomer = signal<Customer>({
    name: '',
    mail: '',
    phone: '',
  });
  public defaultAddress = signal<Address>(
    this.addressService.getAddressById(1)
  );
  // public initialEvent = signal<Event>({})

  public today = new Date();
  public selectedDate = signal<Date | undefined>(undefined);
  public isPopoverOpen = signal<boolean>(false);
  public timeSlots = FormUtils.generateTimeSlots();

  // Control de direcciones disponibles según el evento seleccionado
  public availableAddresses = signal<Address[]>(
    this.addressService.getAllAddress()
  );
  public selectedEventName = signal<string>('');

  // Control de fecha/hora fija para eventos específicos
  public isEventDateFixed = signal<boolean>(false);
  public fixedEventDate = signal<Date | undefined>(undefined);
  public fixedEventTime = signal<string>('');

  // Valores por defecto para el reset
  private readonly defaultFormValues = {
    event: '',
    date: '',
    time: '',
    numberOfGuests: 0 as SeatNumbers,
    address: this.defaultAddress(),
    price: 0,
    customer: this.defaultCustomer(),
    paymentType: 'cash' as PaymentType,
    comments: '',
  };

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
    this.reserveForm.valueChanges.subscribe(() => {
      const fields = this.getFieldsForStage(this.currentStage());
      const isValid = this.formUtils.updateNavigationState(
        this.reserveForm,
        this.currentStage(),
        fields
      );
      this.canNavigateForward.set(isValid);
    });

    const initialFields = this.getFieldsForStage(this.currentStage());
    const initialValid = this.formUtils.updateNavigationState(
      this.reserveForm,
      this.currentStage(),
      initialFields
    );
    this.canNavigateForward.set(initialValid);
  }

  setFormStage(stage: FormStage): void {
    if (!(stage in FormStage)) return;

    this.currentStage.set(stage);

    // Re-evaluar validación cuando cambia la etapa
    const fields = this.getFieldsForStage(stage);
    const isValid = this.formUtils.updateNavigationState(
      this.reserveForm,
      stage,
      fields
    );
    this.canNavigateForward.set(isValid);
  }

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

    const randomDelay = Math.floor(Math.random() * 3000) + 1000;

    setTimeout(() => {
      this.isReserving.set(false);

      this.currentStage.set(FormStage.sixthStage);

      this.reserveForm.reset(this.defaultFormValues);
      this.discount.set(0);
      this.subtotal.set(0);
      this.selectedDate.set(undefined);
      this.timeSlots = FormUtils.generateTimeSlots();
    }, randomDelay);
  }

  onEventSelect(selectedEvent: string) {
    this.selectedEventName.set(selectedEvent);

    // Obtener todos los eventos que coinciden con el evento seleccionado
    const events = this.eventsService.getAllEvents();
    const matchingEvent = events.find(
      (event) =>
        event.title.replaceAll(' ', '-').toLowerCase() === selectedEvent
    );

    // Si se seleccionó un evento específico, filtrar direcciones disponibles
    if (matchingEvent) {
      // Solo mostrar la dirección asociada al evento
      this.availableAddresses.set([matchingEvent.address]);

      // Si la dirección actualmente seleccionada no está disponible, resetearla
      const currentAddress = this.reserveForm.controls.address.value;
      if (currentAddress?.id !== matchingEvent.address.id) {
        this.reserveForm.controls.address.setValue(matchingEvent.address);
      }

      // Configurar fecha y hora fijas del evento
      this.isEventDateFixed.set(true);

      // Convertir fecha del evento (formato: 'MM-DD-YYYY') a Date
      const [month, day, year] = matchingEvent.date.split('-');
      const eventDate = new Date(
        parseInt(year),
        parseInt(month) - 1,
        parseInt(day)
      );

      this.fixedEventDate.set(eventDate);
      this.fixedEventTime.set(matchingEvent.time || '');

      // Establecer automáticamente la fecha y hora en el formulario
      this.reserveForm.controls.date.setValue(matchingEvent.date);
      this.selectedDate.set(eventDate);

      if (matchingEvent.time) {
        this.reserveForm.controls.time.setValue(matchingEvent.time);
      } else {
        // Si no hay hora específica, regenerar slots para esa fecha
        this.timeSlots = FormUtils.generateTimeSlots(eventDate);
      }
    } else {
      // Para eventos genéricos (almuerzo-cena, boda, etc.), mostrar todas las direcciones
      this.availableAddresses.set(this.addressService.getAllAddress());

      // Resetear restricciones de fecha/hora
      this.isEventDateFixed.set(false);
      this.fixedEventDate.set(undefined);
      this.fixedEventTime.set('');

      // Resetear fecha y hora para permitir selección libre
      this.reserveForm.controls.date.reset();
      this.reserveForm.controls.time.reset();
      this.selectedDate.set(undefined);
      this.timeSlots = FormUtils.generateTimeSlots();
    }
  }

  onAddressSelect(selectedAddress: Address) {
    // Comprobar que, si existe un evento seleccionado, ese evento esté disponible en la dirección seleccionada
    const selectedEvent = this.selectedEventName();

    if (selectedEvent) {
      const events = this.eventsService.getAllEvents();
      const matchingEvent = events.find(
        (event) =>
          event.title.replaceAll(' ', '-').toLowerCase() === selectedEvent
      );

      // Si hay un evento específico seleccionado, validar que esté en esta dirección
      if (matchingEvent && matchingEvent.address.id !== selectedAddress.id) {
        // Resetear la dirección a la correcta
        this.reserveForm.controls.address.setValue(matchingEvent.address);
      }
    }
  }

  onTimeSelect(selectedTime: string) {
    this.reserveForm.controls.time.setValue(selectedTime);
  }

  onDateSelect(selectedDate: Date | undefined) {
    if (!selectedDate) return;

    this.reserveForm.controls.time.reset();
    this.selectedDate.set(selectedDate);

    this.timeSlots = FormUtils.generateTimeSlots(selectedDate);

    const dateString = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
    this.reserveForm.controls.date.setValue(dateString);

    this.isPopoverOpen.set(false);
  }

  onGuestsSelect(guests: number) {
    if (guests < 1) return;

    this.subtotal.set(this.defaultPrice * guests);

    if (guests > 5) this.discount.set(0.1);

    if (guests > 50) this.discount.set(0.15);

    if (guests > 125) this.discount.set(0.2);

    const reservePrice = this.subtotal() * (1 - this.discount());

    this.reserveForm.controls.price.setValue(reservePrice);
  }

  selectedAddress(): Address {
    const address = this.reserveForm.controls.address.value;

    return address ? address : ({} as Address);
  }
}
