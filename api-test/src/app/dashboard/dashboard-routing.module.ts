import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
// 引入路由守卫
import { LoginGuard } from '../login.guard';
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
