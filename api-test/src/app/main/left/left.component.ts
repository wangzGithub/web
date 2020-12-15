import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-left',
  templateUrl: './left.component.html',
  styleUrls: ['./left.component.css']
})
export class LeftComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toLogin() {
    this.router.navigate(['']);
  }

}
