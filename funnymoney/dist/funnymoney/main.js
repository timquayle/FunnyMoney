(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/api.service.ts":
/*!********************************!*\
  !*** ./src/app/api.service.ts ***!
  \********************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var apikey = "614CAY3S4WQVWX15";
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.getSymbol = function (symbol) {
        console.log("SYMBOL", symbol);
        //console.log(' https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&apikey=$(apikey)&datatype=json');
        return this.http.get(' https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=' + symbol + '&interval=1min&aoutputsize=compact&apikey=' + apikey + '&datatype=json');
        // return this.http.get('https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=compact&apikey=' + apikey + '&datatype=json');
    };
    ApiService.prototype.getallUsergnl = function () {
        console.log('inservice getting a users gains and losses');
        return this.http.get('/getallusergnl');
    };
    ApiService.prototype.updateDailytotals = function (stock) {
        console.log('inservice updating totals', stock);
        return this.http.post('/updatedailytotals', stock);
    };
    ApiService.prototype.updateDailyGnL = function (gnl_obj) {
        console.log('inservice updating gains n losses ', gnl_obj);
        return this.http.post('/updatedailygnl', gnl_obj);
    };
    ApiService.prototype.getdailyTotals = function () {
        console.log('inservice getting daily totals');
        return this.http.get('/getalldailytotals');
    };
    ApiService.prototype.getusersStock = function () {
        console.log('inservice getting stocks');
        return this.http.get('/getusersstock');
    };
    ApiService.prototype.getSymbols = function () {
        console.log('inservice getting stocks');
        return this.http.get('/getallsymbols');
    };
    ApiService.prototype.buyStock = function (stock) {
        console.log('inservice buing stock', stock);
        return this.http.post('/buystock', stock);
    };
    ApiService.prototype.sellStock = function (stock) {
        console.log('inservice selling stock', stock);
        return this.http.post('/sellstock', stock);
    };
    ApiService.prototype.getuserDailyGnL = function (userid, date) {
        console.log('inservice getting users daily g n l');
        return this.http.get('/getuserdailygnl/' + userid + '/' + date);
    };
    ApiService.prototype.findsym = function (sym) {
        console.log('finding symbol', sym);
        return this.http.get('/findsym/' + sym);
    };
    ApiService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], ApiService);
    return ApiService;
}());



/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _logreg_logreg_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logreg/logreg.component */ "./src/app/logreg/logreg.component.ts");
/* harmony import */ var _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./homepage/homepage.component */ "./src/app/homepage/homepage.component.ts");
/* harmony import */ var _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./leaderboard/leaderboard.component */ "./src/app/leaderboard/leaderboard.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _rules_rules_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./rules/rules.component */ "./src/app/rules/rules.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [{ path: '', component: _logreg_logreg_component__WEBPACK_IMPORTED_MODULE_2__["LogregComponent"] }, { path: 'home', component: _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_3__["HomepageComponent"] },
    { path: 'leaderboard', component: _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_4__["LeaderboardComponent"] }, { path: 'history', component: _history_history_component__WEBPACK_IMPORTED_MODULE_5__["HistoryComponent"] },
    { path: 'rules', component: _rules_rules_component__WEBPACK_IMPORTED_MODULE_6__["RulesComponent"] }];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user.service */ "./src/app/user.service.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.service */ "./src/app/api.service.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _logreg_logreg_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./logreg/logreg.component */ "./src/app/logreg/logreg.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./homepage/homepage.component */ "./src/app/homepage/homepage.component.ts");
/* harmony import */ var _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./leaderboard/leaderboard.component */ "./src/app/leaderboard/leaderboard.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _rules_rules_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rules/rules.component */ "./src/app/rules/rules.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
                _logreg_logreg_component__WEBPACK_IMPORTED_MODULE_6__["LogregComponent"],
                _homepage_homepage_component__WEBPACK_IMPORTED_MODULE_9__["HomepageComponent"],
                _leaderboard_leaderboard_component__WEBPACK_IMPORTED_MODULE_10__["LeaderboardComponent"],
                _history_history_component__WEBPACK_IMPORTED_MODULE_11__["HistoryComponent"],
                _rules_rules_component__WEBPACK_IMPORTED_MODULE_12__["RulesComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
            ],
            providers: [_user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"], _api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/history/history.component.css":
/*!***********************************************!*\
  !*** ./src/app/history/history.component.css ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a{\r\n    margin-left:10px;\r\n}"

/***/ }),

