import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { CmbInventarioComponent } from './cmb-inventario/cmb-inventario.component';
import { CxpInventarioComponent } from './cxp-inventario/cxp-inventario.component';
import { InventarioComponent } from './inventario.component';
import { MenuInventarioComponent } from './menu-inventario/menu-inventario.component';
import { CmbInventarioCorreaComponent } from './cmb-inventario-correa/cmb-inventario-correa.component';
import { CxpInventarioCorreaComponent } from './cxp-inventario-correa/cxp-inventario-correa.component';
import { TransferenciaStockComponent } from './transferencia-stock/transferencia-stock.component';
import { TransferenciaStockMasivoComponent } from './transferencia-stock-masivo/transferencia-stock-masivo.component';
import { TransferenciaStockMasivoModalComponent }
  from './transferencia-stock-masivo/transferencia-stock-masivo-modal/transferencia-stock-masivo-modal.component';
import { MolerExtrusionComponent } from './moler-extrusion/moler-extrusion.component';


const routes: Routes = [{
  path: '',
  component: InventarioComponent,
  children: [
    {
      path: 'menu-inventario',
      component: MenuInventarioComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inventario-coembal',
      component: CmbInventarioComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inventario-coexpan',
      component: CxpInventarioComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inventario-coembal-correa',
      component: CmbInventarioCorreaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'inventario-coexpan-correa',
      component: CxpInventarioCorreaComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'transferencia-stock',
      component: TransferenciaStockComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'transferencia-stock-masivo',
      component: TransferenciaStockMasivoComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'moler-extrusion',
      component: MolerExtrusionComponent,
      canActivate: [AuthGuard],
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventarioRoutingModule { }

export const inventarioRouterComponents = [
  InventarioComponent,
  MenuInventarioComponent,
  CmbInventarioComponent,
  CxpInventarioComponent,
  CmbInventarioCorreaComponent,
  CxpInventarioCorreaComponent,
  TransferenciaStockComponent,
  TransferenciaStockMasivoComponent,
  TransferenciaStockMasivoModalComponent,
  MolerExtrusionComponent,
];
