import { PagesComponent } from './pages.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'root',
      loadChildren: () => import('./root/root.module')
        .then(m => m.RootModule),
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
      path: 'cmb/logistica',
      loadChildren: () => import('./coembal/cmb-logistica/cmb-logistica.module')
        .then(m => m.CmbLogisticaModule)
    },
    {
      path: 'cmb/extrusion',
      loadChildren: () => import('./coembal/cmb-extrusion/cmb-extrusion.module')
        .then(m => m.CmbExtrusionModule)
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
