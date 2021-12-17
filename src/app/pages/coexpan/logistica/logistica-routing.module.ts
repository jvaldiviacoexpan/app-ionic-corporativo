import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticaComponent } from './logistica.component';
import { AMenuLogisticaComponent } from './a-menu-logistica/a-menu-logistica.component';


const routes: Routes = [{
  path: '',
  component: LogisticaComponent,
  children: [
    {
      path: 'menu-logistica',
      component: AMenuLogisticaComponent,
    },
    {
      path: 'etqem',
      loadChildren: () => import('./etq-entrada-mercancia/etq-entrada-mercancia.module')
        .then(m => m.EtqEntradaMercanciaModule)
    },
    {
      path: 'em',
      loadChildren: () => import('./entrada-mercancia/entrada-mercancia.module')
        .then(m => m.EntradamercanciaModule)
    },
    {
      path: 'inv',
      loadChildren: () => import('./cxp-inventario/cxp-inventario.module')
        .then(m => m.CxpInventarioModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LogisticaRoutingModule { }

export const logisticaRouterComponents = [
  LogisticaComponent,
  AMenuLogisticaComponent,
];
