import { Component } from '@angular/core';
import { DataService } from 'app/@core/utils/data.service';

import { MENU_ITEMS } from './pages-menu';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;

  constructor(private data: DataService){
    
    this.data.loadVeranstalter();
    /*then(() => {
      this.data.loadArtikelOfVeranstalter();
      this.data.loadCategoriesOfVeranstalter();
      this.data.loadBestellungenOfVeranstalter();
      this.data.loadKellnerOfVeranstalter();
      this.data.checkPrintingStatus();
    });*/
  }
}