/***/ "./src/app/history/history.component.html":
/*!************************************************!*\
  !*** ./src/app/history/history.component.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p><a [routerLink]=\"['/home']\">Home</a>   <a [routerLink]=\"['/rules']\">Rules</a><a [routerLink]=\"['/leaderboard']\">Leaderboard</a>  <a [routerLink]=\"['/history']\">Stock History</a>    <a href (click)=\"logOff($event)\">Log Off</a>  </p>\n<h1>Stock Histories</h1>\n<div *ngFor=\"let gnls of mygnls\">\n\n<p>{{gnls.symbol}} - Day: {{gnls.date}}  Activity: {{gnls.netgnl|currency}}</p>\n\n\n\n</div>\n"

/***/ }),

/***/ "./src/app/history/history.component.ts":
/*!**********************************************!*\
  !*** ./src/app/history/history.component.ts ***!
  \**********************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(apiService) {
        this.apiService = apiService;
        this.mygnls = [];
    }
    HistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var o = this.apiService.getallUsergnl();
        o.subscribe(function (response) {
            _this.mygnls = response;
            console.log("all my stox", _this.mygnls);
        });
    };
    HistoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! ./history.component.html */ "./src/app/history/history.component.html"),
            styles: [__webpack_require__(/*! ./history.component.css */ "./src/app/history/history.component.css")]
        }),
        __metadata("design:paramtypes", [_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "./src/app/homepage/homepage.component.css":
/*!*************************************************!*\
  !*** ./src/app/homepage/homepage.component.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a{\r\n    margin-left:10px;\r\n}\r\n.info{\r\n    background-color: black;\r\n    color:yellow;\r\n    display: inline-block;\r\n    vertical-align: top;\r\n    width:500px;\r\n    height:800px;\r\n    overflow: scroll;\r\n}\r\n.searchbuy{\r\nheight:800px;\r\nwidth:500px;\r\ndisplay:inline-block;\r\n}\r\ntr td button{\r\n    background-color:blue;\r\n    color:yellow;\r\n}\r\ntr:nth-child(even) {\r\n    background-color: #dddddd;\r\n    color:black;\r\n}"

/***/ }),

