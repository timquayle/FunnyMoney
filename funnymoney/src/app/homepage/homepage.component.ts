import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { UserService} from '../user.service';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {Stock} from '../models/stock';
import * as $ from 'jquery';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {  ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
declare var jQuery: any;
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: [ './homepage.component.css' ],
  encapsulation: ViewEncapsulation.None
})

export class HomepageComponent implements OnInit {
 selldata={};
 moneygotten = 0;
  invalidstr = '';
  totalspent = 0;
  bfdata ={};
  confirmbuy=false;
  confirmsell=false;
  displaysell="none";
  displaybuy="none";
  displayiv="none";
  msgstr = '';
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
  currentuser = {
    money: 0
  };
  secname='';
  listingstock=true;
  sellingstock=false;
  
  sellstock = {symbol: '',
  buyprice: 0,
  amount: 0,
  nostocks: false,

  };
 constructor(private apiService: ApiService,
private userService: UserService,
private router: Router) { }
  
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
 
 //console.log("length:",symlength);
 //filter "." in our symbol
 let fsym=this.filtsym(symbol);
console.log("FILTSYM",fsym);
console.log("FV",symbol)
  let observe = this.apiService.getSymbol(fsym);
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
  console.log("THISUSER,",this.currentuser);
  console.log("Buying Stock",form.value)
 this.totalspent = form.value.amount*form.value.buyprice;
  console.log("Amountspent:",this.totalspent);
  if(form.value.amount < 1){
   // alert("Amount cannot be less than 1 share, asshat")
  this.invalidstr = "Amount cannot be less than 1 share, asshat";
  this.displayiv="block"; 
  this.buystock=false;
    return;
  }
  if(this.currentuser.money < this.totalspent) {
    this.invalidstr = "Insufficient Funds, You cannot spend more than you have";
    this.displayiv="block"; 
  this.buystock=false;
  return;
}
 this.msgstr = "Buy " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + this.totalspent;
 //enable your buy stock modal on the form, change display to something more specific
 this.displaybuy="block"; 
 this.bfdata=form.value;
 //let confirm = window.confirm(this.msgstr);
console.log("CONFIRM?",this.confirmbuy);
console.log("ADATA",form.value);
//did we say yes?
 


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
/*
getusergnl(){
  let o = this.apiService.getuserDailyGnL("5b6372c33ec8221a24da48f9","2018-08-08");
  o.subscribe(
    (response) => {this.daily_totals = response;
      console.log("Tim's totals:",this.daily_totals);}
  )
} */
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
let fsym=this.filtsym(mystock.symbol);
console.log("FILTERED",fsym)
let observe = this.apiService.getSymbol(fsym);
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
if(form.value.amount < 0){
  // alert("Amount cannot be less than 1 share, asshat")
 this.invalidstr = "Amount cannot be less than 1 share, asshat";
 this.displayiv="block"; 
 this.sellingstock=false;
   return;
 }
if(form.value.amount > this.sellstock.amount){
 // alert("Cannot Sell more stock than you have!")
  this.invalidstr = "Cannot Sell more stock than you have!";
   this.displayiv="block"; 
  this.sellingstock=false;
  return;
}
 if(isNaN(form.value.amount))
 {
  this.invalidstr = "Invalid Number!";
  this.displayiv="block"; 
 this.sellingstock=false;
 return;
 }
//prompt the user and ask the amount they would like to sell
this.moneygotten = form.value.amount*form.value.sellprice;
 this.msgstr = "Sell " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + this.moneygotten;
 this.displaysell="block";
 //let confirm = window.confirm(msgstr);
 form.value.amount=-form.value.amount;
 this.selldata=form.value;
 if(0) {
//sell the stock

let o = this.apiService.sellStock(form.value);
o.subscribe(
(response) => { console.log("we sold stock:",response);

//adjust "money" holdings
let o2 = this.userService.changeMoney(this.moneygotten);
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
logOff(event: Event){
  console.log("LOGOFF CLICKED!")
  event.preventDefault();
  let ob =  this.userService.removeSessionid()
   ob.subscribe(
   (response) =>{

       console.log('returned',response);
       this.router.navigate(['/']); 
      },

   (Error) =>
    { console.log("Error",Error);  }


   )
    
    

}
onCloseHandlediv(){
  this.displayiv="none";
}
onCloseHandledbuy(){
  this.displaybuy="none";
  this.confirmbuy=false;
  this.buystock=false;
}
onCloseHandledsell(){
  this.displaysell="none";
  this.sellingstock=false;
  
}
buyConfirm(){
  this.confirmbuy=true;
  this.displaybuy="none";
  console.log("GDATA",this.bfdata);
 let observe = this.apiService.buyStock(this.bfdata);
  observe.subscribe(
    (response) =>{
                 //adjust the users current "money" holdings  
                 console.log("response",response ) 
                  let o = this.userService.changeMoney(-this.totalspent);
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
sellConfirm(){
let o = this.apiService.sellStock(this.selldata);
o.subscribe(
(response) => { console.log("we sold stock:",response);

//adjust "money" holdings
let o2 = this.userService.changeMoney(this.moneygotten);
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
                     this.displaysell="none";
                     this.sellingstock=false;
                    })
                    })
                  })



})

}
filtsym(symbol) {
let symlength=symbol.length;
 let fsym='';
 console.log("length:",symlength);
 //filter "." in our symbol
 for(let y=0;y<symlength;y++){
   if(symbol[y]==="."){
   null;
   }
   else {
   fsym+=symbol[y];
   console.log("JJ",y);
   }
 }
return fsym;
}
}
