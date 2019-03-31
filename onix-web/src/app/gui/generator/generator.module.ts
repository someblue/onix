import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { ContentModule } from './content/content.module';
import { GeneratorComponent } from './generator.component';
import { HeaderModule } from './header/header.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    HeaderModule,
    SidebarModule,
    ContentModule,
  ],
  entryComponents: [GeneratorComponent],
})
export class GeneratorModule { }
