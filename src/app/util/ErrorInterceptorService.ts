import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import {tap,filter, catchError} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

export class ErrorInterceptorService implements HttpInterceptor{
  
  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    console.log('req', req);
    return next.handle(req).pipe(
      filter(event => event instanceof HttpResponse),
      tap((event: HttpResponse<any>) => {
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 0) {
          this.router.navigate(['/login']);
          return throwError("Veuillez vous reconnecter");
        } else {
          console.log('interceptor :', error);
          return throwError(error.error);
        }
      })
    );
    
  }
}