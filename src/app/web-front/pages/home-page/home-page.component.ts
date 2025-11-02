import { Component, inject } from '@angular/core';

import { MenuService } from '@front/services/menu.service';
import { RouterLink } from '@angular/router';
import { HeroSection } from '@front/components/hero-section/hero-section.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HeroSection],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  #menuService = inject(MenuService);

  public entries = this.#menuService.getPlatesByCategory('entry');
}
