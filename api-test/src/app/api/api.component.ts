import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor(private apiClientService: ApiClientService) { }

  data: any = [];

  ngOnInit(): void {
    const user_list_url: string = "/hello/getList";
    this.apiClientService.getApiData(user_list_url).subscribe(data => this.data = data);
  }

}
