import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import {Chart} from 'chart.js';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
 chart = [];
mygnls = [];
mysymbols = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let o = this.apiService.getallUsergnl();
    o.subscribe( (response) =>{ this.mysymbols = response;
      console.log("all my stox",this.mysymbols);
      console.log("0 stock",this.mygnls[0]);

      
  }
    )
  
  }

}
