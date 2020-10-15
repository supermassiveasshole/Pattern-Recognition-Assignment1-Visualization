import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataVisualComponent } from './data-visual.component';



@NgModule({
  declarations: [DataVisualComponent],
  imports: [
    CommonModule
  ],
  exports: [
    DataVisualComponent,
  ]
})
export class DataVisualModule { }
