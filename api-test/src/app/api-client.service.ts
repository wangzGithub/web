import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private httpClient: HttpClient) { }

  getApiData(url:string) {
    return this.httpClient.get("/api" + url);
  }

  postApiData(url: string, params: any) {
    return this.httpClient.post("/api" + url, {params: params});
  }
}
