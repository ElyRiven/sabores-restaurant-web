import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const titleAnimation = trigger('titleAnimation', [
  state(
    'initial',
    style({
      transform: 'scale(1) translateX(0)',
      color: 'var(--primary)',
    })
  ),
  state(
    'fullScreen',
    style({
      transform:
        'translateX(calc(50vw - 70%)) translateY(calc(50vh - 50%)) scale(3)',
      color: 'var(--primary-foreground)',
    })
  ),
  state(
    'fullScreenMobile',
    style({
      transform:
        'translateX(calc(50vw - 70%)) translateY(calc(50vh - 75%)) scale(2)',
      color: 'var(--primary-foreground)',
    })
  ),
  transition('* <=> *', [animate('800ms ease-out')]),
]);

export const mobileMenuAnimation = trigger('mobileMenuAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('300ms ease-in-out', style({ opacity: 0 })),
  ]),
]);
