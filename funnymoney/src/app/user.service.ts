import { Injectable } from '@angular/core';
import {HttpClient}from  '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  changeMoney(money: Number) :any {
    console.log("INSERVice updating money",money)
    return this.http.get('/changemoney/'+money);

  }
  getUser() :any {
    console.log("INSERVice getting current user")
    return this.http.get('/getuser');

  }
  getUsers() :any {
    console.log("INSERVice getting all users")
    return this.http.get('/getallusers');
  }     
  removeSessionid() :any {
    console.log("INSERVICE removing sessionId")
    return this.http.get('/removesessionid/');
  }     

  getContact(userid: string) :any {
    console.log("INSERVICE getting contact")
    return this.http.get('/getcontact/'+userid);
  }     
  getSessionid() :any {
    console.log("INSERVICE getting sessionId")
    return this.http.get('/getsessionid/');
  }     
  passReg(user) :any { 
    console.log("INSERVICE", user)
      return this.http.post('/postreg', user);
     // return this.http.get('/notsget');
    }
    passLog(user) :any { 
 //     console.log("INSERVICE", user)
        return this.http.post('/postlog', user);
       // return this.http.get('/notsget');
      }


}
