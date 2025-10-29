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