/***/ "./src/app/homepage/homepage.component.html":
/*!**************************************************!*\
  !*** ./src/app/homepage/homepage.component.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div class=\"wrapper\">\n<p><a [routerLink]=\"['/home']\">Home</a>   <a [routerLink]=\"['/rules']\">Rules</a><a [routerLink]=\"['/leaderboard']\">Leaderboard</a>  <a [routerLink]=\"['/history']\">Stock History</a>    <a href (click)=\"logOff($event)\">Log Off</a>  </p>\n<div class=\"searchbuy\">\n<form (submit)=\"findSym($event,findsym)\" #findsym='ngForm'>\n  <input type =\"text\" name=\"sym\" id=\"symid\" [ngModel]=\"symid\" required #sym=\"ngModel\">\n  <button>Find Symbol</button>\n  \n  \n  </form>\n<div *ngIf=\"searching\">\n<div *ngIf=\"notfound\">Symbol not found!</div>\n<div *ngIf=\"!notfound\">\n<div *ngFor=\"let sym of sym_data\">\n  <h3>Symbol: {{sym.symbol}}</h3>\n  <h4>Security Name: {{sym.securityName}}</h4>\n  <button (click) = \"symSubmit(sym.symbol,sym.securityName)\">Find Current Buy Price?</button>\n</div>\n</div>\n\n</div>\n\n<div *ngIf=\"buystock\">\n <fieldset>\n   <legend>Purchase Stock</legend>\n  <form (submit)=\"buyStock($event,buyForm)\" #buyForm='ngForm'>\n  <p>Symbol: {{stock.symbol}}</p>\n  <p>Buyprice: {{stock.buyprice|currency}}</p>\n  <p>Amount: <input type=\"number\" name=\"amount\" id=\"amountid\"\n    [ngModel]=\"stock.amount\"\n    required\n    #amount=\"ngModel\">\n    <input type=\"hidden\" name=\"sname\" id=\"secnameid\" value=\"{{secname}}\" [ngModel]=\"secname\" #sname=\"ngModel\">\n    <input type=\"hidden\" name=\"buyprice\" id=\"priceid\" value=\"{{stock.buyprice}}\" [ngModel]=\"stock.buyprice\" #buyprice=\"ngModel\">\n    <input type=\"hidden\" name=\"symbol\" id=\"symbolid\"  value=\"{{stock.symbol}}\" [ngModel]=\"stock.symbol\" #symbol=\"ngModel\">\n    <button>Buy This Stock</button>\n  </form>\n  </fieldset>\n</div>\n</div>\n<div  class=\"info\">\n<div class=\"listing\" *ngIf=\"!sellingstock\">\n  <fieldset>\n    <legend>Personal Info</legend>\n     \n    <h1>Hello, {{currentuser.firstname}} </h1>\n    <h2>Money Available: {{currentuser.money|currency}}</h2>\n    <h2>Total Profit/Score: {{currentuser.score|currency}}</h2>\n   <div *ngIf=\"mystocks.length !==0\">\n    <H2>My Current Stocks:</H2>\n    <table>\n        <tr>\n          <th>Stock Symbol</th>\n          <th>Securities Name</th> \n          <th>Shares/Amount</th>\n          <th>BuyPrice</th>\n          <th>Actions</th>\n\n        </tr>\n    <tr *ngFor=\"let mystock of mystocks\">\n    \n      <td>{{mystock.symbol}}</td>\n      <td>{{mystock.sname}} </td> \n      <td>{{mystock.amount}}</td>\n      <td>{{mystock.buyprice|currency}}</td>\n      <td><button (click)=\"onSell(mystock)\">Sell</button></td>\n    </tr>\n    </table>\n   </div>\n  </fieldset>\n    </div>\n   \n   \n   \n   \n    <div class=\"selling\" *ngIf=\"sellingstock\">\n        <fieldset>\n            <legend>Selling Stock</legend>\n      <form #sellForm='ngForm' (submit)=\"sellmyStock($event,sellForm)\">\n         <h2>Stock: {{sellstock.symbol}}</h2>\n         <h4>Buy Price: {{sellstock.buyprice}}</h4>\n         <h4>Selling Price: {{stock.buyprice}} </h4>\n         <h4>Number of Shares: {{sellstock.amount}}</h4>\n         <input type=\"number\" name=\"amount\" id=\"amountid\" [ngModel]=\"amount\" #amount=\"ngModel\" placeholder=\"{{sellstock.amount}}\">\n         <input type=\"hidden\" value=\"{{sellstock.symbol}}\" name=\"symbol\" [ngModel]=\"sellstock.symbol\" #symbol=\"ngModel\">\n         <input type=\"hidden\" value=\"{{stock.buyprice}}\" name=\"sellprice\" [ngModel]=\"stock.buyprice\" #sellprice=\"ngModel\">\n         <input type=\"hidden\" value=\"{{sellstock._id}}\" name=\"id\" [ngModel]=\"sellstock._id\" #id=\"ngModel\">\n         <Button>Sell Stock</Button>\n      \n        </form>\n      </fieldset>\n        </div>\n      </div>\n  </div>\n \n"

/***/ }),

/***/ "./src/app/homepage/homepage.component.ts":
/*!************************************************!*\
  !*** ./src/app/homepage/homepage.component.ts ***!
  \************************************************/
