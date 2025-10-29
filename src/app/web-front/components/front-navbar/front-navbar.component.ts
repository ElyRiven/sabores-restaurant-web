import { NgClass } from '@angular/common';
import {
  Component,
  inject,
  signal,
  computed,
  HostListener,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Router,
  RouterLink,
  NavigationEnd,
  RouterLinkActive,
} from '@angular/router';
import { filter, map } from 'rxjs';

import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass, HlmButtonImports],
  templateUrl: './front-navbar.component.html',
})
export class FrontNavbarComponent {
  #router = inject(Router);

  currentPath = toSignal(
    this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => {
        console.log({ currentPath: event.urlAfterRedirects });

        return event.urlAfterRedirects;
      })
    ),
    { initialValue: this.#router.url }
  );
  hasScrolled = signal<boolean>(false);

  isMobileMenuOpen = false;

  isTitleFullScreen = computed(() => {
    return (
      (this.currentPath() === '/' || this.currentPath() === '/about') &&
      !this.hasScrolled()
    );
  });

  mobileMenuInteraction() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.hasScrolled.set(window.scrollY > 0);
  }
}
