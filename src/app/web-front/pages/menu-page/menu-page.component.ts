import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';

import { MenuService } from '@front/services/menu.service';
import type { MenuCategories } from '@front/interfaces/plate.interface';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-menu-page',
  imports: [NgClass, HeroSection],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent {
  public readonly menuService = inject(MenuService);

  public categoryLabels: Record<MenuCategories, string> = {
    entries: 'Entradas',
    dishes: 'Platos Fuertes',
    desserts: 'Postres',
    drinks: 'Bebidas',
  };

  public categories = Object.entries(this.menuService.getMenu()).map(
    ([key, value]) => ({
      name: key as MenuCategories,
      image: value.image,
      dishes: value.dishes,
    })
  );

  public selectedCategory = signal<MenuCategories>('entries');

  scrollToSection(event: Event, sectionId: MenuCategories) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.selectedCategory.set(sectionId);
    }
  }
}