/*! exports provided: HomepageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomepageComponent", function() { return HomepageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api.service */ "./src/app/api.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _models_stock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../models/stock */ "./src/app/models/stock.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomepageComponent = /** @class */ (function () {
    function HomepageComponent(apiService, userService) {
        this.apiService = apiService;
        this.userService = userService;
        this.current_price = 0;
        this.responseError = false;
        this.validResponse = false;
        this.symbol = "";
        this.symbols = [];
        this.stock = new _models_stock__WEBPACK_IMPORTED_MODULE_3__["Stock"]();
        this.users_stock = [];
        this.daily_totals = [];
        this.notfound = false;
        this.daily_total = [];
        this.mystocks = [];
        this.searching = false;
        this.buystock = false;
        this.currentuser = {};
        this.secname = '';
        this.listingstock = true;
        this.sellingstock = false;
        this.sellstock = { symbol: '',
            buyprice: 0,
            amount: 0,
            nostocks: false,
        };
    }
    HomepageComponent.prototype.ngOnInit = function () {
        var _this = this;
        var o = this.apiService.getusersStock();
        o.subscribe(function (response) {
            _this.mystocks = response;
            console.log("all my stox", _this.mystocks);
            var o2 = _this.userService.getUser();
            o2.subscribe(function (response) {
                _this.currentuser = response;
                console.log("CurrentUser:", _this.currentuser);
            });
        });
    };
    //get the current value of a symbol 
    HomepageComponent.prototype.symSubmit = function (symbol, secname) {
        var _this = this;
        // event.preventDefault();
        this.secname = secname;
        console.log("Secname:", this.secname);
        this.searching = false;
        this.buystock = true;
        console.log("FV", symbol);
        var observe = this.apiService.getSymbol(symbol);
        observe.subscribe(function (response) {
            _this.stock.symbol = symbol;
            _this.validResponse = true;
            _this.responseError = false;
            console.log("APIRESPONSE", response);
            var foo = response;
            var last_refreshed = foo['Meta Data']['3. Last Refreshed'];
            console.log(last_refreshed);
            var bar = last_refreshed.split(' ');
            console.log(bar);
            _this.stock.buyprice = foo["Time Series (1min)"][last_refreshed]['1. open'];
            console.log(foo["Time Series (1min)"][last_refreshed]['1. open']);
            // foo[bar])
        }, function (Error) {
            if (Error) {
                _this.responseError = true;
            }
            console.log("APIERROR", Error);
        });
    };
    //method that buys a stock
    HomepageComponent.prototype.buyStock = function (event, form) {
        var _this = this;
        event.preventDefault();
        console.log("Buying Stock", form.value);
        var totalspent = form.value.amount * form.value.buyprice;
        console.log("Amountspent:", totalspent);
        var msgstr = "Buy " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + totalspent;
        var confirm = window.confirm(msgstr);
        console.log("CONFIRM?", confirm);
        //did we say yes?
        if (confirm) {
            console.log("user confirmed yes");
            var observe = this.apiService.buyStock(form.value);
            observe.subscribe(function (response) {
                //adjust the users current "money" holdings  
                console.log("response", response);
                var o = _this.userService.changeMoney(-totalspent);
                o.subscribe(function (response) {
                    console.log(response);
                    //get updating user stats
                    var o2 = _this.userService.getUser();
                    o2.subscribe(function (response) {
                        _this.currentuser = response;
                        console.log("CurrentUser:", _this.currentuser);
                        //get users updating stock listing
                        var o3 = _this.apiService.getusersStock();
                        o3.subscribe(function (response) {
                            _this.mystocks = response;
                            console.log("all my stox", _this.mystocks);
                            _this.buystock = false;
                        });
                    });
                });
            }, function (Error) {
                console.log("ERROR", Error);
            });
        }
        else {
            //we cancelled
            this.buystock = false;
        }
    };
    HomepageComponent.prototype.getSymbols = function () {
        var _this = this;
        var observe = this.apiService.getSymbols();
        observe.subscribe(function (response) {
            //this.symbols = response;
            console.log("response");
            _this.symbols = response;
            console.log(_this.symbols);
        }, function (error) {
            console.log(error);
        });
    };
    HomepageComponent.prototype.getSymbolsValues = function () {
        var _this = this;
        console.log("GSV");
        //gets every symbol in your stocks database, and gets the 'closing' value for them, then writes this data to 
        // daily_totals
        this.symbols.forEach(function (element) {
            console.log(element.symbol);
            var observe = _this.apiService.getSymbol(element.symbol);
            observe.subscribe(function (response) {
                console.log(response);
                var symbol_object = _this.getPrice(response, "close");
                symbol_object.symbol = element.symbol;
                console.log('CURRENT PRICE ', symbol_object.symbol, symbol_object.curprice, symbol_object.datestring);
                var o2 = _this.apiService.updateDailytotals(symbol_object);
                o2.subscribe(function (response) {
                    console.log("WRITE RETURN", response);
                }, function (Error) { console.log("ERROR_WRITE?", Error); });
            });
        });
    };
    HomepageComponent.prototype.getPrice = function (response, price_type) {
        var foo = response;
        var last_refreshed = foo['Meta Data']['3. Last Refreshed'];
        var curprice = 0;
        var symbol_object = {
            symbol: '',
            curprice: 0,
            datestring: '',
        };
        console.log(last_refreshed);
        var bar = last_refreshed.split(' ');
        console.log(bar);
        if (price_type === "open") {
            curprice = foo["Time Series (1min)"][last_refreshed]['1. open'];
            console.log(curprice);
        }
        else if (price_type === "close") {
            curprice = foo["Time Series (1min)"][last_refreshed]['4. close'];
            console.log(curprice);
        }
        //returned price
        symbol_object.curprice = curprice;
        //datestring of symbol price returned
        symbol_object.datestring = bar[0];
        return symbol_object;
    };
    HomepageComponent.prototype.gainsLosses = function () {
        var _this = this;
        //get all of the users current stock along with amount
        var o = this.apiService.getusersStock();
        o.subscribe(function (response) {
            _this.users_stock = response;
            console.log("USERSSTOCK:", _this.users_stock);
            //get our daily tally totals for every stock symbol in the system
            var o2 = _this.apiService.getdailyTotals();
            o2.subscribe(function (response) {
                _this.daily_totals = response;
                console.log("DT", _this.daily_totals);
                _this.users_stock.forEach(function (eachstock) {
                    console.log("LOOPING thROUGH USERS STOCK", eachstock);
                    var gnl = _this.calcGainLoss(eachstock, _this.daily_totals);
                    console.log("gnl_obj", gnl);
                    var o3 = _this.apiService.updateDailyGnL(gnl);
                    o3.subscribe(function (response) { console.log("DONEWRITING", response); });
                });
            }, function (Error) { console.log(Error); });
        }, function (Error) { console.log(Error); });
    };
    HomepageComponent.prototype.calcGainLoss = function (stock_obj, daily_totals) {
        if (daily_totals === void 0) { daily_totals = []; }
        var gnl_obj = {
            userid: '',
            symbol: '',
            date: '',
            netgnl: 0
        };
        var symbol = stock_obj.symbol;
        var amount = stock_obj.amount;
        var buyprice = stock_obj.buyprice;
        var userid = stock_obj.userid;
        console.log("GNL", symbol, amount, buyprice);
        var j = daily_totals.find(function (o) { return o.symbol === symbol; });
        console.log("NETGL", (j.closeprice - buyprice) * amount);
        gnl_obj.userid = userid;
        gnl_obj.symbol = symbol;
        gnl_obj.date = j.date;
        gnl_obj.netgnl = (j.closeprice - buyprice) * amount;
        return gnl_obj;
    };
    HomepageComponent.prototype.getusergnl = function () {
        var _this = this;
        var o = this.apiService.getuserDailyGnL("5b6372c33ec8221a24da48f9", "2018-08-08");
        o.subscribe(function (response) {
            _this.daily_totals = response;
            console.log("Tim's totals:", _this.daily_totals);
        });
    };
    //method that searches our stock listing for a symbol and security name, given a partial security name
    HomepageComponent.prototype.findSym = function (event, findsym) {
        var _this = this;
        event.preventDefault();
        console.log(findsym.value);
        this.searching = true;
        var o = this.apiService.findsym(findsym.value.sym);
        o.subscribe(function (response) {
            if (response === "nosymbol") {
                _this.notfound = true;
                console.log("No symbol found!");
            }
            else {
                _this.sym_data = response;
                _this.notfound = false;
                console.log("FOUND", _this.sym_data);
            }
        });
    };
    //method that sells the users stock
    HomepageComponent.prototype.onSell = function (mystock) {
        var _this = this;
        console.log("CURRENT STOCK in question:", mystock);
        //get the stock in questions current buy price
        this.sellingstock = true;
        this.sellstock = mystock;
        var observe = this.apiService.getSymbol(mystock.symbol);
        observe.subscribe(function (response) {
            _this.stock.symbol = mystock.symbol;
            console.log("APIRESPONSE", response);
            var foo = response;
            var last_refreshed = foo['Meta Data']['3. Last Refreshed'];
            console.log(last_refreshed);
            var bar = last_refreshed.split(' ');
            console.log(bar);
            //this is actually "sellprice" fix this in the future
            _this.stock.buyprice = foo["Time Series (1min)"][last_refreshed]['4. close'];
            console.log(foo["Time Series (1min)"][last_refreshed]['4. close']);
            // foo[bar])
        }, function (Error) {
            if (Error) {
                _this.responseError = true;
            }
            console.log("APIERROR", Error);
        });
    };
    HomepageComponent.prototype.sellmyStock = function (event, form) {
        var _this = this;
        event.preventDefault();
        console.log("SELLING thIS STOCK:", form.value);
        if (form.value.amount > this.sellstock.amount) {
            alert("Cannot Sell more stock than you have!");
            this.sellingstock = false;
            return;
        }
        //prompt the user and ask the amount they would like to sell
        var moneygotten = form.value.amount * form.value.sellprice;
        var msgstr = "Sell " + form.value.amount + " Shares of " + form.value.symbol + " Stock for: $" + moneygotten;
        var confirm = window.confirm(msgstr);
        if (confirm) {
            //sell the stock
            form.value.amount = -form.value.amount;
            var o = this.apiService.sellStock(form.value);
            o.subscribe(function (response) {
                console.log("we sold stock:", response);
                //adjust "money" holdings
                var o2 = _this.userService.changeMoney(moneygotten);
                o2.subscribe(function (response) {
                    console.log(response);
                    //get updating user stats
                    var o3 = _this.userService.getUser();
                    o3.subscribe(function (response) {
                        _this.currentuser = response;
                        console.log("CurrentUser:", _this.currentuser);
                        //get users updating stock listing
                        var o4 = _this.apiService.getusersStock();
                        o4.subscribe(function (response) {
                            _this.mystocks = response;
                            console.log("all my stox", _this.mystocks);
                            _this.sellingstock = false;
                        });
                    });
                });
            });
        }
        else {
            this.sellingstock = false;
        }
    };
    HomepageComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-homepage',
            template: __webpack_require__(/*! ./homepage.component.html */ "./src/app/homepage/homepage.component.html"),
            styles: [__webpack_require__(/*! ./homepage.component.css */ "./src/app/homepage/homepage.component.css")]
        }),
        __metadata("design:paramtypes", [_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"],
            _user_service__WEBPACK_IMPORTED_MODULE_2__["UserService"]])
    ], HomepageComponent);
    return HomepageComponent;
}());



