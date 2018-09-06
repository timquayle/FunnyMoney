import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { User } from './models/user';
import { Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private base = '/api/auth';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(user: User) {
    return this.http.post<User>(`${this.base}/login`, user);
  }
  register(user: User) {
    return this.http.post<User>(`${this.base}/register`, user);
  }
  logout() {
    return this.http.delete(`${this.base}/logout`);
  }

  isAuthed(): boolean {
    const expired = parseInt(this.cookieService.get('expiration'), 10);
    const userID = this.cookieService.get('userID');

    const session = this.cookieService.get('session');
    console.log('session:',session)
   return session && expired  && userID && expired > Date.now();
  }
}
