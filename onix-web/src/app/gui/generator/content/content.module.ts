import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ContentComponent } from './content.component';

@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
  ],
  exports: [ContentComponent],
})
export class ContentModule { }
