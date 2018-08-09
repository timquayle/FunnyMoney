const https = require('https'); // require the https module
const apikey= "614CAY3S4WQVWX15"
//https.get(" https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=demo&datatype=csv", (res) => { // request url
 const url = "https://www.alphavantage.co/query?apikey=" + apikey + "&function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL"
 https.get(url, (res) => { // request url
  console.log('statusCode:', res.statusCode); // log status code (200 = valid response) and headers
  console.log('headers:', res.headers);
  res.on('data', (d) => {
    process.stdout.write(d); // log response to console
  });
}).on('error', (e) => { // handle errors
  console.error(e);
});