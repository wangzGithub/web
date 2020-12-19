import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}
  canActivate() {
    // 路由守卫，判断localStorage中是否存在token
    let status: boolean = false;
    status = localStorage.getItem('token') != null ? true : false;
    if (!status) {
      this.router.navigate(['']);
    }
    return status;
  }
  
}
