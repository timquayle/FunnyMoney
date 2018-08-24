import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import {Chart} from 'chart.js';
import {Dailyhl} from '../models/dailyhl';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
 chart = [];
mygnldata = [];
mysymbols = [];
dailyhl: Dailyhl = new Dailyhl;
dailyhlarray = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    //get all symbols in our portfolio
    let o = this.apiService.getallUsergnl();
    o.subscribe( (response) =>{ this.mysymbols = response;
      console.log("all my symbols",this.mysymbols);
     let o2 = this.apiService.getallUsergnldata();
     o2.subscribe( (response) =>{ this.mygnldata = response;
      console.log("all my gains and losses data",this.mygnldata);
 //step 1 --get all 'distinct' 'date' values from the array
   let unique = {};
   let dates = [];
this.mygnldata.forEach(function (x) {
  if (!unique[x.date]) {
    dates.push(x.date);
    unique[x.date] = true;
  }
});
console.log("YOURDATES",dates);
let dlength = dates.length;
var foo =[];

console.log("DATES count",dlength)
 //step 2 --build new arrays based on these dates, populate these arrays based on date==collected dates
  //retain our parent scope as we dive down furter into callback hell
    let self=this;
  dates.forEach(function (dat) {
  
  let temparray = [];
  self.mygnldata.forEach(function (el) {
      //load each dates gains and losses into its own array
          if(el.date === dat){
                    temparray.push(el);
                           }
      });
      //sort our array ascending 
      console.log("TA",temparray);
      temparray.sort(function (a, b) {
       
        return a.netgnl - b.netgnl;
      }); 
     //load our object with our sorted values
     self.dailyhl = new Dailyhl();
     let arrlength = temparray.length;
      self.dailyhl.date = temparray[0].date;
      self.dailyhl.symlow = temparray[0].symbol;
      self.dailyhl.symlowvalue = temparray[0].netgnl;
      self.dailyhl.symhigh = temparray[arrlength -1].symbol;
      self.dailyhl.symhighvalue = temparray[arrlength -1].netgnl;
     //push our object into an array
      self.dailyhlarray.push(self.dailyhl);
      console.log("AR",self.dailyhlarray);
    
    })

    



   })
    })
    
  
  }

}
