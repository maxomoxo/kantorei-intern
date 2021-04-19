import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mitglied } from 'app/@core/models/mitglied';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: String;
  password: String;

  constructor(private data: DataService, private http: HttpService, public router: Router) { }

  ngOnInit(): void {
  }

  authenticate(){
    let mitglied: Mitglied = {
      email: this.email,
      passwort: this.password
    };
   
    this.http.getToken(mitglied).subscribe(data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('mitglied_id', data.id.toString());
        
        this.data.showToast('success', 'Erfolgreich eingeloggt.', 'bottom-end');
        this.data.v_id = data.id;
        this.router.navigate(['/pages/home']);
      },
      (err: Error) => {
        this.data.showToast('danger', 'Mitglied nicht registriert.', 'bottom-end');
      });
    };
  }


