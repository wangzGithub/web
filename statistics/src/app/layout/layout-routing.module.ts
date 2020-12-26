import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from '../login.guard';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
// 基础设置组件
import { BaseComponent } from './base/base.component';
import { InOutTypeComponent } from './base/in-out-type/in-out-type.component';
import { FundTypeComponent } from './base/fund-type/fund-type.component';

const routes: Routes = [
  {
    path: 'layout', component: LayoutComponent, 
    children: [
      {
        path: '', redirectTo: 'base', pathMatch: 'full'
      },
      {
        path: 'base', component: BaseComponent,
        children: [
          {
            path: '', redirectTo: 'in-out-type', pathMatch: 'full'
          },
          {
            path: 'in-out-type', component: InOutTypeComponent
          },
          {
            path: 'fund-type', component: FundTypeComponent
          }
        ]
      }
    ],
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }
