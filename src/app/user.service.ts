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
  employeeStream = new ReplaySubject();
  employee;
  constructor(private _http: HttpClient, private router: Router) {
    this.userAuthToken = localStorage.getItem('user-token') || '';
    if (this.userAuthToken) {
      this.decodeToken();
    }
  }

  getUserStream() {
    return this.userStream;
  }

  getEmployeeStream() {
    return this.employeeStream;
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

  getEmployee() {
    return this.employee;
  }

  doLogout() {
    localStorage.removeItem('user-token');
    this.router.navigate(['/home']);
    return true;
  }

  doLogin(credentials) {
    const url = 'http://localhost:8081/login';
    this._http.post(url, credentials)
      .subscribe((e: any) => {
        this.userAuthToken = e.token;
        localStorage.setItem('user-token', e.token);
        this.decodeToken();
        this.userStream.next({ isLoggedIn: true });
        if (this.role === "ROLE_SUPER") {
            this.router.navigate(['employee']);
          }
        if (this.role === "ROLE_PROJECT_MANAGER") {
            this.router.navigate(['orderedServices']);
          }
        if (this.role ==='ROLE_TEAM_MANAGER') {
            this.router.navigate(['orderedTasks']);
          }
        if (this.role ==='ROLE_PRODUCT_MANAGER') {
            this.router.navigate(['dashboard']);
          }
        if (this.role === 'ROLE_TEAM_MEMBER') {
            this.router.navigate(['orderedTask']);
          }
        if (this.role === 'ROLE_SERVICE_MANAGER') {
            this.router.navigate(['serviceManager']);
          }
      }, error => {
        this.userStream.next({ isLoggedIn: false });
      });
  }
  decodeToken() {
    let decoded = jwt_decode(this.userAuthToken);
    this.employee = decoded['employee'];
    // this.team = this.employee.team;
    this.role = decoded['autho'][0].authority;
    this.user = decoded['sub'];
    this.employeeStream.next({ employee: this.employee });
  }
}
