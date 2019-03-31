import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FlexLayoutModule,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule { }
