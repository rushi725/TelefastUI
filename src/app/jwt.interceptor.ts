import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpHeaderResponse, HttpResponse, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserService } from './user.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public userService:UserService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if(request.url.split('/')[3]==="login"){}else{
    request = request.clone({
      setHeaders: {
      Authorization: `Bearer ${this.userService.getUserAuthToken()}`
      }
    });
}
    //console.log('headers:', request.headers,this.auth.getToken()) // <---- I can see headers in console output

    return next.handle(request);
  }
}