/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.css":
/*!*******************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".profile{\r\n    height:150px;\r\n    width:500px;\r\n    border: 2px solid black;\r\n}\r\n.rank{\r\n    width:20px;\r\n    height:100px;\r\n    display:inline-block;\r\n}\r\n.score{\r\n    width:100px;\r\n    height:100px;\r\n    display:inline-block;\r\n    vertical-align:top;\r\n    margin-left:250px;\r\n}\r\n.leaders{\r\n    width: 700px;\r\n    height: 500px;\r\n    overflow: scroll;\r\n}\r\na{\r\n    margin-left:10px;\r\n}"

/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.html":
/*!********************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.html ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p><a [routerLink]=\"['/home']\">Home</a>   <a [routerLink]=\"['/rules']\">Rules</a><a [routerLink]=\"['/leaderboard']\">Leaderboard</a>  <a href (click)=\"logOff($event)\">Log Off</a>  </p>\n<h1>Rankings</h1>\n<div class=\"leaders\">\n<div *ngFor=\"let user of users;let i = index\" [attr.data-index]=\"i\">\n<div class=\"profile\">\n<div class=\"rank\"> <h1>{{i+1}} {{user.firstname}}</h1> </div>\n  \n<div class=\"score\"> <h2>  Score:{{user.score|currency}}</h2> </div>\n  <h3> {{user.email}} </h3>  \n</div>\n</div>\n</div>"

/***/ }),

