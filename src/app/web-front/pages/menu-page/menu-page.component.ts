import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import { MenuService } from '@front/services/menu.service';
import type { MenuCategories } from '@front/interfaces/plate.interface';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-menu-page',
  imports: [NgClass, HeroSection],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent implements AfterViewInit, OnDestroy {
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
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.selectedCategory.set(entry.target.id as MenuCategories);
          }
        });
      },
      {
        rootMargin: '-200px 0px -40% 0px',
        threshold: 0,
      }
    );

    this.categories.forEach((category) => {
      const element = document.getElementById(category.name);
      if (element) {
        this.observer?.observe(element);
      }
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  scrollToSection(event: Event, sectionId: MenuCategories) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.selectedCategory.set(sectionId);
    }
  }
}
