import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryTitle',
})
export class CategoryTitlePipe implements PipeTransform {
  transform(value: string | null): any {
    if (value === null) return 'Categoría';
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
