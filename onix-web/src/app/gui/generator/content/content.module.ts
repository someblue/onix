import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { ContentComponent } from './content.component';
import { EditorTabsComponent } from './editor-tabs.component';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [ContentComponent, EditorTabsComponent, EditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    NgZorroAntdModule,
    MonacoEditorModule,
  ],
  exports: [ContentComponent],
})
export class ContentModule { }
