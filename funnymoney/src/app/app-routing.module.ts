import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogregComponent} from './logreg/logreg.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HistoryComponent } from './history/history.component';
import {RulesComponent} from './rules/rules.component';
import {SymgraphComponent} from './symgraph/symgraph.component';
import {SymgraphdailyComponent} from './symgraphdaily/symgraphdaily.component';
import {AuthGuard} from './auth.guard';
import {NotfoundComponent} from './notfound/notfound.component';
const routes: Routes = [{ path: '', component:  LogregComponent }, 
{path: 'home', component: HomepageComponent,
canActivate: [AuthGuard]
},
{ path: 'leaderboard', component: LeaderboardComponent,canActivate: [AuthGuard] },
{ path: 'history', component: HistoryComponent , canActivate: [AuthGuard]},
{ path: 'rules', component: RulesComponent,canActivate: [AuthGuard] },
{ path: 'history/:symbol', component: SymgraphComponent,canActivate: [AuthGuard]},
{ path: 'history/daily/:symbol', component: SymgraphdailyComponent, canActivate: [AuthGuard]},
{path: '404', component: NotfoundComponent},
 {path: '**', redirectTo: '/404'}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
