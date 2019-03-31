import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratorComponent } from 'app/gui/generator/generator.component';

const routes: Routes = [
    { path: 'generator', component: GeneratorComponent },
    {
        path: '',
        redirectTo: '/generator',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
