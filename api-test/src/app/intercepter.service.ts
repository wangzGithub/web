import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class IntercepterService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('user');
    let resetReq = null;
    if (token != null) {
      resetReq = req.clone({setHeaders: {'token': token}});
    } else {
      resetReq = req.clone();
    }
    return next.handle(resetReq).pipe(
      catchError(error => {
        console.log(error, '后端接口报错');
        console.log(error.status);
        if (error.status == 404) {
          this.router.navigate(['page-not-found']);
        } else {
          this.router.navigate(['']);
        }
        throw error;
      })
    );
  }
}
