import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
mygnls = [];
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    let o = this.apiService.getallUsergnl();
    o.subscribe( (response) =>{ this.mygnls = response;
      console.log("all my stox",this.mygnls);
  
  }
    )
  
  }

}
