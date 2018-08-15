import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { UserService} from '../user.service';
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
  mystocks = [];
  searching=false;
  buystock=false;
  currentuser = {};
  secname='';
  listingstock=true;
  sellingstock=false;
  sellstock = {symbol: '',
  buyprice: 0,
  amount: 0,
  nostocks: false,

  };
 constructor(private apiService: ApiService,
private userService: UserService) { }

  ngOnInit() {
    let o = this.apiService.getusersStock();
    o.subscribe( (response) =>{ this.mystocks = response;
      console.log("all my stox",this.mystocks);
      let o2 = this.userService.getUser();
       o2.subscribe(
         (response) => {this.currentuser = response;
        console.log("CurrentUser:",this.currentuser)
        }
       )
  
  
  
    }
    )
}
 //get the current value of a symbol 
symSubmit(symbol: string,secname: string){
 // event.preventDefault();
this.secname = secname;
console.log("Secname:",this.secname);
 this.searching=false;
this.buystock=true;
 console.log("FV",symbol)
  let observe = this.apiService.getSymbol(symbol);
  observe.subscribe(
  (response) => {
    this.stock.symbol = symbol;
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

//method that buys a stock
buyStock(event: Event,form: NgForm){
  event.preventDefault();
  console.log("Buying Stock",form.value)
 let totalspent = form.value.amount*form.value.buyprice;
  console.log("Amountspent:",totalspent);
let msgstr = "Buy " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + totalspent;
 let confirm = window.confirm(msgstr);
console.log("CONFIRM?",confirm);
 //did we say yes?
 if(confirm) {
 console.log("user confirmed yes")
  let observe = this.apiService.buyStock(form.value);
  observe.subscribe(
    (response) =>{
                 //adjust the users current "money" holdings  
                 console.log("response",response ) 
                  let o = this.userService.changeMoney(-totalspent);
                  o.subscribe(
                  (response) => {console.log(response)
                  //get updating user stats
                  let o2 = this.userService.getUser();
                  o2.subscribe(
                    (response) => {this.currentuser = response;
                   console.log("CurrentUser:",this.currentuser)
                   //get users updating stock listing
                   let o3 = this.apiService.getusersStock();
                   o3.subscribe( (response) =>{ this.mystocks = response;
                     console.log("all my stox",this.mystocks);   
                   this.buystock=false;
                    })
                    })
                  })
                  
    
    
    },
    (Error) => {
      console.log("ERROR",Error);
    }
  ) 
 }

 else {
//we cancelled
this.buystock=false;
 }


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
//method that searches our stock listing for a symbol and security name, given a partial security name
findSym(event: Event,findsym: NgForm){
event.preventDefault();
console.log(findsym.value);
this.searching=true;
let o = this.apiService.findsym(findsym.value.sym);
o.subscribe(
  (response) => {
   if(response==="nosymbol"){
    this.notfound=true;
    console.log("No symbol found!")
   }
   else { this.sym_data = response;
    this.notfound=false;
    console.log("FOUND",this.sym_data);
   }

  }
)

}
//method that sells the users stock
onSell(mystock){
console.log("CURRENT STOCK in question:",mystock);
//get the stock in questions current buy price
this.sellingstock=true;
this.sellstock=mystock;
let observe = this.apiService.getSymbol(mystock.symbol);
observe.subscribe(
(response) => {
  this.stock.symbol = mystock.symbol;
  console.log("APIRESPONSE",response);
  let foo = response;
  let last_refreshed = foo['Meta Data']['3. Last Refreshed']
  console.log(last_refreshed);
  const bar = last_refreshed.split(' ')
  console.log(bar);
 //this is actually "sellprice" fix this in the future
  this.stock.buyprice=  foo["Time Series (1min)"][last_refreshed]['4. close'];
  console.log(foo["Time Series (1min)"][last_refreshed]['4. close']);
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

sellmyStock(event,form: NgForm){
  event.preventDefault();
console.log("SELLING thIS STOCK:",form.value);
if(form.value.amount > this.sellstock.amount){
  alert("Cannot Sell more stock than you have!")
  this.sellingstock=false;
  return;
}
//prompt the user and ask the amount they would like to sell
let moneygotten = form.value.amount*form.value.sellprice;
let msgstr = "Sell " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + moneygotten;
let confirm = window.confirm(msgstr);
if(confirm) {
//sell the stock
form.value.amount=-form.value.amount;
let o = this.apiService.sellStock(form.value);
o.subscribe(
(response) => { console.log("we sold stock:",response);

//adjust "money" holdings
let o2 = this.userService.changeMoney(moneygotten);
                  o2.subscribe(
                  (response) => {console.log(response)
                  //get updating user stats
                  let o3 = this.userService.getUser();
                  o3.subscribe(
                    (response) => {this.currentuser = response;
                   console.log("CurrentUser:",this.currentuser)
                   //get users updating stock listing
                   let o4 = this.apiService.getusersStock();
                   o4.subscribe( (response) =>{ this.mystocks = response;
                     console.log("all my stox",this.mystocks);   
                     this.sellingstock=false;
                    })
                    })
                  })



})

}
//user cancelled sell
else{
  this.sellingstock=false;
}


}
}
