import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticaComponent } from './logistica.component';
import { AMenuLogisticaComponent } from './a-menu-logistica/a-menu-logistica.component';
import { AuthGuard } from '@auth0/auth0-angular';


const routes: Routes = [{
  path: '',
  component: LogisticaComponent,
  children: [
    {
      path: 'menu-logistica',
      component: AMenuLogisticaComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'etqem',
      loadChildren: () => import('./etq-entrada-mercancia/etq-entrada-mercancia.module')
        .then(m => m.EtqEntradaMercanciaModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'em',
      loadChildren: () => import('./entrada-mercancia/entrada-mercancia.module')
        .then(m => m.EntradamercanciaModule),
      canActivate: [AuthGuard]
    },
    {
      path: 'inv',
      loadChildren: () => import('./cxp-inventario/cxp-inventario.module')
        .then(m => m.CxpInventarioModule),
      canActivate: [AuthGuard]
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
