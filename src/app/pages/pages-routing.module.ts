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
        .then(m => m.RootModule),
    },
    {
      path: 'materias-primas',
      loadChildren: () => import('./coembal/materias-primas/materias-primas.module')
        .then(m => m.MateriasPrimasModule)
    },
    {
      path: 'inventario',
      loadChildren: () => import('./coembal/inventario/inventario.module')
        .then(m => m.InventarioModule)
    },
    {
      path: 'registro-paradas',
      loadChildren: () => import('./coembal/registro-paradas/registro-paradas.module')
        .then(m => m.RegistroParadasModule)
    },
    {
      path: 'entrada-mercancia',
      loadChildren: () => import('./coembal/entrada-mercancia/entrada-mercancia.module')
        .then(m => m.EntradaMercanciaModule)
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
