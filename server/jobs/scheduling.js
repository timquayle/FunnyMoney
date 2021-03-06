const Stocks = require("../models/stock.js");
const Daily = require("../models/dailytotal.js");
const Users = require("../models/user.js");
const DailyGnL = require("../models/dailygnl.js");
const schedule = require('node-schedule');
const axios = require('axios');
const apikey= "614CAY3S4WQVWX15";
//const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + element.symbol + '&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json';

//    *    *    *    *    *
//┬    ┬    ┬    ┬    ┬    ┬
//│    │    │    │    │    │
//│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
//│    │    │    │    └───── month (1 - 12)
//│    │    │    └────────── day of month (1 - 31)
//│    │    └─────────────── hour (0 - 23)
//│    └──────────────────── minute (0 - 59)
//└───────────────────────── second (0 - 59, OPTIONAL)

//scheduled job, will run at 3pm PST and get all daily closing values for all stocks in the system, and store them in dailytotal table
module.exports = function(app) {
  dailyclosing = schedule.scheduleJob('0 15 * * 1-5', function(){
//1 get all the symbols in the system
Stocks.distinct("symbol")
.then(stocks =>{ const all_symbols = stocks;
                 console.log('allsymb',all_symbols);
             //2 get the closing values for each symbol in our system  
                 all_symbols.forEach( 
                    (element) => {
                     let felement =  filtsym(element);
                     console.log("FILTERED:",felement);
                      console.log("CURRENTSTOCK",element);
            //3 get the current value of each symbol in our system
 url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + felement + '&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json';
             //get our api data using a retry function, because well.. they suck..but its free.
 getSymvalue(url,10,500,10000,felement,function(err, data) {
                    if(err){
                      console.log("we have error!",err)
                    }
                    else{
                       console.log("DATASTATUS",data.status);
            //4 get the current price from our returned json string            
                          // console.log("--GETTING PRICE--",data);
                           let symbol_object =  getPrice(data, "close",element)
                           symbol_object.symbol = element;
                           console.log("SO",symbol_object);
            //5 write our closing values to our daily totals table(collection)  
         const daily = new Daily({symbol: symbol_object.symbol,closeprice: symbol_object.curprice, date: symbol_object.datestring  })
            Daily.create(daily)
           .then(daily=> console.log(daily))
            .catch(console.log);
                    }
                                              
                  });

                })
//.catch(console.log);  //catch to get all symbols find
})

})
//scheduled job, will run at 3:30 PST and calculate all users daily net/gains and losses and store them in dailyGnL table
const gnlcalc = schedule.scheduleJob('30 15 * * 1-5', function(){
  url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=T&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json';
  getSymvalue(url,10,500,10000,"T",function(err, data) {
    if(err){
      console.log("we have error!",err)
    }
    else{
      console.log("--GETTING DATE--");
      let symbol_object =  getPrice(data, "close")
     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!DATEINFUNC:", symbol_object.datestring);
     todaysdate = symbol_object.datestring;          
     console.log("-----TODAY'S DATE----",todaysdate);
      //const gnlcalc = schedule.scheduleJob('30 * * * * *', function(){
  //0 get all userids in the system
  Users.find({},{userid: 1})
  .then(users=>{let currentusers=users; console.log("USERS:",currentusers);
  //1. get all of the users current stock along with amount(later version get all users stock )
  currentusers.forEach( 
    (user) => {
  console.log("getting users stock portfolio");
  Stocks.find({userid: user._id})
    .then(stocks =>{ let user_stocks=stocks;
         console.log("FOUNDSTOCKS:",user_stocks);
          //2.get our daily tally totals for every stock symbol in the system
          Daily.find({date: todaysdate},{})
         .then(dailytot =>{   const daily_totals=dailytot;    console.log("ALLStoX",daily_totals)
  //3. Loop through users stock, writing each gains and losses data into dailygnl table
         user_stocks.forEach( 
            (eachstock) => {
                           console.log("LOOPING thROUGH USERS STOCK",eachstock);
                            let gnl =  calcGainLoss(eachstock,daily_totals)
                            console.log("gnl_obj",gnl);
                //     4. store each gain or loss value in the DailyGNL table
                                const dailygnl = new DailyGnL({userid: gnl.userid, symbol: gnl.symbol,netgnl: gnl.netgnl, date: gnl.date })
                           DailyGnL.create(dailygnl)
                          .then(dailygnl=>{ console.log("created a new GNL entry",dailygnl)
                        //5 collect all dailyGnL's, add them up and add them to users "score"
                       
                        Users.findOneAndUpdate({_id: dailygnl.userid }, {$inc: {score: gnl.netgnl}}, function (err, user) {
                          if (err) {console.log("updateError",err);}
                          else {console.log("UPDATED",user)}
                        })                        
                      })
                        
                      .catch(console.log);

                             })

        
        })
         .catch(console.log); 
         
      
        });
      });

   });

  }
});
})

//function takes in stock_object and daily_totals values and returns an object containing net gain/loss value in an object
function calcGainLoss(stock_obj,daily_totals = []){
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
    
//function takes in a response and extracts the json data for the closing or opening price, depending on paramaters.
function getPrice(response, price_type,element){
   console.log("STOCK?",element);
  


let foo = response;
    if(Object.getOwnPropertyNames(foo['data']).length === 0){
      console.log("Object is empty!",element)
      
   
    }
  
    
   // console.log("----------------",foo['data']);
    console.log("ourDATA",foo['data']['Meta Data']['3. Last Refreshed']);
     let last_refreshed = foo['data']['Meta Data']['3. Last Refreshed']
    let curprice=0;
    let symbol_object = {
      symbol: '',
      curprice: 0,
      datestring: '',
    }
    console.log("LRFR",last_refreshed);
    const bar = last_refreshed.split(' ')
    console.log(bar);
    if(price_type==="open"){
    curprice =  foo['data']["Time Series (1min)"][last_refreshed]['1. open'];
    console.log(curprice);
    }
    else if (price_type==="close"){
    curprice =  foo['data']["Time Series (1min)"][last_refreshed]['4. close'];
      console.log("CLOSE",curprice);
    }
   //returned price
    symbol_object.curprice = curprice;
   //datestring of symbol price returned
    symbol_object.datestring = bar[0];
    return symbol_object;
  } 
 
  function getLastRefreshDate(){
  axios.get('https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=T&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json')
  .then(data => {
                                  
                   console.log("--GETTING DATE--");
                   let symbol_object =  getPrice(data, "close")
                  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!DATEINFUNC:", symbol_object.datestring);
                   return symbol_object.datestring;
 
                            })
          .catch(error => {
              // log the error before moving on!
           console.log(error);
            //  res.json(error);
                              })               
          


}
function getSymvalue(url,retryTimes, retryDelay,retry2Delay, element, callback) {
  var cntr = 0;
//version 2 - keep a retry count and fail after a count
  function run() {
      axios.get(url)    
       .then(data => {
        console.log("DEALING WITH STOCK",element);
        console.log("------DL",Object.getOwnPropertyNames(data['data']).length);
        if(Object.getOwnPropertyNames(data['data']).length == 0){
          //metaData is null, try again
          console.log("GOT NULL DATA, trying again")
          setTimeout(run, retryDelay);
         }
         //missing metadata, trying again after longer wait.
         else if(Object.getOwnPropertyNames(data['data']).length == 1){
          console.log("MISSING METADATA, trying again")
          setTimeout(run, retry2Delay);
        }
         else{
           //data set is not null, send out data
           console.log("GOT GOOD DATA, returning")
           callback(null, data);
         }
      
      })
      .catch(err => {
        callback(err);
      })
          
      };
    // start our first request
    run();
    }
   function filtsym(symbol) {
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




