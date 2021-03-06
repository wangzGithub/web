import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material-module.module';
// 导入dashboard下的所有component
import { DashboardComponent } from './dashboard.component';
import { TopComponent } from './top/top.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TopComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ]
})
export class DashboardModule { }
