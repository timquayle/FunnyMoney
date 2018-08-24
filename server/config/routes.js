
const users= require('../controllers/users.js');
const stocks= require('../controllers/stocks.js')

const path = require('path');
module.exports = function(app) {
  app.get('/changemoney/:money',(req, res, next) =>{
    console.log('we are updating money total');
   users.changeMoney(req, res);
  })
  app.get('/getallusers',(req, res, next) =>{
    console.log('we are getting all users');
   users.usersgetall(req, res);
  })
  app.get('/getuser',(req, res, next) =>{
    console.log('we are getting current user');
   users.userget(req, res);
  })

  app.get('/removesessionid',(req, res, next) =>{
    console.log('we are removing the session id');
   users.removesessionid(req, res);
  })
  app.get('/getsessionid',(req, res, next) =>{
    console.log('we are getting the session id');
   users.getsessionid(req, res);
  })
  app.get('/getcontact/:id',(req, res, next) =>{
    console.log('we are getting contact info',req.params.id);
   users.getcontact(req, res);
  })
 
  app.post('/postreg', (req, res, next) =>{
    
    console.log('we are posting data');
    users.usersadd(req, res);
  })
  app.post('/postlog', (req, res, next) =>{
    
    console.log('we are posting data login');
    users.logincheck(req, res);
  })
  app.post('/updatedailytotals', (req, res, next) =>{
    
    console.log('Updating our daily totals table', req.body);
    stocks.updateDailytotals(req, res);
  })
  app.get('/getallusergnldata',(req, res, next) =>{
    console.log('we are getting a users daily  gains n losses');
   stocks.getalluserGnldata(req, res);
  })
    app.get('/getallusergnl',(req, res, next) =>{
    console.log('we are getting a users symbols from daily gains n losses');
   stocks.getalluserGnl(req, res);
  })
  app.get('/getusersymgnl/:symbol',(req, res, next) =>{
    console.log('we are getting a users history of symbol:',req.params.symbol);
   stocks.getuserSymgnl(req, res);
  })


  app.post('/buystock', (req, res, next) =>{
    
    console.log('we are posting data, buying stock');
    stocks.buyStock(req, res);
  })
  app.post('/sellstock', (req, res, next) =>{
    
    console.log('we are posting data, selling stock');
    stocks.sellStock(req, res);
  })
  app.get('/getalldailytotals/',(req, res, next) =>{
    console.log('we are getting all daily totals');
   stocks.getAlldailytotals(req, res);
  })
  app.get('/getsymdailies/:symbol',(req, res, next) =>{
    console.log('we are getting closing totals for a symbol',req.params.symbol);
   stocks.getSymdailies(req, res);
  })
  app.get('/getusersstock/',(req, res, next) =>{
    console.log('we are getting a users stocks');
   stocks.getusersStock(req, res);
  })
  app.get('/getsymstockdata/:symbol',(req, res, next) =>{
    console.log('we are getting data for a users stock', req.params.symbol);
   stocks.getsymStockdata(req, res);
  })
  app.get('/getallsymbols',(req, res, next) =>{
    console.log('we are getting all stocks');
   stocks.getAllsymbols(req, res);
  })
  app.post('/updatedailygnl', (req, res, next) =>{
    
    console.log('we are updating our daily gains and losses table');
    stocks.updateDailygnl(req, res);
  })

  app.get('/getuserdailygnl/:id/:date',(req, res, next) =>{
    console.log('Get user daily gnl',req.params.id, req.params.date);
   stocks.getuserDailygnl(req, res);
  })
  app.get('/findsym/:id',(req, res, next) =>{
    console.log('we are searching symbols',req.params.id);
   stocks.findSym(req, res);
  })
 
  app.all("*", (req,res,next) => {    
        res.sendFile(path.resolve("./funnymoney/dist/funnymoney/index.html"))
                                 })

  
  app.listen(8000, function() {
   console.log("listening on port 8000");
});
}