import { DecimalPipe, NgClass, UpperCasePipe } from '@angular/common';
import {
  Component,
  inject,
  signal,
  AfterViewInit,
  OnDestroy,
  OnInit,
  HostListener,
  viewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MenuService } from '@front/services/menu.service';
import type { MenuCategories } from '@front/interfaces/plate.interface';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-menu-page',
  imports: [NgClass, HeroSection, UpperCasePipe, DecimalPipe],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public readonly menuService = inject(MenuService);
  private route = inject(ActivatedRoute);

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

  public isCategoryMenuSticky = signal<boolean>(false);
  public CategoryMenuElement = viewChild<ElementRef>('categorySelector');

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          if (element) {
            const yOffset = -186;
            const y =
              element.getBoundingClientRect().top +
              window.pageYOffset +
              yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            this.selectedCategory.set(fragment as MenuCategories);
          }
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    // Observer for section detection
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

  @HostListener('window:scroll')
  onScroll() {
    const menu = this.CategoryMenuElement()?.nativeElement;
    if (menu) {
      const topDistance = menu.getBoundingClientRect().top;

      topDistance === 100
        ? this.isCategoryMenuSticky.set(true)
        : this.isCategoryMenuSticky.set(false);
    }
  }
}
