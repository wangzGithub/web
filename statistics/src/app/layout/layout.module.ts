import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModuleModule } from '../material-module/material-module.module';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { BaseComponent } from './base/base.component';
import { InOutTypeComponent } from './base/in-out-type/in-out-type.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    BaseComponent,
    InOutTypeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MaterialModuleModule
  ]
})
export class LayoutModule { }
