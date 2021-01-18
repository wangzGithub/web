import { Component, OnInit } from '@angular/core';
import { Md5 } from 'ts-md5';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private matSnackBar: MatSnackBar,
    private apiServive: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  title: string = "账单统计系统";

  user: any = {username: '', password: ''};
  data: any = {code: 1, 'message': '', token: '', userId: '', username: ''};

  toLogin() {
    // check params
    if (this.user.username == '') {
      this.openSnackBar('username不能为空!', '确认');
    } else if (this.user.password == '') {
      this.openSnackBar('password不能为空!', '确认');
    } else {
      // get user from api
      this.user.password = Md5.hashStr(this.user.password);
      this.apiServive.postApiData("/login", this.user).subscribe(data => {
        this.data = data;
        if (this.data.code == 1) {
          this.openSnackBar('用户名密码不能为空!', '确认');
        } else if (this.data.code == 2) {
          this.openSnackBar('无用户，请检查用户名密码!', '确认');
        } else {
          localStorage.setItem('token', this.data.token);
          localStorage.setItem('userId', this.data.userId);
          localStorage.setItem('username', this.data.username);
          this.router.navigate(['layout']);
        }
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, { duration: 3000 });
  }
}
