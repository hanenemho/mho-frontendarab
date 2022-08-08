import { Injectable } from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenStorageService } from './token-storage.service';

import { map, catchError } from 'rxjs/operators';
const TOKEN_HEADER_KEY = 'Authorization';
const CONTENT_TYPE_KEY = 'Content-Type';
const ACCEPT_KEY = 'Accept';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //  const token = this.token.getToken();
    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('username')!=null) {
     req = req.clone({
        setHeaders: {
         // 'Content-Type' : 'application/json; charset=utf-8',
          'Accept'       : 'application/json',
          'Authorization':  sessionStorage.getItem('token')
          //'Access-Control-Allow-Origin': '*'
        },
      });
      /*
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
      authReq = req.clone({ headers: req.headers.set(CONTENT_TYPE_KEY, 'application/json') });
      authReq = req.clone({ headers: req.headers.set(ACCEPT_KEY, 'application/json') });
      */
    }
    return next.handle(req);
  }
}