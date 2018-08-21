import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import {Chart} from 'chart.js';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-symgraph',
  templateUrl: './symgraph.component.html',
  styleUrls: ['./symgraph.component.css']
})
export class SymgraphComponent implements OnInit {
  stockhist = [];
  currentsymbol = '';
  chart = [];
  days = [];
  stockdata = [];
  stockbm = {};
  constructor(private apiService: ApiService,
    private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( params => {
   console.log("PARAMETER",params.get('symbol'));
   let symbol = params.get('symbol');
    
    let obs = this.apiService.getsymStockdata(symbol)
   //get daily net gains and losses for stock
    obs.subscribe( (response) => {this.stockbm = response
      console.log("THIS STOCK:",this.stockbm);
      let o = this.apiService.getuserSymgnl(symbol)
   
   
      o.subscribe( (response) =>{ this.stockhist = response;
      this.currentsymbol = this.stockhist[0].symbol;
      console.log("stock history",this.stockhist);
      this.stockhist.forEach( 
        (day) => {
        this.days.push(day.date);
        this.stockdata.push(day.netgnl);
    
    
    
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.days,
          datasets: [
            {
              data: this.stockdata,
              borderColor: 'fffff',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
             display: true
           }],
          }
        }
       })
 
 
 
 
    }) 
})
})
})
}
}

