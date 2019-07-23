import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userAuthToken = '';
  user = '';
  role = '';
  userStream = new ReplaySubject();

  constructor(private _http: HttpClient, private router: Router) {
    this.userAuthToken = localStorage.getItem('user-token') || '';
    if (this.userAuthToken) {
      this.decodeToken();
    }
  }

  getUserStream() {
    return this.userStream;
  }

  getUserAuthToken() {
    if (this.userAuthToken) { return this.userAuthToken; }
  }

  isUserLoggedIn() {
    return this.userAuthToken !== '';
  }
  getUser() {
    return this.user;
  }
  getRoles() {
    return this.role;
  }

  doLogout() {
    localStorage.removeItem('user-token');
    return true;
  }

  doLogin(credentials) {
    const url = 'http://localhost:8081/login';
    this._http.post(url, credentials)
      .subscribe((e: any) => {
        this.userAuthToken = e.token;
        this.decodeToken();
        localStorage.setItem('user-token', e.token)
        this.userStream.next({ isLoggedIn: true })
        this.getRole().subscribe((e: any) => {
          this.role = e;
          console.log(e);
          if (this.role === 'ROLE_SUPER') {
            this.router.navigate(['employee'])
          }
        });

      }, error => {
        this.userStream.next({ isLoggedIn: false });
      });
  }
  decodeToken() {
    let decoded = jwt_decode(this.userAuthToken);
    this.user = decoded['sub'];

  }
  getRole() {
    let url = `http://localhost:8081/sfs/user/${this.user}/getUserRole`;
    return this._http.get(url);
  }

}
