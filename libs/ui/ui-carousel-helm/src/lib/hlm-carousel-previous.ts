import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowLeft } from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '@spartan-ng/helm/button';
// import { HlmIcon } from '@spartan-ng/helm/icon';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { HlmCarousel } from './hlm-carousel';

@Component({
  selector: 'button[hlm-carousel-previous], button[hlmCarouselPrevious]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[disabled]': 'isDisabled()',
    '(click)': '_carousel.scrollPrev()',
  },
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  providers: [
    provideIcons({ lucideArrowLeft }),
    provideBrnButtonConfig({ variant: 'outline', size: 'icon' }),
  ],
  // imports: [NgIcon, HlmIcon],
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      class="size-20 shrink-0 lg:size-30"
    >
      <path
        fill="currentColor"
        d="M10.843 13.069L6.232 8.384a.546.546 0 0 1 0-.768l4.61-4.685a.55.55 0 0 0 0-.771a.53.53 0 0 0-.759 0l-4.61 4.684a1.65 1.65 0 0 0 0 2.312l4.61 4.684a.53.53 0 0 0 .76 0a.55.55 0 0 0 0-.771"
      />
    </svg>
    <span class="sr-only">Previous slide</span>
  `,
})
export class HlmCarouselPrevious {
  private readonly _button = inject(HlmButton);

  protected readonly _carousel = inject(HlmCarousel);

  public readonly userClass = input<ClassValue>('', { alias: 'class' });

  private readonly _computedClass = computed(() =>
    hlm(
      'absolute rounded-full',
      this._carousel.orientation() === 'horizontal'
        ? 'top-1/2 -left-12 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      this.userClass()
    )
  );
  protected readonly isDisabled = () => !this._carousel.canScrollPrev();

  constructor() {
    effect(() => {
      const computedClass = this._computedClass();

      untracked(() => this._button.setClass(computedClass));
    });
  }
}
