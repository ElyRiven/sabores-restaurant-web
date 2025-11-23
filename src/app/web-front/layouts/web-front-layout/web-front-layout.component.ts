import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FrontFooterComponent } from '@front/components/front-footer/front-footer.component';
import { FrontNavbarComponent } from '@front/components/front-navbar/front-navbar.component';

@Component({
  selector: 'app-web-front-layout',
  imports: [FrontNavbarComponent, FrontFooterComponent, RouterOutlet],
  templateUrl: './web-front-layout.component.html',
})
export default class WebFrontLayoutComponent {}
