import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';

import mapboxgl, { LngLatLike, Marker } from 'mapbox-gl';
import Swiper from 'swiper';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';

import { Chef } from '@front/interfaces/chef.interface';
import { ChefService } from '@front/services/chef.service';
import { Address } from '@front/interfaces/address.interface';
import { AddressService } from '@front/services/address.service';
import { environment } from 'src/environments/environment';

mapboxgl.accessToken = environment.mapboxkey;

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

  public swiper: Swiper | undefined = undefined;

  public selectedAddress = signal<Address | undefined>(undefined);
  public addressArray = signal<Address[] | undefined>(undefined);
  public map = signal<mapboxgl.Map | undefined>(undefined);
  public markers = signal<Marker[]>([]);

  public swiperDiv = viewChild.required<ElementRef>('swiperDiv');
  public mapDiv = viewChild.required<ElementRef>('mapDiv');

  ngOnInit(): void {
    const defaultAddress: Address = this.#addressService.getAddressById(1);
    const allAddresses: Address[] = this.#addressService.getAllAddress();

    this.chefsArray = this.#chefService.getChefs();

    this.selectedAddress.set(defaultAddress);
    this.addressArray.set(allAddresses);

    this.swiperInit();
  }

  ngAfterViewInit() {
    if (!this.mapDiv()?.nativeElement) return;

    const element = this.mapDiv().nativeElement;
    const defaultLocation: LngLatLike = [
      this.selectedAddress()!.longitude,
      this.selectedAddress()!.latitude,
    ];

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/standard',
      center: defaultLocation,
      zoom: 17,

      scrollZoom: false,
      boxZoom: false,
      doubleClickZoom: false,
      dragPan: false,

      pitch: 60,
      touchPitch: true,
    });

    this.createMarkers(map);
    this.saveMap(map);
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

  createMarkers(map: mapboxgl.Map) {
    if (!this.addressArray()) return;

    for (const direction of this.addressArray()!) {
      const lngLat: LngLatLike = [direction.longitude, direction.latitude];

      console.log('marker', lngLat);

      const mapboxMarker = new mapboxgl.Marker({
        color: '#fe5d26',
      })
        .setLngLat(lngLat)
        .addTo(map);

      this.markers.update((markers) => [...markers, mapboxMarker]);
    }
  }

  saveMap(map: mapboxgl.Map) {
    this.map.set(map);
  }

  flyToLocation(location: LngLatLike) {
    if (!this.map()) return;

    this.map()!.flyTo({
      center: location,
      zoom: 17,
    });
  }

  locationChange(id: number) {
    const newAddress = this.#addressService.getAddressById(id);

    console.log({ newAddress });

    this.selectedAddress.set(newAddress);

    this.flyToLocation(this.markers()[id - 1].getLngLat());
  }
}
