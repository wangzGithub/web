import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private apiClientService: ApiClientService) { }

  ngOnInit(): void {
  }

  data: any = [];

  getUserList() {
    this.apiClientService.getApiData('/hello/getList').subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

}
