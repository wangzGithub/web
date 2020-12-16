import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    let status: boolean = false;
    status = localStorage.getItem('user') != null ? true : false;
    if (!status) {
      this.router.navigate(['']);
    }
    return status;
  }
  
}
