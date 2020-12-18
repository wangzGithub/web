import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';
import { Md5 } from 'ts-md5';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private apiClientService: ApiClientService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  toMain() {
    const username = 'wangz';
    const password = '@#&$)(oyt';
    localStorage.setItem('user', username + password);
    this.router.navigate(['main']);
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }

  user: any = {username: '', password: ''}
  data: any = {code: 0, message: '', token: ''};

  loginToApi() {
    // 输入用户名，密码，密码进行MD5加密后传到后台接口
    if (this.user.password != '') {
      this.user.password = Md5.hashStr(this.user.password);
    }
    this.apiClientService.postApiData("/login", this.user).subscribe(data => {
      this.data = data;
      console.log(this.data);
      if (this.data.code == 1) {
        this.openSnackBar('用户名密码不能为空，请重新输入');
      } else if (this.data.code == 2) {
        this.openSnackBar('无用户，请检查用户名密码');
      } else {
        localStorage.setItem('user', this.data.token);
        this.router.navigate(['dashboard']);
      }
    });
  }

  openSnackBar(message: string) {
    this.matSnackBar.open(message, '确认', {
      duration: 2000,
    });
  }

}
