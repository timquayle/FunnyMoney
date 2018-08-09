// Require the Express Module
const express = require('express');

const session = require('express-session');
const fs = require("fs");
// Create an Express App
const app = express();
mongoose = require('mongoose'),
MongoStore = require('connect-mongo')(session),
app.use(session({
  secret: 'lakdj32akd',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 },
  rolling: true,
  'store': new MongoStore({
    mongoose_connection: 'funnymoney',
    adapter: 'connect-mongo',
    url: 'mongodb://localhost:27017/funnymoney',
    collection: 'sessions'
})
                 })) 
                
const path = require('path');
 app.use(express.static(path.join(__dirname, './funnymoney/dist/funnymoney')));
const bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({extends:true}));
app.use(bodyParser.json());
require('./server/jobs/scheduling.js')(app)
require('./server/config/mongoose.js')
require('./server/config/routes.js')(app)