/***/ "./src/app/leaderboard/leaderboard.component.ts":
/*!******************************************************!*\
  !*** ./src/app/leaderboard/leaderboard.component.ts ***!
  \******************************************************/
/*! exports provided: LeaderboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeaderboardComponent", function() { return LeaderboardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LeaderboardComponent = /** @class */ (function () {
    function LeaderboardComponent(apiService) {
        this.apiService = apiService;
        this.users = [];
    }
    LeaderboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.getUsers()
            .subscribe(function (response) {
            _this.users = response;
            console.log("THIS IS RESPONSE", _this.users);
            _this.users.sort(function (a, b) {
                return b.score - a.score;
                //console.log("SORTED USERS:",this.users);
            });
        });
    };
    LeaderboardComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-leaderboard',
            template: __webpack_require__(/*! ./leaderboard.component.html */ "./src/app/leaderboard/leaderboard.component.html"),
            styles: [__webpack_require__(/*! ./leaderboard.component.css */ "./src/app/leaderboard/leaderboard.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], LeaderboardComponent);
    return LeaderboardComponent;
}());



/***/ }),

/***/ "./src/app/logreg/logreg.component.css":
/*!*********************************************!*\
  !*** ./src/app/logreg/logreg.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".login input, button{\r\n    display: block;\r\n}\r\n.login {\r\n    height:200px;\r\n    width: 200px;\r\n    display:inline-block;\r\n}\r\n.register {\r\n    height:300px;\r\n    width: 300px;\r\n    display:inline-block;\r\n\r\nvertical-align:top;\r\n}\r\n.register input, button{\r\n    display: block;\r\n}"

/***/ }),

