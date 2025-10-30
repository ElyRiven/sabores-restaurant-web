import { Component, input } from '@angular/core';

@Component({
  selector: 'hero-section',
  imports: [],
  templateUrl: './hero-section.component.html',
})
export class HeroSection {
  heroImage = input.required<string>();

  showOverlay = input<boolean>(true);

  heroTitle = input<string>('');
}
