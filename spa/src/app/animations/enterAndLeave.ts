import { animate, style, transition } from '@angular/animations';

export const simpleFade = (duration: string) => [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateX(-50px)',
    }),
    animate(
      duration + ' cubic-bezier(0.18, 0.89, 0.32, 1)',
      style({
        opacity: 1,
        transform: 'translateX(0px)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      duration + ' cubic-bezier(0.18, 0.89, 0.32, 1)',
      style({
        opacity: 0,
        transform: 'translateX(-50px)',
      })
    ),
  ]),
];
