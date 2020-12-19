import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // api 接口拦截器
    const token = localStorage.getItem('token');
    let resetReq = null;
    if (token != null) {
      resetReq = req.clone({setHeaders: {'token': token}});
    } else {
      resetReq = req.clone();
    }
    return next.handle(resetReq).pipe(
      catchError(error => {
        console.log(error, 'Restful Api has error');
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
