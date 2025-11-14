import { Component, inject } from '@angular/core';

import { ChefService } from '@front/services/chef.service';

@Component({
  selector: 'chefts-section',
  imports: [],
  templateUrl: './chefts-section.component.html',
})
export class CheftsSectionComponent {
  readonly chefsService = inject(ChefService);
}
