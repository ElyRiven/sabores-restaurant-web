import { TitleCasePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';

import Swiper from 'swiper';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-coverflow';

import { MenuService } from '@front/services/menu.service';

@Component({
  selector: 'app-home-page',
  imports: [TitleCasePipe],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements AfterViewInit {
  #menuService = inject(MenuService);

  public entries = this.#menuService.getEntries();

  public swiper: Swiper | undefined = undefined;
  public swiperDiv = viewChild.required<ElementRef>('swiperDiv');

  ngAfterViewInit(): void {
    this.swiperInit();
  }

  swiperInit() {
    const swiperContainer = this.swiperDiv().nativeElement;
    if (!swiperContainer) return;

    this.swiper = new Swiper(swiperContainer, {
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
      effect: 'coverflow',

      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
      },

      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },

      modules: [Navigation, Pagination, EffectCoverflow],

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }
}
