import { Component, OnInit } from '@angular/core';
import { Kellner } from 'app/@core/models/kellner';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'ngx-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {
  qrcode = "https://bestellung.table-dealer.com/pages/dashboard?veranstalter=";

  constructor(private http:HttpService,  public data: DataService) { 
    this.data.kellnerSettings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        email: {
          title: 'Email'
        },
        passwort: {
          title: 'Passwort'
        }
      }
    };

  }

  ngOnInit(): void {
  }

  testPrinter(){
    this.http.printBestellung(6).subscribe(() => {
      this.data.showToast('info', 'Testseite wird gedruckt...', 'bottom-right')
    })
  }

  selfCheckout(){
    this.data.veranstalter.selfCheckout = !this.data.veranstalter.selfCheckout;
    this.updateVeranstalter();
  }

  updateVeranstalter(): void {
    this.http.updateVeranstalter(this.data.veranstalter).subscribe(() => {
      this.data.showToast('success', 'Daten aktualisiert', 'bottom-right')
      this.data.loadVeranstalter();
      this.data.checkPrintingStatus();
    })
  }

  onSaveConfirm(event): void {
    if (event.newData.name != "") {

      let kellner: Kellner = {
        email: event.newData.email,
        passwort: event.newData.passwort,
        veranstalter: this.data.veranstalter
      };


      this.http.postKellner(kellner).subscribe(() => {
        this.data.loadKellnerOfVeranstalter();
        event.confirm.resolve();
      });

    } else {
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if (event.newData.name != "") {

      let kellner: Kellner = {
        id: event.data.id,
        email: event.newData.email,
        passwort: event.newData.passwort,
        veranstalter: this.data.veranstalter
      };

      this.http.updateKellner(kellner).subscribe(() => {
        this.data.loadKellnerOfVeranstalter();
        event.confirm.resolve();
      });
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm("Willst du diesen Kellner wirklich löschen?")) {
      
      this.data.kellnerList.forEach((kellner) => {
        if (kellner.id == event.data.id) {
          this.http.deleteKellner(kellner).subscribe(() => {
            event.confirm.resolve();
            this.data.loadKellnerOfVeranstalter();
          });
        }
      });
    } else {
      event.confirm.reject();
    }
  }
}
