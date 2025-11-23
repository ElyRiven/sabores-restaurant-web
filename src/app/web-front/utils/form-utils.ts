import { FormGroup, ValidationErrors } from '@angular/forms';

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

        case 'email':
          return 'Dirección de correo requerida';

        case 'emailTaken':
          return 'El correo electronico ya esta siendo usado';

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

      // El campo es válido si no tiene errores

      console.log({ controlName: fieldName, isValid: control.valid });

      return control.valid;
    });
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return this.getTextError(errors);
  }
}