/***/ "./src/app/logreg/logreg.component.html":
/*!**********************************************!*\
  !*** ./src/app/logreg/logreg.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"!regFlag\" class=\"login\">\n  <fieldset>\n      <legend>FunnyMoney Login</legend>\n    <form (submit)=\"onLogin($event,logForm)\"  #logForm='ngForm'  >\n      <label for=\"emailidl\"> Email</label><input type=\"text\" name=\"email\" id=\"emailidl\"\n               [ngModel]=\"emailidl\" \n              required\n              #email=\"ngModel\">\n              <label for=\"passwdl\"> Password</label><input type=\"password\" name=\"password\" id=\"passwdl\"\n              [ngModel]=\"passwdl\" \n              required\n              #password=\"ngModel\">\n              <div *ngIf=\"badlogin\" class=\"errormsg\" >Invalid Credentials</div>\n              <div *ngIf=\"badlogin_5times\" class=\"errormsg\" >Max Attempts to login exceeded, username locked out for 1 hour</div>\n              <button>Login</button>\n      </form>\n     <p> Dont have an Account?<a href (click)=\"regUser($event)\">Register</a></p>\n   </fieldset>\n    </div>\n     <div *ngIf=\"regFlag\" class=\"register\">\n    <fieldset>\n        <legend>FunnyMoney Registration</legend>\n        <form  (submit)=\"onReg($event,regForm)\"  #regForm='ngForm'>\n          <label for=\"fname\"> First Name</label><input type=\"text\" name=\"firstname\" id=\"fname\"\n          [ngModel]=\"fname\" \n          required\n          #firstname=\"ngModel\">\n         <label for=\"lname\"> Last Name</label><input type=\"text\" name=\"lastname\" id=\"lname\"\n         [ngModel]=\"lname\" \n         required\n         #lastname=\"ngModel\">\n          <label for=\"emailid\"> Email</label><input type=\"text\" name=\"email\" id=\"emailid\"\n           [ngModel]=\"emailid\" \n          required\n          #email=\"ngModel\">\n          <label for=\"password\"> Password</label><input type=\"password\" name=\"password\" id=\"passwd\"\n          [ngModel]=\"passwd\" \n          required\n          #password=\"ngModel\">\n          <div *ngIf=\"passShort\" class=\"errormsg\" >Password must contain at least 8 characters</div>\n          <label for=\"cpassword\">Confirmation Password</label><input type=\"password\" name=\"cpassword\" id=\"cpasswd\"\n          [ngModel]=\"cpasswd\" \n          required\n          #cpassword=\"ngModel\">\n          <div *ngIf=\"passmm\" class=\"errormsg\" >Password must match conformation password</div>\n          <button [disabled]=\"!regForm.valid\">Register</button>\n          </form>\n      </fieldset>\n        </div> "

/***/ }),

/***/ "./src/app/logreg/logreg.component.ts":
/*!********************************************!*\
  !*** ./src/app/logreg/logreg.component.ts ***!
  \********************************************/
/*! exports provided: LogregComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogregComponent", function() { return LogregComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user.service */ "./src/app/user.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogregComponent = /** @class */ (function () {
    function LogregComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.regFlag = false;
        this.passShort = false;
        this.passmm = false;
        this.badlogin = false;
        this.badlogin_5times = false;
    }
    LogregComponent.prototype.ngOnInit = function () {
    };
    LogregComponent.prototype.onLogin = function (event, form) {
        var _this = this;
        event.preventDefault();
        console.log("VALUES ", form.value);
        var observer = this.userService.passLog(form.value);
        observer.subscribe(function (response) {
            console.log("response", response);
            if (response === "valid") {
                console.log("VALLLLLID!");
                _this.badlogin = false;
                _this.router.navigate(['/home']);
            }
            else if (response === "invalidlogin") {
                console.log(" Bad username!");
                _this.badlogin = true;
                _this.badlogin_5times = false;
            }
            else if (response === "invalidpassword") {
                console.log(" Bad password!!");
                _this.badlogin = true;
                _this.badlogin_5times = false;
            }
            else if (response === "5timesbad") {
                console.log("5 Bad passwords!!");
                _this.badlogin_5times = true;
            }
        }, function (Error) {
            console.log("Error", Error);
        });
    };
    LogregComponent.prototype.regUser = function (event) {
        event.preventDefault();
        this.regFlag = true;
        console.log("Reg ClickED!");
    };
    LogregComponent.prototype.onReg = function (event, form) {
        var _this = this;
        event.preventDefault();
        console.log("VALUES ", form.value);
        if (form.value.password.length < 8) {
            console.log("password too short!");
            this.passShort = true;
        }
        else if (form.value.password != form.value.cpassword) {
            this.passmm = true;
        }
        else {
            this.passmm = false;
            this.passShort = false;
            var observer = this.userService.passReg(form.value);
            observer.subscribe(function (response) {
                console.log("response", response);
                _this.router.navigate(['/rules']);
            }, function (Error) {
                console.log("Error", Error);
            });
        }
    };
    LogregComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-logreg',
            template: __webpack_require__(/*! ./logreg.component.html */ "./src/app/logreg/logreg.component.html"),
            styles: [__webpack_require__(/*! ./logreg.component.css */ "./src/app/logreg/logreg.component.css")]
        }),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], LogregComponent);
    return LogregComponent;
}());



