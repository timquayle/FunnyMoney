import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
users = [];
  constructor(private apiService: UserService) { }

  ngOnInit() {
    this.apiService.getUsers()
    .subscribe(response =>{
     this.users=response;
     console.log("THIS IS RESPONSE",this.users);
     
     this.users.sort(function (a, b) {
      return b.score - a.score;
   //console.log("SORTED USERS:",this.users);
    });
    



    })


  }

}
