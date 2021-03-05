import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { Kellner } from "../models/kellner";
import { Veranstalter } from "../models/veranstalter";
import { Bestellung } from "../models/bestellung";
import { Artikel } from "../models/artikel";
import { Bestellungartikel } from "../models/bestellartikel";
import { Kategorie } from "../models/kategorie";
import { AuthDTO } from "../models/dto/auth";
import { Signalreq } from "../models/signalreq";
import { Signalreg } from "../models/singalreg";

@Injectable({
  providedIn: "root",
})
export class HttpService {

  SERVER_URL = 'http://localhost:8080';
  SIGNAL_URL = 'http://202.61.242.223:8080'
  token;
  headers;
  kellner;

  constructor(public http: HttpClient) {
  }

  regNumber(signalreq: Signalreq, signalreg: Signalreg): Observable<any>{
    console.log(signalreg, signalreq);
    return this.http.post<any>(this.SIGNAL_URL + '/v1/register/' + signalreq.telnumber, signalreg);
  }

  verifyNumber(signalreq: Signalreq): Observable<any>{    
    return this.http.post<any>(this.SIGNAL_URL + '/v1/register/' + signalreq.telnumber + '{number}/verify/' + signalreq.verify, null);
  }



  getToken(veranstalter: Veranstalter): Observable<AuthDTO>{
    return this.http.post<AuthDTO>(this.SERVER_URL + '/api/mitglied/jwt', veranstalter);
  }

  
  findArtikelByVeranstalter(id: number): Observable<Artikel[]> {
    let token = localStorage.getItem('token');
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Artikel[]>(this.SERVER_URL + '/api/artikel/byVeranstalter/' + id, { headers: headers });
    }
  } 

  findCategoriesByVeranstalter(id: number): Observable<Kategorie[]> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Kategorie[]>(this.SERVER_URL + '/api/kategorie/byVeranstalter/' + id, { headers: headers });
    }
  } 

  findKellnerByVeranstalter(id: number): Observable<Kategorie[]> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Kategorie[]>(this.SERVER_URL + '/api/kellner/byVeranstalter/' + id, { headers: headers });
    }
  } 

  findKellnerById(id: number): Observable<Kellner> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Kellner>(this.SERVER_URL + '/api/kellner/' + id, { headers: headers });
    }
  }

  findVeranstalterById(id): Observable<Veranstalter> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Veranstalter>(this.SERVER_URL + '/api/veranstalter/' + id, { headers: headers });
    }
  }

  findBestellungenByVeranstalter(id): Observable<Bestellung[]> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Bestellung[]>(this.SERVER_URL + '/api/bestellung/byVeranstalter/' + id, { headers: headers });
    }
  }

  findBestellungArtikelByBestellung(id): Observable<Bestellungartikel[]> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Bestellungartikel[]>(this.SERVER_URL + '/api/bestellartikel/byBestellung/' + id, { headers: headers });
    }
  }

  checkPrinterUrl(url: string) {
    return this.http.get(url, {responseType: 'text'});
  }

  updateArtikel(artikel: Artikel): Observable<Artikel>{
    let token = localStorage.getItem('token');
    
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.put<Artikel>(this.SERVER_URL + '/api/artikel', artikel, { headers: headers });
    }
  }

  updateBestellung(bestellung: Bestellung): Observable<Bestellung>{
    let token = localStorage.getItem('token');
    
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.put<Bestellung>(this.SERVER_URL + '/api/bestellung', bestellung, { headers: headers });
    }
  }

  updateKellner(kellner: Kellner): Observable<Kellner>{
    let token = localStorage.getItem('token');
    
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.put<Kellner>(this.SERVER_URL + '/api/kellner', kellner, { headers: headers });
    }
  }

  updateVeranstalter(veranstalter: Veranstalter): Observable<Veranstalter>{
    let token = localStorage.getItem('token');
    
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.put<Veranstalter>(this.SERVER_URL + '/api/veranstalter', veranstalter, { headers: headers });
    }
  }

  updateKategorie(kategorie: Kategorie): Observable<Kategorie>{
    let token = localStorage.getItem('token');
    
    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.put<Kategorie>(this.SERVER_URL + '/api/kategorie', kategorie, { headers: headers });
    }
  }

  postArtikel(artikel: Artikel): Observable<Artikel>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Artikel>(this.SERVER_URL + '/api/artikel', artikel, { headers: headers });
    }
  }

  postKategorie(kategorie: Kategorie): Observable<Kategorie>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Kategorie>(this.SERVER_URL + '/api/kategorie', kategorie, { headers: headers });
    }
  }  

  postKellner(kellner: Kellner): Observable<Kellner>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Kellner>(this.SERVER_URL + '/api/kellner/create', kellner, { headers: headers });
    }
  }  

  postVeranstalter(veranstalter: Veranstalter): Observable<Veranstalter>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Veranstalter>(this.SERVER_URL + '/api/veranstalter/create', veranstalter, { headers: headers });
    }
  }  

  postBestellung(bestellung: Bestellung): Observable<Bestellung>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Bestellung>(this.SERVER_URL + '/api/bestellung', bestellung, { headers: headers });
    }
  }
  
  postBestellungartikel(ba: Bestellungartikel): Observable<Bestellungartikel>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.post<Bestellungartikel>(this.SERVER_URL + '/api/bestellartikel', ba, { headers: headers });
    }
  }

  deleteArtikel(artikel: Artikel): Observable<Artikel>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.delete<Artikel>(this.SERVER_URL + '/api/artikel/' + artikel.id, { headers: headers });
    }
  }

  deleteKellner(kellner: Kellner): Observable<Kellner>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.delete<Kellner>(this.SERVER_URL + '/api/kellner/'+ kellner.id, { headers: headers });
    }
  }  

  
  deleteKategorie(kategorie: Kategorie): Observable<Kategorie>{
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.delete<Kategorie>(this.SERVER_URL + '/api/kategorie/' + kategorie.id, { headers: headers });
    }
  }

  printBestellung(id): Observable<Bestellung> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Bestellung>(this.SERVER_URL + '/api/bestellung/print/' + id, { headers: headers });
    }
  }

  
}
