import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {UserService} from './user.service';
import {ApiService} from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogregComponent } from './logreg/logreg.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule}from  '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HistoryComponent } from './history/history.component';
import { RulesComponent } from './rules/rules.component';
import { SymgraphComponent } from './symgraph/symgraph.component';
import { SymgraphdailyComponent } from './symgraphdaily/symgraphdaily.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LogregComponent,
    HomepageComponent,
    LeaderboardComponent,
    HistoryComponent,
    RulesComponent,
    SymgraphComponent,
    SymgraphdailyComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [UserService,ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
