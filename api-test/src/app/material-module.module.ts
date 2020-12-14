import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ],
    exports: [
        MatButtonModule,
        MatDividerModule,
        MatIconModule
    ]
})
export class MaterialModule {}