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
# Angular 引入Material组件
## install Angular Material
```typescript
ng add @angular/material
```
### 需要注意material的版本号要与angular的版本号保持一致
## app.module.ts中引入material
### 以引入滑块为例子
```typescript
import { MatSliderModule } from '@angular/material/slider';
@ngModule({
  imports: [
    MatSliderModule
  ]
})
```
### 在html中使用滑块
```html
<mat-slider min="1" max="100" step="1" value="1"></mat-slider>
```
## material各组件需要分别引入，如果需要引入slider、button、icon则需要在app.module.ts中分别引入，如：
```typescript
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@auglar/material/button';
import { MatIconModule } from '@angular/material/icon';
@ngModule({
  imports: [
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ]
})
```
## 在引入大量material组件后app.module.ts会变得复杂繁琐，可以考虑将material的组件引入分离出来单独引入
1. `ng generate module material-module`创建module文件
2. 删除app.module.ts中关于material组件的引入代码，重新引入material-module文件
```typescript
import { MaterialModule } from './material-module.module';
imports: [
  MaterialModule
]
```
3. 在material-module.module.ts中引入关于material组件的引入
```typescript
import { NgModule} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  imports: [  // 引入
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [  // 导出
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule {}
```
# 路由配置，页面跳转
## 如何从登录页跳转到首页，出现无效路由地址时跳转到404页面
### 新建测试组件
```typescript
ng generate component login --module=app.module
ng generate component main --module=app.module
ng generate component main/left --module=app.module
ng generate component main/right --module=app.module
ng generate component page-not-found --module=app.module
```
> 因为测试项目中存在两个module文件，使用`ng g component xxx`命令新建组件时会报错，需要指定引入组件的module`--module=app.module`
### 在app-routing.module.ts中建立路由
> 具体配置见app-routing.module.ts文件
### 在各页面使用router新建跳转到各页面的方法
### 在app.component.html和main.component.html中各自使用一个<router-outlet></router-outlet>标签
> `<router-outlet></router-outlet>`标签中会显示对应页面的内容，因为建立了二级路由的原因，login、mian、page-not-found跳转的页面会显示在app.component.html下，
> 而main/left, main/right跳转的页面会显示在main.component.html中的`<router-outlet></router-outlet>`标签下，
> 具体应用可以设置为登录页面登录后进入首页，首页下拉菜单中的子路由显示在各自的上级路由页面，错误页面同样单独显示