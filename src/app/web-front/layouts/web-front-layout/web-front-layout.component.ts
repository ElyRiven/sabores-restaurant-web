import { Component } from '@angular/core';
import { FrontNavbarComponent } from '../../components/front-navbar/front-navbar.component';
import { FrontFooterComponent } from '../../components/front-footer/front-footer.component';
import { PlaceholderComponent } from '../../components/placeholder.component';

@Component({
  selector: 'app-web-front-layout',
  imports: [FrontNavbarComponent, FrontFooterComponent, PlaceholderComponent],
  templateUrl: './web-front-layout.component.html',
})
export default class WebFrontLayoutComponent {}
