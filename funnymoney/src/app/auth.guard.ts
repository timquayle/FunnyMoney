import {CanActivate, ActivatedRouteSnapshot,RouterStateSnapshot,Router} from '@angular/router';
import {Injectable} from '@angular/core';

import {AuthService} from './authservice.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private route: Router) {}
    canActivate(route: ActivatedRouteSnapshot, status: RouterStateSnapshot): boolean{
 const isAuthed =  this.auth.isAuthed();
 if(!isAuthed){
this.route.navigate(['/'])
   
}
return isAuthed;
}

}