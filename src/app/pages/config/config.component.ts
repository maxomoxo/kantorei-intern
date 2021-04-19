import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/@core/utils/data.service';
import { HttpService } from 'app/@core/utils/http.service';
import { kMaxLength } from 'buffer';

@Component({
  selector: 'ngx-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

  constructor(private http:HttpService,  public data: DataService) { 
    

  }

  ngOnInit(): void {
  }

  

 
}
