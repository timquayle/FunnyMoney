import { Injectable } from '@angular/core';
import {HttpClient}from  '@angular/common/http';
import { of, Observable } from 'rxjs';

const apikey= "614CAY3S4WQVWX15";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

getSymbol(symbol: string){
console.log("SYMBOL",symbol);
 //console.log(' https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&apikey=$(apikey)&datatype=json');
return this.http.get(' https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json');
// return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&apikey=' + apikey + '&datatype=json');
}

getsymDailies(symbol): Observable<any[]>{
  console.log('inservice getting daily closing values for',symbol);
  return this.http.get<any[]>('/getsymdailies/' +symbol);
}
getsymStockdata(symbol) {
  console.log('inservice getting symbol data for',symbol);
  return this.http.get('/getsymstockdata/' +symbol);
}

getuserSymgnl(symbol): Observable<any[]> {
  console.log('inservice getting symbol history for a user',symbol);
  return this.http.get<any[]>('/getusersymgnl/' +symbol);
}
getallUsergnl(): Observable<any[]> {
  console.log('inservice getting a users gains and losses symbols');
  return this.http.get<any[]>('/getallusergnl');
}
getallUsergnldata(): Observable<any[]> {
  console.log('inservice getting a users gains and losses');
  return this.http.get<any[]>('/getallusergnldata');
}
updateDailytotals(stock){
  console.log('inservice updating totals', stock);
  return this.http.post('/updatedailytotals',stock)
}

updateDailyGnL(gnl_obj){
  console.log('inservice updating gains n losses ', gnl_obj);
  return this.http.post('/updatedailygnl',gnl_obj)
}
getdailyTotals(): Observable<any[]> {
  console.log('inservice getting daily totals');
  return this.http.get<any[]>('/getalldailytotals');
}
getusersStock(): Observable<any[]> {
  console.log('inservice getting stocks');
  return this.http.get<any[]>('/getusersstock');
}
getSymbols(): Observable<any[]> {
  console.log('inservice getting stocks');
  return this.http.get<any[]>('/getallsymbols')
}
buyStock(stock){
  console.log('inservice buing stock', stock);
  return this.http.post('/buystock',stock)
}
sellStock(stock){
  console.log('inservice selling stock', stock);
  return this.http.post('/sellstock',stock)
}
getuserDailyGnL(date): Observable<any[]> {
  console.log('inservice getting users daily g n l');
  return this.http.get<any[]>('/getuserdailygnl/'+date);
}
findsym(sym) {
  console.log('finding symbol',sym);
  return this.http.get('/findsym/'+sym);
}


}
