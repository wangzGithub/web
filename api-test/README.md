---
tags: [Import-6a27]
title: Angular 项目增加Api数据接口
created: '2020-12-05T10:21:29.223Z'
modified: '2020-12-05T13:31:43.674Z'
---

# Angular 项目增加Api数据接口
## 增加数据接口URL配置文件proxy.config.json
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```
__target__
_指明数据接口URL_
__changeOrigin__
_允许跨域_
__pathRewrite__
_将指定的字符替换_
---
## 在angular.json中引入配置
```json
"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "api-test:build",
    "proxyConfig": "proxy.config.json"
  }
}
```
## 在app.module.ts中声明httpClientModule
```typescript
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    HttpClientModule
  ]
})
```
## 创建访问数据接口的service
### 创建文件
`ng generate service api-client`
### 输入以下代码
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  constructor(private httpClient: HttpClient) {}
  getApiData(url: string) {
    return this.httpClient.get("/api", + url);
  }
}
```
## 在需要的模块引入Service访问接口
```typescript
import { ApiClientService } from '../api-client.service';
...
export class ApiComponent implements OnInit {
  constructor(private apiClientService: ApiClientService) {}
  data: any = [];
  ngOnInit(): void {
    const user_list_url: string = "/hello/getList";
    this.apiClientService.getAliData(user_list_url).subscribe(data => this.data = data);
  }
}
```