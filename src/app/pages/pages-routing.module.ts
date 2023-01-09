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

    //TODO Corregir lo de abajo ya que no va
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
