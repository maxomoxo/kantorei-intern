import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Artikel } from '../models/artikel';
import { Bestellungartikel } from '../models/bestellartikel';
import { Bestellung } from '../models/bestellung';
import { Kategorie } from '../models/kategorie';
import { Kellner } from '../models/kellner';
import { Veranstalter } from '../models/veranstalter';
import { HttpService } from './http.service';

interface CardSettings {
  title: string;
  desc: string;
  iconClass: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public arikelList: Array<Artikel>;
  public categoryList: Array<Kategorie>;
  public v_id = 0;
  public bestellungList: Bestellung[] = [];
  public kellnerList: Kellner[] = [];
  editorDropdown = [];
  artikelSettings;
  categorySettings;
  kellnerSettings;
  printingStatus = false;
  qrcode = "https://bestellung.table-dealer.com/pages/dashboard?veranstalter=0";

  public veranstalter: Veranstalter = null;  

 
  constructor(private http: HttpService, private toastrService: NbToastrService, public router: Router) { }

  checkPrintingStatus(){
    this.http.checkPrinterUrl(this.veranstalter.printerUrl).subscribe((response) => {
      this.printingStatus = true;
    },
    (error) => {                  
      this.printingStatus = false;
    });
  }

  loadVeranstalter(){
    if(this.v_id == 0){
      let veranstalter_id = localStorage.getItem('veranstalter_id');

      if ( veranstalter_id ) {
        this.v_id = parseInt(veranstalter_id);
      }
      else{
        this.router.navigate(['/login']);
      }
    }

    let authRequest = new Promise<void>((resolve, reject) => {
      this.http.findVeranstalterById(this.v_id).subscribe((veranstalter: Veranstalter)=> {
        this.qrcode = "https://bestellung.table-dealer.com/pages/dashboard?veranstalter=" + veranstalter.id;
        this.veranstalter = veranstalter;
        resolve();
      })
    });

    return authRequest;
  }

  loadCategoriesOfVeranstalter(){
    this.http.findCategoriesByVeranstalter(this.veranstalter.id).subscribe((data) =>{
      this.categoryList = data;
      this.mapEditorDropdown();
      this.initTableSettings();
    })
  }

  initTableSettings() {
    this.artikelSettings = []
    this.categorySettings = []
    this.kellnerSettings = []

    this.artikelSettings = {
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
              list: this.editorDropdown   
            }
          }
        }
      }
    };

    this.categorySettings = {
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
        }
      }
    };

    this.kellnerSettings = {
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

  loadArtikelOfVeranstalter(){
    this.http.findArtikelByVeranstalter(this.veranstalter.id).subscribe((data) =>{
      this.arikelList = data;
    })
  }

  loadBestellungenOfVeranstalter(){
    this.http.findBestellungenByVeranstalter(this.veranstalter.id).subscribe((data: Bestellung[]) =>{
      this.bestellungList = data;
      this.sortByBestellungByDate();
    });
  }

  loadKellnerOfVeranstalter(){
    this.http.findKellnerByVeranstalter(this.veranstalter.id).subscribe((data: Kellner[]) =>{
      this.kellnerList = data;
    });
  }

  sortByBestellungByDate(){
    this.bestellungList.sort((a, b) => {
      if (a.bestellzeit > b.bestellzeit) return -1;
      if (a.bestellzeit < b.bestellzeit) return 1;
      return 0;
    });
  }

  mapEditorDropdown(){
    this.editorDropdown = []

    this.categoryList.forEach((category: Kategorie) => {
      let listItem = {
        title: null,
        value: null,
      }
  
      listItem.title = category.name
      listItem.value = category.id
  
      this.editorDropdown.push(listItem)
    })
  }


  showToast(status, text, position) {
    this.toastrService.show('', text, { position, status });
  }
}
