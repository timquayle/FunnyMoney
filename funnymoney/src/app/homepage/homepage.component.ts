import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Stock} from '../models/stock';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
 current_price: number = 0;
  responseError=false;
  validResponse=false;
  symbol: string = "";
  symbols = [];
  stock: Stock = new Stock();
  users_stock = [];
  daily_totals = [];
  sym_data;
  notfound=false;
  daily_total = [];
 constructor(private apiService: ApiService) { }

  ngOnInit() {
  
}
  symSubmit(event: Event,form: NgForm){
  event.preventDefault();
  console.log("FV",form.value)
  let observe = this.apiService.getSymbol(form.value.symb);
  observe.subscribe(
  (response) => {
    this.stock.symbol = form.value.symb;
    this.validResponse=true;
    this.responseError=false;
    console.log("APIRESPONSE",response);
    let foo = response;
    let last_refreshed = foo['Meta Data']['3. Last Refreshed']
    console.log(last_refreshed);
    const bar = last_refreshed.split(' ')
    console.log(bar);
    this.stock.buyprice=  foo["Time Series (1min)"][last_refreshed]['1. open'];
    console.log(foo["Time Series (1min)"][last_refreshed]['1. open']);
   // foo[bar])
  },
  (Error) => {
  if(Error){
  this.responseError=true;
  }
    console.log("APIERROR",Error)
  }

  ) 




}


buyStock(event: Event,form: NgForm){
  event.preventDefault();
  console.log("Buying Stock",form.value)
  let observe = this.apiService.buyStock(form.value);
  observe.subscribe(
    (response) =>{
      console.log("response",response )  },
    (Error) => {
      console.log("ERROR",Error);
    }
  )
}
 getSymbols(){
  let observe = this.apiService.getSymbols();
  observe.subscribe(
    (response) =>{
     //this.symbols = response;
      console.log("response") 
     this.symbols=response;
     console.log(this.symbols);
     
    },
    (error) =>{
    console.log(error)

    }
  )
  }
  getSymbolsValues(){
console.log("GSV");
//gets every symbol in your stocks database, and gets the 'closing' value for them, then writes this data to 
// daily_totals
this.symbols.forEach( 
  (element) => {
  console.log(element.symbol);
  let observe = this.apiService.getSymbol(element.symbol);
  observe.subscribe(
   (response) => {
    console.log(response);
    let symbol_object =  this.getPrice(response, "close")
    symbol_object.symbol = element.symbol;
    console.log('CURRENT PRICE ',symbol_object.symbol, symbol_object.curprice, symbol_object.datestring);
      let o2 = this.apiService.updateDailytotals(symbol_object);
      o2.subscribe(
       (response) => {
         console.log("WRITE RETURN",response);
       },
        (Error) => {console.log("ERROR_WRITE?",Error) }

      )
    
    }


               )


});
  
  }
  getPrice(response, price_type){
    let foo = response;
    let last_refreshed = foo['Meta Data']['3. Last Refreshed']
    let curprice=0;
    let symbol_object = {
      symbol: '',
      curprice: 0,
      datestring: '',
    }
    console.log(last_refreshed);
    const bar = last_refreshed.split(' ')
    console.log(bar);
    if(price_type==="open"){
    curprice =  foo["Time Series (1min)"][last_refreshed]['1. open'];
    console.log(curprice);
    }
    else if (price_type==="close"){
    curprice =  foo["Time Series (1min)"][last_refreshed]['4. close'];
      console.log(curprice);
    }
   //returned price
    symbol_object.curprice = curprice;
   //datestring of symbol price returned
    symbol_object.datestring = bar[0];
    return symbol_object;
  }

gainsLosses(){
 //get all of the users current stock along with amount
  let o = this.apiService.getusersStock();
  o.subscribe(
   (response) => {
                  this.users_stock = response;
                  console.log("USERSSTOCK:",this.users_stock)
                 //get our daily tally totals for every stock symbol in the system
                  let o2 = this.apiService.getdailyTotals();
                   o2.subscribe(
                  (response) => {
                              this.daily_totals = response;  
                               console.log("DT",this.daily_totals);
                                  this.users_stock.forEach( 
                                    (eachstock) => {
                                                    console.log("LOOPING thROUGH USERS STOCK",eachstock);
                                                    let gnl =  this.calcGainLoss(eachstock,this.daily_totals)
                                                    console.log("gnl_obj",gnl);
                                                    let o3 = this.apiService.updateDailyGnL(gnl);   
                                                    o3.subscribe(
                                                     (response) => { console.log("DONEWRITING",response);}

                                                                )

                                                     } )
                               
                                },

                  (Error) => {console.log(Error)}

                               )
  
  
                },
  
   (Error) => {console.log(Error)}
  )
  
  
}
calcGainLoss(stock_obj,daily_totals = []){
let gnl_obj = {
  userid: '',
  symbol: '',
  date: '',
  netgnl: 0
}
  let symbol = stock_obj.symbol;
let amount = stock_obj.amount;
let buyprice = stock_obj.buyprice;
let userid = stock_obj.userid;
console.log("GNL",symbol, amount, buyprice )
let j = daily_totals.find(o => o.symbol === symbol);
console.log("NETGL",(j.closeprice - buyprice)*amount);
gnl_obj.userid = userid;
gnl_obj.symbol = symbol;
gnl_obj.date = j.date;
gnl_obj.netgnl = (j.closeprice - buyprice)*amount;
return gnl_obj;
}

getusergnl(){
  let o = this.apiService.getuserDailyGnL("5b6372c33ec8221a24da48f9","2018-08-08");
  o.subscribe(
    (response) => {this.daily_totals = response;
      console.log("Tim's totals:",this.daily_totals);}
  )
}
findSym(event: Event,findsym: NgForm){
event.preventDefault();
console.log(findsym.value);
let o = this.apiService.findsym(findsym.value.sym);
o.subscribe(
  (response) => {
   if(response==="nosymbol"){
    this.notfound=true;
    console.log("No symbol found!")
   }
   else { this.sym_data = response;
    this.notfound=false;
    console.log("FOUND",this.sym_data.symbols);
   }

  }
)

}

}
