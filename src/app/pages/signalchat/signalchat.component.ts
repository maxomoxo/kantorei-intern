import { Component, HostBinding } from "@angular/core";
import { Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { HttpService } from "../../@core/utils/http.service";
import { DataService } from "../../@core/utils/data.service";

@Component({
  selector: "ngx-signalchat",
  styleUrls: ["./signalchat.component.scss"],
  templateUrl: "./signalchat.component.html",
})
export class SignalchatComponent {
  
  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;

  
  messages: any[];

  
  constructor(private router: Router, private http: HttpService,private fb: FormBuilder, public data: DataService) {
    
  }

  ngOnInit() {
    this.secondForm = this.fb.group({
      secondNr: ['', Validators.required],
      secondName: ['', Validators.required],
    });
  }

  toggle(checked: boolean) {
    this.data.signalreg.use_voice = checked;
  }

  getToggle() {
    if (this.data.signalreg.use_voice) {
      return "Sie werden eine Anruf erhalten"
    } else {
      return "Sie werden eine SMS erhalten"
    }
  }

  secondSubmit() {
    this.http.regNumber(this.data.signalreq, this.data.signalreg).subscribe(() => {
      console.log("sent");
    });
  }

  thirdSubmit() {
    this.http.verifyNumber(this.data.signalreq).subscribe(() => {
      console.log("verify ok");
    });
  }

  onSecondSubmit() {
    this.secondForm.markAsDirty();
  }

  

  wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }

  resetStepper(){
    
  }


  backToDash() {
    this.router.navigate(['pages/chat'])
  }



}



