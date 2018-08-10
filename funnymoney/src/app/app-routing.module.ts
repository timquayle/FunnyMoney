import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogregComponent} from './logreg/logreg.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HistoryComponent } from './history/history.component';
const routes: Routes = [{ path: '', component:  LogregComponent }, {path: 'home', component: HomepageComponent},
{ path: 'leaderboard', component: LeaderboardComponent },{ path: 'history', component: HistoryComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
