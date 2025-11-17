import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Plate, MenuCategory } from '@front/interfaces/plate.interface';
import { MenuService } from '@front/services/menu.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-menu-page',
  imports: [NgClass, HeroSection],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private menuService = inject(MenuService);
  private observer?: IntersectionObserver;

  @ViewChild('categorySelector') categorySelector!: ElementRef<HTMLDivElement>;

  public selectedCategory = signal<MenuCategory>('entry');
  public platesArray = signal<Plate[] | undefined>(undefined);
  public isSticky = signal<boolean>(false);

  ngOnInit(): void {
    this.platesArray.set(
      this.menuService.getPlatesByCategory(this.selectedCategory())
    );
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        this.isSticky.set(!entry.isIntersecting);
      },
      { threshold: [1], rootMargin: '-100px 0px 0px 0px' }
    );

    if (this.categorySelector) {
      this.observer.observe(this.categorySelector.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  onCategoryChange(selectedCategory: MenuCategory) {
    this.selectedCategory.set(selectedCategory);
    this.platesArray.set(
      this.menuService.getPlatesByCategory(this.selectedCategory())
    );
  }
}
