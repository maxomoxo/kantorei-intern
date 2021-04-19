import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HttpService } from './http.service';
import { Signalreq } from '../models/signalreq';
import { Signalreg } from '../models/singalreg';
import { Mitglied } from '../models/mitglied';

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

  public result;
  
  public veranstalterId: string;
  public signalreq: Signalreq = {
    telnumber: "+436767411900"
  }
  public signalreg: Signalreg = {
    "captcha": "",
    "use_voice": false
  }

 
  public v_id = 0;
  
  editorDropdown = [];
  artikelSettings;
  categorySettings;
  kellnerSettings;
  printingStatus = false;
  qrcode = "https://bestellung.table-dealer.com/pages/dashboard?veranstalter=0";

  public mitglied: Mitglied = {
    name: "",
    email: "",
    passwort: ""
  };


  constructor(private http: HttpService, private toastrService: NbToastrService, public router: Router) { }


  loadMitglied() {
    if (this.v_id == 0) {
      let mitglied_id = localStorage.getItem('mitglied_id');

      if (mitglied_id) {
        this.v_id = parseInt(mitglied_id);
      }
      else {
        this.router.navigate(['/login']);
      }
    }
    let authRequest = new Promise<void>((resolve, reject) => {
      this.http.findMitgliedById(this.v_id).subscribe((mitglied: Mitglied)=> {        
        this.mitglied = mitglied;
        resolve();
      })
    });

    return authRequest;
  }

  loadVeranstalter() {
    if (this.v_id == 0) {
      let veranstalter_id = localStorage.getItem('veranstalter_id');

      if (veranstalter_id) {
        this.v_id = parseInt(veranstalter_id);
      }
      else {
        this.router.navigate(['/login']);
      }
    }
}


  showToast(status, text, position) {
    this.toastrService.show('', text, { position, status });
  }
}
