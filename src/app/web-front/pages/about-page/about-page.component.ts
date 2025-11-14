import {
  Component,
  effect,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import mapboxgl, { LngLatLike, Marker } from 'mapbox-gl';

import type { Address } from '@front/interfaces/address.interface';
import { AddressService } from '@front/services/address.service';
import { ReviewsService } from '@front/services/reviews.service';
import { HeroSection } from '@front/components/hero-section/hero-section.component';
import { CheftsSectionComponent } from './chefts-section/chefts-section.component';
import { HlmCarouselImports } from '@spartan-ng/helm/carousel';
import { environment } from 'src/environments/environment';

import Autoplay from 'embla-carousel-autoplay';
import { HlmButtonImports } from '@spartan-ng/helm/button';

mapboxgl.accessToken = environment.mapboxkey;

@Component({
  selector: 'app-about-page',
  imports: [
    RouterLink,
    HeroSection,
    CheftsSectionComponent,
    HlmCarouselImports,
    HlmButtonImports,
  ],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {
  public readonly reviewsService = inject(ReviewsService);
  #addressService = inject(AddressService);

  public plugins = [
    Autoplay({ delay: 5000, playOnInit: true, stopOnInteraction: false }),
  ];

  public selectedAddress = signal<Address | undefined>(undefined);
  public addressArray = signal<Address[] | undefined>(undefined);
  public map = signal<mapboxgl.Map | undefined>(undefined);
  public isMapCharged = signal<boolean>(false);
  public markers = signal<Marker[]>([]);
  public mapDiv = viewChild<ElementRef>('mapDiv');

  ngOnInit(): void {
    const defaultAddress: Address = this.#addressService.getAddressById(1);
    const allAddresses: Address[] = this.#addressService.getAllAddress();

    this.selectedAddress.set(defaultAddress);
    this.addressArray.set(allAddresses);
  }

  mapInitEffect = effect(() => {
    if (this.isMapCharged()) return;

    this.mapInit();
  });

  mapInit() {
    if (!this.mapDiv()?.nativeElement) return;

    const element = this.mapDiv()!.nativeElement;
    const defaultLocation: LngLatLike = [
      this.selectedAddress()!.longitude,
      this.selectedAddress()!.latitude,
    ];

    const map = new mapboxgl.Map({
      container: element,
      style: 'mapbox://styles/mapbox/standard',
      center: defaultLocation,
      zoom: 17,

      boxZoom: false,
      doubleClickZoom: false,

      pitch: 60,
      touchPitch: true,
    });

    this.createMarkers(map);
    this.saveMap(map);
    this.isMapCharged.set(true);
  }

  createMarkers(map: mapboxgl.Map) {
    if (!this.addressArray()) return;

    for (const direction of this.addressArray()!) {
      const lngLat: LngLatLike = [direction.longitude, direction.latitude];

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

    this.selectedAddress.set(newAddress);

    this.flyToLocation(this.markers()[id - 1].getLngLat());
  }
}
