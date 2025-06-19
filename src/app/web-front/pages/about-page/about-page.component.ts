import { Component, inject, OnInit } from '@angular/core';
import { Chef } from '@front/interfaces/chef.interface';
import { ChefService } from '@front/services/chef.service';

@Component({
  selector: 'app-about-page',
  imports: [],
  templateUrl: './about-page.component.html',
})
export class AboutPageComponent implements OnInit {
  #chefService = inject(ChefService);

  public chefsArray: Chef[] | null = null;

  ngOnInit(): void {
    this.chefsArray = this.#chefService.getChefs();
  }
}
