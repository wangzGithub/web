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
# 拆分路由，增加路由守卫和接口拦截器
## 新建测试组件
```typescript
ng generate component dashboard
ng generate module dashboard
ng generate module dashboard-routing
```
> 将dashboard.module和dashboard-routing移到dashboard文件夹下
## 删除app.module中引入的dashboardcomponent
## 分别在dashboard.module和dashboard-routing中分别配置dashboard下的组件和路由
```typescript
···
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module.module';
// 导入dashboard下的所有component
import { DashboardComponent } from './dashboard.component';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class DashboardModule { }
```
```typescript
// 为dashboard下的所有组件设置routing
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutingModule { }
```
> 如果要在danhboard.component.html中使用`<router-outlet></router-outlet>`标签，需要在dashboard.module中引入RouterModule,如果需要使用material样式同样需要引入MaterialModule,
> 因为dashboard.module没有引入app.module中声明的组件，所以需要单独引入
## 将dashboard.module引入app.module,将dashboard-routing.module引入app-routing.module
# 增加路由守卫
## 新建路由守卫文件
```typescript
ng generate guard login
```
## 简单配置文件内容
```typescript
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate() {
    let status: boolean = false;
    status = localStorage.getItem('user') != null ? true : false;
    if (!status) {
      this.router.navigate(['']);
    }
    return status;
  }
  
}
```
> 简单判断localStorage中是否存在user,如果存在返回true可以访问路由，否则返回到登录页面
## 在需要判断登录状态的路径后加入路由守卫, 以dashboard为例，在dashboard-routing中加入以下代码
```typescript
// 引入路由守卫
import { LoginGuard } from '../login.guard';
const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]
  }
]
```
# 增加拦截器，对访问后台接口的方法进行统一拦截操作，可以为请求增加Header，也可以根据返回状态进行自定义操作
## 新增拦截器
```typescript
ng generate service intercepter
```
## 写入如下代码
```typescript
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class IntercepterService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(localStorage.getItem('user'));
    const token = localStorage.getItem('user');
    const resetReq = req.clone({setHeaders: {'token': token}});
    return next.handle(resetReq).pipe(
      catchError(error => {
        console.log(error, '后端接口报错');
        console.log(error.status);
        if (error.status == 404) {
          this.router.navigate(['page-not-found']);
        } else {
          this.router.navigate(['']);
        }
        throw error;
      })
    );
  }
}
```
## 引入拦截器, 在app.module中加入如下代码
```typescript
// 引入拦截器，处理访问后端接口状态
import { IntercepterService } from './intercepter.service';
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true }
  ],
```
