import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService,
  private router: Router) { }

  ngOnInit() {
  }
  logOff(event: Event){
    console.log("LOGOFF CLICKED!")
    event.preventDefault();
    let ob =  this.userService.removeSessionid()
     ob.subscribe(
     (response) =>{
  
         console.log('returned',response);
         this.router.navigate(['/']); 
        },
  
     (Error) =>
      { console.log("Error",Error);  }
  
  
     )
      
      
  
  }
}
