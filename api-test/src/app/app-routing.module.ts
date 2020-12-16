import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApiComponent } from './api/api.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { LeftComponent } from './main/left/left.component';
import { RightComponent } from './main/right/right.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// 引入dashboard下的路由配置
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';

const routes: Routes = [
  {
    path: '', component: LoginComponent
  },
  { 
    path: 'api', component: ApiComponent 
  },
  {
    path: 'main', component: MainComponent,
    children: [
      {
        path: 'left', component: LeftComponent
      },
      {
        path: 'right', component: RightComponent
      }
    ]
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardRoutingModule
  ],
  exports: [
    RouterModule,
    DashboardRoutingModule
  ]
})
export class AppRoutingModule { }
