import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'root',
      loadChildren: () => import('./root/root.module')
        .then(m => m.RootModule)
    },
    {
      path: 'logistica',
      loadChildren: () => import('./coexpan/logistica/logistica.module')
        .then(m => m.LogisticaModule)
    },
    {
      path: 'extrusion',
      loadChildren: () => import('./coexpan/extrusion/extrusion.module')
        .then(m => m.ExtrusionModule)
    },
    {
      path: '',
      redirectTo: 'root',
      pathMatch: 'full',
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class PagesRoutingModule { }
