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
import { lucideArrowRight } from '@ng-icons/lucide';
import { HlmButton, provideBrnButtonConfig } from '@spartan-ng/helm/button';
// import { HlmIcon } from '@spartan-ng/helm/icon';
import { hlm } from '@spartan-ng/helm/utils';
import type { ClassValue } from 'clsx';
import { HlmCarousel } from './hlm-carousel';

@Component({
  selector: 'button[hlm-carousel-next], button[hlmCarouselNext]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[disabled]': 'isDisabled()',
    '(click)': '_carousel.scrollNext()',
  },
  hostDirectives: [{ directive: HlmButton, inputs: ['variant', 'size'] }],
  providers: [
    provideIcons({ lucideArrowRight }),
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
        d="m5.157 13.069l4.611-4.685a.546.546 0 0 0 0-.768L5.158 2.93a.55.55 0 0 1 0-.771a.53.53 0 0 1 .759 0l4.61 4.684a1.65 1.65 0 0 1 0 2.312l-4.61 4.684a.53.53 0 0 1-.76 0a.55.55 0 0 1 0-.771"
      />
    </svg>
    <span class="sr-only">Next slide</span>
  `,
})
export class HlmCarouselNext {
  private readonly _button = inject(HlmButton);
  protected readonly _carousel = inject(HlmCarousel);
  public readonly userClass = input<ClassValue>('', { alias: 'class' });
  private readonly _computedClass = computed(() =>
    hlm(
      'absolute h-8 w-8 rounded-full',
      this._carousel.orientation() === 'horizontal'
        ? 'top-1/2 -right-12 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      this.userClass()
    )
  );
  protected readonly isDisabled = () => !this._carousel.canScrollNext();

  constructor() {
    effect(() => {
      const computedClass = this._computedClass();

      untracked(() => this._button.setClass(computedClass));
    });
  }
}
