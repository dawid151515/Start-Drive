import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { RegisterLoginService } from '../service/register-login-service/register-login.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private registerLoginService: RegisterLoginService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.registerLoginService.getToken() || ""

    var authReq = request.clone({
      setHeaders: {'Authorization': `Bearer ${myToken}`}
    })

    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if(err instanceof HttpErrorResponse){
          if(err.status === 401){
            this.router.navigate(['/startDrive/logowanie'])
          }else if(err.status === 403){
            this.router.navigate(['/startDrive/logowanie'])
          }
        }
        return throwError(() => new Error("Coś poszło nie tak"))
      })
    );
  }
}
