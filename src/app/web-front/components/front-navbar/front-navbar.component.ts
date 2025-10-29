import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import {
  Router,
  RouterLink,
  NavigationEnd,
  RouterLinkActive,
} from '@angular/router';

import { filter } from 'rxjs';

import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass, HlmButtonImports],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  #router = inject(Router);

  currentPath = signal(this.#router.url);
  hasScrolled = signal<boolean>(false);

  isMobileMenuOpen = false;

  isTitleFullScreen = computed(() => {
    return (
      (this.currentPath() === '/' || this.currentPath() === '/about') &&
      !this.hasScrolled()
    );
  });

  constructor() {
    this.#router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.currentPath.set(e.urlAfterRedirects);
      });
  }

  mobileMenuInteraction() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.hasScrolled.set(window.scrollY > 0);
  }
}
