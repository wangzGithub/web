import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-right',
  templateUrl: './right.component.html',
  styleUrls: ['./right.component.css']
})
export class RightComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toWrong() {
    this.router.navigate(['wrong']);
  }
}
