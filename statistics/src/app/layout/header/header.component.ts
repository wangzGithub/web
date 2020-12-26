import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmServiceComponent } from '../../confirm-service/confirm-service.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  username: any = '';
  data: any = {code: 1, message: ''};

  ngOnInit(): void {
    this.username = localStorage.getItem('username');
  }

  // 登出
  logout() {
    const dialogRef = this.dialog.open(ConfirmServiceComponent, {
      width: '250px',
      data: {type: 'logout'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.router.navigate(['']);
      }
    });
  }

}
