const Stocks = require("../models/stock.js");
const Daily = require("../models/dailytotal.js");
const DailyGnL = require("../models/dailygnl.js");
const StockSymbolLookup = require('stock-symbol-lookup');

StockSymbolLookup.loadData()
.then((data) => {
  console.log("have our symbol library")
  const symbolLibary = data;
});

module.exports = {


  findSym(req,res){
    console.log("looking up symbol", req.params.id)
 
   StockSymbolLookup.searchBySecurity(req.params.id)
    .then((data) => {
      if(data.length===0){
        console.log("here?")
        res.json('nosymbol')
      }
      else{
       // console.log(data.symbols.length);
        console.log("DATA",data.length);
       res.json(data);
      }
   //   console.log("SYM",data);
   
});




  }, 
  getalluserGnl(req, res){
    console.log("getting stock history/controller")
    DailyGnL.find({userid: req.session.userid} )
      .then(allgnls => res.json(allgnls))
      .catch(console.log);
  
  }, 
 
  getuserDailygnl(req, res){
    DailyGnL.find(  {$and: [ {'userid':  req.params.id},{ 'date': req.params.date }  ] } )
      .then(dailytot => res.json(dailytot))
      .catch(console.log);
  
  }, 
  updateDailygnl(req, res){
    console.log("CURRENTRB",req.body);
    const dailygnl = new DailyGnL({userid: req.body.userid, symbol: req.body.symbol,netgnl: req.body.netgnl, date: req.body.date })
     DailyGnL.create(dailygnl)
    .then(dailygnl=> res.json(dailygnl))
      .catch(console.log);

},
    updateDailytotals(req, res){
        const daily = new Daily({symbol: req.body.symbol,closeprice: req.body.curprice, date: req.body.datestring  })
         Daily.create(daily)
        .then(daily=> res.json(daily))
          .catch(console.log);
    
},
getAlldailytotals(req, res){
  Daily.find({},{})
    .then(dailytot => res.json(dailytot))
    .catch(console.log);

}, 
getAllsymbols(req, res){
            Stocks.find({},{symbol: 1})
              .then(stocks => res.json(stocks))
              .catch(console.log);
        
    }, 
    getusersStock(req, res){
      console.log("getting users stock portfolio");
        Stocks.find({userid: req.session.userid})
          .then(stocks => res.json(stocks))
          .catch(console.log);
    
},

    buyStock(req, res) {
    const stock =  new Stocks({symbol: req.body.symbol, amount: req.body.amount, buyprice: req.body.buyprice, userid: req.session.userid, sname: req.body.sname })
       console.log('buying stock in controller', stock);
     Stocks.create(stock)
          .then(stock => res.json(stock))
          .catch(error => {
            const errors = Object.keys(error.errors).map(
              key => error.errors[key].message
            );
    
            res.status(500).json(errors);
          });
},
sellStock: function(req,res) {
  Stocks.findOneAndUpdate({_id: req.body.id }, {$inc: {amount: req.body.amount}}, function (err, stock) {
 if (err) {console.log("updateError",err);  res.json(err);     }
 else {
     console.log("UPDATED",stock)
     console.log("WESOLD: WEHAD",stock.amount,-req.body.amount)
     if(-req.body.amount===stock.amount) {
         console.log("SELLING ALL OUR STOCK!!");
         Stocks.remove({_id: req.body.id}, function(err,removed) {
         res.json(stock);
       })
        }
     
     else { res.json(stock); }
      }
})                               
},

       
    }