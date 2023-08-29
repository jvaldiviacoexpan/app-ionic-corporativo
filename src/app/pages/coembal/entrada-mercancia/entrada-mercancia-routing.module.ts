import { Routes, RouterModule } from '@angular/router';
import { EntradaMercanciaComponent } from './entrada-mercancia.component';
import { MenuEntradaMercanciaComponent } from './menu-entrada-mercancia/menu-entrada-mercancia.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { NgModule } from '@angular/core';
import { PtCajaComponent } from './pt-caja/pt-caja.component';
import { EmMateriasPrimasComponent } from './em-materias-primas/em-materias-primas.component';
import { ReimprimirPtCajaComponent } from './reimprimir-pt-caja/reimprimir-pt-caja.component';
import { EtiquetaBobinaComponent } from './etiqueta-bobina/etiqueta-bobina.component';
import { ReimprimirEtiquetaBobinaComponent } from './reimprimir-etiqueta-bobina/reimprimir-etiqueta-bobina.component';
import { EliminarEtiquetaBobinaComponent } from './eliminar-etiqueta-bobina/eliminar-etiqueta-bobina.component';
import { EmPalletBobinaComponent } from './em-pallet-bobinas/em-pallet-bobinas.component';
import { MolerExtrusionComponent } from '../inventario/moler-extrusion/moler-extrusion.component';
import { ReimprimirEtiquetaBobinaSapComponent } from './reimprimir-etiqueta-bobina-sap/reimprimir-etiqueta-bobina-sap.component';


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
    },
    {
      path: 'etiqueta-pallet-bobinas',
      component: EtiquetaBobinaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'reimprimir-etiqueta-pallet-bobinas',
      component: ReimprimirEtiquetaBobinaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'reimprimir-etiqueta-bobinas-sap',
      component: ReimprimirEtiquetaBobinaSapComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'eliminar-etiqueta-pallet-bobinas',
      component: EliminarEtiquetaBobinaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'em-pallet-bobina',
      component: EmPalletBobinaComponent,
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
  ReimprimirPtCajaComponent,
  EtiquetaBobinaComponent,
  ReimprimirEtiquetaBobinaComponent,
  ReimprimirEtiquetaBobinaSapComponent,
  EliminarEtiquetaBobinaComponent,
  EmPalletBobinaComponent,
];
