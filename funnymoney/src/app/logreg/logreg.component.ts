import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgForm} from '@angular/forms';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-logreg',
  templateUrl: './logreg.component.html',
  styleUrls: ['./logreg.component.css']
})
export class LogregComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }
regFlag: boolean=false;
passShort: boolean =false;
passmm: boolean =false;
badlogin: boolean = false;
badlogin_5times: boolean = false;

ngOnInit() {
  }
  onLogin(event: Event,form: NgForm){
    event.preventDefault();
   // console.log("VALUES ",form.value);
    let observer = this.userService.passLog(form.value);
    observer.subscribe(
    (response) =>{
    //  console.log("response",response);
      if(response==="valid"){
        console.log("VALLLLLID!")
        this.badlogin=false;
        this.router.navigate(['/home']);
        }
        else if(response==="invalidlogin"){
          console.log(" Bad username!")
          this.badlogin=true;
          this.badlogin_5times=false;
        }
          else if(response==="invalidpassword"){
            console.log(" Bad password!!")
            this.badlogin=true;
            this.badlogin_5times=false; 
          } 
          else if(response==="5timesbad"){
            console.log("5 Bad passwords!!")
            this.badlogin_5times=true;
          } 
     },

     (Error) =>{
      console.log("Error",Error);
              }
            )
          }        
  regUser(event: Event){
    event.preventDefault();
    this.regFlag=true;
     console.log("Reg ClickED!")
  }

  onReg(event: Event,form: NgForm){
    event.preventDefault();
  //  console.log("VALUES ",form.value);
    if(form.value.password.length < 8){
      console.log("password too short!")
      this.passShort=true;
    }
    else if(form.value.password != form.value.cpassword){
      this.passmm=true;
    }
   else {
     this.passmm=false;
     this.passShort=false;
    let observer = this.userService.passReg(form.value);
    observer.subscribe(
    (response) =>{
      console.log("response",response);               
      this.router.navigate(['/rules']);   
  
    },
     (Error) =>{
      console.log("Error",Error);
     }          
    )
      }
  }                
                    
}
