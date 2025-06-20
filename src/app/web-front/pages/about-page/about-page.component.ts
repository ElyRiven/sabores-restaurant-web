import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { Chef } from '@front/interfaces/chef.interface';
import { ChefService } from '@front/services/chef.service';

import Swiper from 'swiper';
import { Autoplay, FreeMode } from 'swiper/modules';

import 'swiper/css';
import { Address } from '@front/interfaces/address.interface';
import { AddressService } from '@front/services/address.service';

import mapboxgl, { LngLat } from 'mapbox-gl';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit, AfterViewInit {
  #chefService = inject(ChefService);
  #addressService = inject(AddressService);

  public chefsArray: Chef[] | undefined = undefined;
  public aboutImages: string[] = [
    '/assets/photos/front/misc3.webp',
    '/assets/photos/front/misc4.webp',
    '/assets/photos/front/misc5.webp',
    '/assets/photos/front/misc6.webp',
    '/assets/photos/front/misc7.webp',
    '/assets/photos/front/misc8.webp',
    '/assets/photos/front/misc9.webp',
    '/assets/photos/front/misc10.webp',
  ];

  public selectedAddress = signal<Address | undefined>(undefined);

  public swiper: Swiper | undefined = undefined;
  public map = signal<mapboxgl.Map | undefined>(undefined);

  public swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  public mapDiv = viewChild.required<ElementRef>('mapDiv');

  ngOnInit(): void {
    const defaultAddress: Address = this.#addressService.getAddressById(1);

    console.log({ defaultAddress });

    this.chefsArray = this.#chefService.getChefs();
    this.selectedAddress.set(defaultAddress);

    this.swiperInit();
  }

  ngAfterViewInit() {
    if (!this.mapDiv()?.nativeElement) return;

    const element = this.mapDiv().nativeElement;

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [0, 0],
    });
  }

  swiperInit() {
    const swiperContainer = this.swiperDiv().nativeElement;
    if (!swiperContainer) return;

    this.swiper = new Swiper(swiperContainer, {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      spaceBetween: 10,
      allowTouchMove: false,

      freeMode: {
        enabled: true,
      },

      autoplay: {
        delay: 1500,
        waitForTransition: false,
      },

      breakpoints: {
        768: {
          slidesPerView: 3,
        },
      },

      modules: [Autoplay, FreeMode],
    });
  }

  onAddressChange(id: number) {
    const newAddress = this.#addressService.getAddressById(id);

    this.selectedAddress.set(newAddress);
  }
}
