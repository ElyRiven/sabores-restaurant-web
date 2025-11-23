import { FormGroup, ValidationErrors } from '@angular/forms';

import type { ReservationForm } from '@front/interfaces/reservation.interface';

export class FormUtils {
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
          break;

        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres`;

        case 'min':
          return `Valor minimo de ${errors['min'].min}`;

        case 'pattern':
          if (errors['pattern'].requiredPattern === this.emailPattern) {
            return 'Correo electronico no valido';
          }

          return 'Error de patron contra expresion regular';

        default:
          return `Error de validacion no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return form.controls[fieldName].errors && form.controls[fieldName].touched;
  }

  static checkNavigation(form: FormGroup, fieldNames: string[]): boolean {
    // Verificar si todos los campos especificados son válidos
    return fieldNames.every((fieldName) => {
      const control = form.controls[fieldName];

      // Si el control no existe, considerarlo como inválido
      if (!control) return false;

      return control.valid;
    });
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }

  static formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s/g, '');
    value = value.replace(/\D/g, '');

    const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formatted;
  }

  static formatExpiry(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    input.value = value;
  }

  static formatCvc(event: Event): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/\D/g, '');
  }

  static formatPhone(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    value = value.slice(0, 10);
    input.value = value;
  }

  // Función para deshabilitar domingos en el selector de fechas
  static isSunday(date: Date): boolean {
    return date.getDay() === 0;
  }

  // Formato de fecha para mostrar en el selector
  static formatDisplayDate(date: Date | undefined): string {
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

  // Actualiza el estado de navegación basándose en la etapa actual y los campos a validar
  static updateNavigationState(
    reserveForm: FormGroup,
    currentStage: number,
    fields: string[]
  ): boolean {
    // Determinar qué formulario validar según la etapa
    const currentForm =
      currentStage === 4 ? reserveForm.controls['customer'] : reserveForm;

    // Validar los campos especificados
    return this.checkNavigation(currentForm as FormGroup, fields);
  }

  // Genera los slots de tiempo disponibles para reservas
  static generateTimeSlots(selectedDate?: Date): string[] {
    const slots: string[] = [];
    const now = new Date();
    const today = new Date();

    // Verificar si estamos generando para hoy
    const isToday =
      selectedDate &&
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear();

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

  // Obtener la dirección seleccionada del formulario
  static getSelectedAddress(reserveForm: FormGroup<ReservationForm>): any {
    const address = reserveForm.controls.address.value;
    return address ? address : {};
  }
}
