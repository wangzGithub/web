import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiComponent } from './api/api.component';
import { fromEventPattern } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module.module';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LeftComponent } from './main/left/left.component';
import { RightComponent } from './main/right/right.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// 引入拦截器，处理访问后端接口状态
import { IntercepterService } from './intercepter.service';
// 引入dashboard下的总module
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [
    AppComponent,
    ApiComponent,
    LoginComponent,
    MainComponent,
    LeftComponent,
    RightComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DashboardModule,
    MaterialModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: IntercepterService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
