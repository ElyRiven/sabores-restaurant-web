import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Plate, MenuCategory } from '@front/interfaces/plate.interface';
import { MenuService } from '@front/services/menu.service';

@Component({
  selector: 'app-menu-page',
  imports: [NgClass],
  templateUrl: './menu-page.component.html',
})
export class MenuPageComponent implements OnInit {
  private menuService = inject(MenuService);

  public selectedCategory = signal<MenuCategory>('entry');
  public platesArray = signal<Plate[] | undefined>(undefined);

  ngOnInit(): void {
    this.platesArray.set(
      this.menuService.getPlatesByCategory(this.selectedCategory())
    );
  }

  onCategoryChange(selectedCategory: MenuCategory) {
    this.selectedCategory.set(selectedCategory);
    this.platesArray.set(
      this.menuService.getPlatesByCategory(this.selectedCategory())
    );
  }
}
