import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { DataService } from "./data.service";
import { AuthDTO } from "../models/dto/auth";
import { Signalreq } from "../models/signalreq";
import { Signalreg } from "../models/singalreg";
import { Mitglied } from "../models/mitglied";

@Injectable({
  providedIn: "root",
})
export class HttpService {

  SERVER_URL = 'http://localhost:8080';
  SIGNAL_URL = 'http://202.61.242.223:8080'  
  TELEGRAM_URL = 'https://api.telegram.org/bot1604480326:AAF883sbZwVfGBVRfyEPWxu5DOHv8gPn7pk'

  token;
  headers;

  constructor(public http: HttpClient) {
  }

  regNumber(signalreq: Signalreq, signalreg: Signalreg): Observable<any>{
    console.log(signalreg, signalreq);
    return this.http.post<any>(this.SIGNAL_URL + '/v1/register/' + signalreq.telnumber, signalreg);
  }

  verifyNumber(signalreq: Signalreq): Observable<any>{    
    return this.http.post<any>(this.SIGNAL_URL + '/v1/register/' + signalreq.telnumber + '{number}/verify/' + signalreq.verify, null);
  }

  sendTeleMessage(msg : String) : Observable<any> {
    return this.http.get<any>(this.TELEGRAM_URL + '/sendMessage?chat_id=-534300156&text=' + msg);
  }

  sendTelePhoto(msg : String) : Observable<any> {
    return this.http.get<any>(this.TELEGRAM_URL + '/sendPhoto?chat_id=-534300156&photo=' + msg);
  }

  getTeleUpdates() : Observable<any> {
    return this.http.get<any>(this.TELEGRAM_URL + '/getUpdates?chat_id=-534300156');
  }

  getToken(mitglied: Mitglied): Observable<AuthDTO>{
    return this.http.post<AuthDTO>(this.SERVER_URL + '/api/mitglied/jwt', mitglied);
  }


  findMitgliedById(id): Observable<Mitglied> {
    let token = localStorage.getItem('token');

    if ( token ) {
      let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
      return this.http.get<Mitglied>(this.SERVER_URL + '/api/mitglied/' + id, { headers: headers });
    }
  }


  
}
