import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LogregComponent} from './logreg/logreg.component';
import { HomepageComponent } from './homepage/homepage.component';
const routes: Routes = [{ path: '', component:  LogregComponent }, {path: 'home', component: HomepageComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
