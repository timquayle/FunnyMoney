import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogregComponent} from './logreg/logreg.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HistoryComponent } from './history/history.component';
import {RulesComponent} from './rules/rules.component';
import {SymgraphComponent} from './symgraph/symgraph.component';
import {SymgraphdailyComponent} from './symgraphdaily/symgraphdaily.component';
const routes: Routes = [{ path: '', component:  LogregComponent }, {path: 'home', component: HomepageComponent},
{ path: 'leaderboard', component: LeaderboardComponent },{ path: 'history', component: HistoryComponent },
{ path: 'rules', component: RulesComponent },{ path: 'history/:symbol', component: SymgraphComponent },
{ path: 'history/daily/:symbol', component: SymgraphdailyComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
