import { Component, OnInit } from '@angular/core';
import { Bestellung } from 'app/@core/models/bestellung';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';

@Component({
  selector: 'ngx-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


  constructor(private http:HttpService,  public data: DataService) { }

  ngOnInit(): void {
  }

  getStatus(b: Bestellung){
    if(b.printed == true){
      return 'primary';
    }
    else{
      return 'danger';
    }
  }

  printBestellungManually(b: Bestellung){
    b.printed = true;
    this.http.updateBestellung(b).subscribe((result) => {
      this.data.loadBestellungenOfVeranstalter();
      this.data.showToast('success', 'Bestellung abgeschlossen!', 'bottom-right')
    })
  }
}
