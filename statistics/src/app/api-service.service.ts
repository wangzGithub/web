import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // api 接口处理

  constructor(private httpClient: HttpClient) { }

  data: any = [];

  // GET
  getApiData(url: string) {
    return this.httpClient.get("/api" + url);
  }
  
  // POST
  postApiData(url: string, params: any) {
    return this.httpClient.post("/api" + url, params);
  }
}