/***/ }),

/***/ "./src/app/models/stock.ts":
/*!*********************************!*\
  !*** ./src/app/models/stock.ts ***!
  \*********************************/
/*! exports provided: Stock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Stock", function() { return Stock; });
var Stock = /** @class */ (function () {
    function Stock() {
        this.symbol = '';
        this.amount = 0;
        this.buyprice = 0;
    }
    return Stock;
}());



/***/ }),

/***/ "./src/app/rules/rules.component.css":
/*!*******************************************!*\
  !*** ./src/app/rules/rules.component.css ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "a{\r\n    margin-left:10px;\r\n}"

/***/ }),

/***/ "./src/app/rules/rules.component.html":
/*!********************************************!*\
  !*** ./src/app/rules/rules.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p><a [routerLink]=\"['/home']\">Home</a>   <a [routerLink]=\"['/rules']\">Rules</a><a [routerLink]=\"['/leaderboard']\">Leaderboard</a>  <a [routerLink]=\"['/history']\">Stock History</a>    <a href (click)=\"logOff($event)\">Log Off</a>  </p>\n<h1>Welcome to Funny Money</h1>\n<h4>The Name of the Game is \"FunnyMoney\"..... Well is it a game? is it a stock Buying/Selling Simulator? Is it Stock Trading \"Training Wheels?\" Yes, Yes and Yes...</h4>\n\n<h4>You get $100,000 to invest in any NASDAQ/Dow Jones trading symbols you wish. At the end of each trading day (4pm EST), the gains and losses of your stock portfolio are tallied up and your \"Score\" is your net profit.</h4> \n\n<h4>FunnyMoney uses Actual, Realtime, Stock Buying/Selling Prices, The only difference is the money is not real, so you invest strictly for fun/entertainment purposes. </h4>\n<h4>You may sell your current stock at any time to increase your money holdings and purchase any other stock you wish. </h4>\n<h4>Check the \"LeaderBoard\" section to see how you rank next to your stock trading peers. </h4>\n<h4>Check the \"History\" section to see the historical behavior of each of the stocks in your portfolio. </h4> \n\n<h4>Disclaimer: FunnyMoney \"Money\" has no actual value and the game is played strictly for entertainment purposes. </h4>"

/***/ }),

/***/ "./src/app/rules/rules.component.ts":
/*!******************************************!*\
  !*** ./src/app/rules/rules.component.ts ***!
  \******************************************/
/*! exports provided: RulesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RulesComponent", function() { return RulesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RulesComponent = /** @class */ (function () {
    function RulesComponent() {
    }
    RulesComponent.prototype.ngOnInit = function () {
    };
    RulesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rules',
            template: __webpack_require__(/*! ./rules.component.html */ "./src/app/rules/rules.component.html"),
            styles: [__webpack_require__(/*! ./rules.component.css */ "./src/app/rules/rules.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], RulesComponent);
    return RulesComponent;
}());



/***/ }),

/***/ "./src/app/user.service.ts":
/*!*********************************!*\
  !*** ./src/app/user.service.ts ***!
  \*********************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.changeMoney = function (money) {
        console.log("INSERVice updating money", money);
        return this.http.get('/changemoney/' + money);
    };
    UserService.prototype.getUser = function () {
        console.log("INSERVice getting current user");
        return this.http.get('/getuser');
    };
    UserService.prototype.getUsers = function () {
        console.log("INSERVice getting all users");
        return this.http.get('/getallusers');
    };
    UserService.prototype.removeSessionid = function () {
        console.log("INSERVICE removing sessionId");
        return this.http.get('/removesessionid/');
    };
    UserService.prototype.getContact = function (userid) {
        console.log("INSERVICE getting contact");
        return this.http.get('/getcontact/' + userid);
    };
    UserService.prototype.getSessionid = function () {
        console.log("INSERVICE getting sessionId");
        return this.http.get('/getsessionid/');
    };
    UserService.prototype.passReg = function (user) {
        console.log("INSERVICE", user);
        return this.http.post('/postreg', user);
        // return this.http.get('/notsget');
    };
    UserService.prototype.passLog = function (user) {
        console.log("INSERVICE", user);
        return this.http.post('/postlog', user);
        // return this.http.get('/notsget');
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\Users\newlap\mean2\FunnyMoney\funnymoney\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map