import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toLogin() {
    this.router.navigate(['']);
  }

  toLeft() {
    this.router.navigate(['main/left']);
  }

  toRight() {
    this.router.navigate(['main/right']);
  }

}
