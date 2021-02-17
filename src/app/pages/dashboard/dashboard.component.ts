import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { takeWhile } from 'rxjs/operators' ;
import { timingSafeEqual } from "crypto";
import { HttpService } from "app/@core/utils/http.service";
import { DataService } from "app/@core/utils/data.service";
import { LocalDataSource } from "ng2-smart-table";
import { SmartTableData } from "app/@core/data/smart-table";
import { Kategorie } from "app/@core/models/kategorie";
import { Artikel } from "app/@core/models/artikel";

interface CardSettings {
  title: string;
  desc: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: "ngx-dashboard",
  styleUrls: ["./dashboard.component.scss"],
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent{

  constructor(public dataService: DataService, private http: HttpService, private service: SmartTableData
              ) {
      this.dataService.artikelSettings = {
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
          name: {
            title: 'Name'
          },
          preis: {
            title: 'Preis'
          },
          kategorie: {
            title: 'Kategorie',
            valuePrepareFunction: (data) => {
              return data.name;
            },
            editor: {
              type: 'list',
              config: {
                list: this.dataService.editorDropdown   
              }
            }
          }
        }
      };
  }

  onSaveConfirm(event): void {
    if(event.newData.name != "" && event.newData.preis != "" && event.newData.kategorie != ""){
      let eventKategorie: Kategorie = {
        id: parseInt(event.newData.kategorie)
      }
  
      let artikel: Artikel = {
        name: event.newData.name,
        preis: parseFloat(event.newData.preis),
        veranstalter: this.dataService.veranstalter,
        kategorie: eventKategorie
      };
  
      this.http.postArtikel(artikel).subscribe(()=>{
        this.dataService.loadArtikelOfVeranstalter();
        event.confirm.resolve();
      })
    }
    else{
      event.confirm.reject();
    }
  }

  onEditConfirm(event): void {
    if(event.newData.name != "" && event.newData.preis != "" && event.newData.kategorie != ""){
      let eventKategorie: Kategorie;

      if(isNaN(event.newData.kategorie)){
        eventKategorie = {
          id: 2
        }
      }
      else{
        eventKategorie ={
          id: parseInt(event.newData.kategorie)
        }
      }

      let artikel: Artikel = {
        id: event.data.id,
        name: event.newData.name,
        preis: parseFloat(event.newData.preis),
        veranstalter: this.dataService.veranstalter,
        kategorie: eventKategorie
      };

      this.http.updateArtikel(artikel).subscribe(()=>{
        this.dataService.loadArtikelOfVeranstalter();
        event.confirm.resolve();
      })
    }
    else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Willst du dieses Produkt wirklich löschen?')) {
      this.dataService.arikelList.forEach((artikel) => {
        if(artikel.id == event.data.id){
          this.http.deleteArtikel(artikel).subscribe(()=>{
            event.confirm.resolve();
            this.dataService.loadArtikelOfVeranstalter();
          })
        }
      })
    } else {
      event.confirm.reject();
    }
  }
}
