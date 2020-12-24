import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// material module文件
import { MaterialModuleModule } from './material-module/material-module.module';
// api接口拦截器
import { InterceptorService } from './interceptor.service';
// 总路由文件
import { AppRoutingModule } from './app-routing.module';
// 登录页面
import { LoginComponent } from './login/login.component';
// 404页面
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
//登录后的页面router-outlet
import { LayoutModule } from './layout/layout.module';
import { ConfirmServiceComponent } from './confirm-service/confirm-service.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    ConfirmServiceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModuleModule,
    LayoutModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
