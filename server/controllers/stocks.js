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
 
   StockSymbolLookup.search(req.params.id)
    .then((data) => {
      if(!data.symbols.length){
        console.log("here?")
        res.json('nosymbol')
      }
      else{
       // console.log(data.symbols.length);
        res.json(data);
      }
      console.log("SYM",data);
   
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
    const stock =  new Stocks({symbol: req.body.symbol, amount: req.body.amount, buyprice: req.body.buyprice, userid: req.session.userid })
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
 usersadd: function(req, res) {
     //const note = req.body;
     console.log("passed user:",req.body);
     bcrypt.hash(req.body.password, 10)
     .then(hashed_password => {
         console.log(hashed_password);
      const user = new Users({firstname: req.body.firstname, lastname: req.body.lastname,
                    email: req.body.email, password: hashed_password});
      user.save(function (err, saved) {
        Users.findOne({email: req.body.email}, function(err, user) {
        console.log("thiS USER:",user);
        req.session.userid = user._id;
        console.log("ID ",req.session.userid);
        req.session.email = req.body.email;
        console.log(req.session.email);
         req.session.save();
         res.json('registered');
        }) 
    })




                              })
                   
                   
                   
                    },
 


getcontact: function(req,res) {

    console.log("getting contact ",req.params.id)
    Users.find({_id: req.params.id},function(err, users) {
        res.json(users);
        console.log(err);
      })
    },
        getsessionid: function(req,res) {
            if (typeof req.session.userid === 'undefined')   {
            res.json('nosessionid');
            }
            else {console.log(req.session.userid);
            res.json(req.session.userid);
            }
        },
        removesessionid: function(req,res) {
            console.log('removing sessionid!');
                  delete req.session.userid;
                  delete req.session.email;
                  req.session.save();
                  res.json('session removed')
                },
       
    }