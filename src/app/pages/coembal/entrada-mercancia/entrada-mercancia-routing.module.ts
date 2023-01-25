import { Routes, RouterModule } from '@angular/router';
import { EntradaMercanciaComponent } from './entrada-mercancia.component';
import { MenuEntradaMercanciaComponent } from './menu-entrada-mercancia/menu-entrada-mercancia.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { PtCajaComponent } from './pt-caja/pt-caja.component';
import { EmMateriasPrimasComponent } from './em-materias-primas/em-materias-primas.component';
import { ReimprimirPtCajaComponent } from './reimprimir-pt-caja/reimprimir-pt-caja.component';


const routes: Routes = [{
  path: '',
  component: EntradaMercanciaComponent,
  children: [
    {
      path: 'menu',
      component: MenuEntradaMercanciaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'pt-caja',
      component: PtCajaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'reimprimir-pt-caja',
      component: ReimprimirPtCajaComponent,
      canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaMercanciaRoutingModule { }

export const entradaMercanciaRouterComponents = [
  EntradaMercanciaComponent,
  MenuEntradaMercanciaComponent,
  PtCajaComponent,
  EmMateriasPrimasComponent,
  ReimprimirPtCajaComponent
];
