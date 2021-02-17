import { Component, Input, OnInit } from '@angular/core';
import { Artikel } from 'app/@core/models/artikel';
import { Bestellungartikel } from 'app/@core/models/bestellartikel';
import { Bestellung } from 'app/@core/models/bestellung';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';

@Component({
  selector: 'ngx-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  @Input() bestellung: Bestellung;
  currentList: Bestellungartikel[] = [];
  gesamtsumme = 0;
  stat = 'primary';

  constructor(private http: HttpService,  public data: DataService) { 
  }

  ngOnInit(): void {
    this.loadBestellungsartikel();
  }

  loadBestellungsartikel(){
    this.http.findBestellungArtikelByBestellung(this.bestellung.id).subscribe((bestellartikel: Bestellungartikel[]) => {
      this.currentList = bestellartikel;
      this.calcSum();
    });
  }

  calcSum(){
    this.currentList.forEach((ba)=> {
      this.gesamtsumme += (ba.menge * ba.artikel.preis); 
    })
  }
}
