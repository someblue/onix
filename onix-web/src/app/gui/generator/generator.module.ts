import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeneratorComponent } from './generator.component';

@NgModule({
  declarations: [GeneratorComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [GeneratorComponent],
})
export class GeneratorModule { }
