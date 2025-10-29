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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

import { filter, map } from 'rxjs';

import {
  mobileMenuAnimation,
  titleAnimation,
} from '@front/animations/navbar-animations';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.component.html',
  animations: [titleAnimation, mobileMenuAnimation],
})
export class FrontNavbarComponent {
  #router = inject(Router);
  #breakpointObserver = inject(BreakpointObserver);

  currentPath = toSignal(
    this.#router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => {
        return event.urlAfterRedirects;
      })
    ),
    { initialValue: this.#router.url }
  );

  isMobile = toSignal(
    this.#breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches)),
    { initialValue: false }
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
