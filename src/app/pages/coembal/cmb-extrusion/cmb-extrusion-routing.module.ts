import { Routes, RouterModule } from '@angular/router';
import { CmbExtrusionComponent } from './cmb-extrusion.component';
import { CmbMenuExtrusionComponent } from './cmb-menu-extrusion/cmb-menu-extrusion.component';
import { CmbEmisionPalletCajaComponent } from './cmb-emision-pallet-caja/cmb-emision-pallet-caja.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '@auth0/auth0-angular';



const routes: Routes = [{
  path: '',
  component: CmbExtrusionComponent,
  children: [
    {
      path: 'menu-extrusion',
      component: CmbMenuExtrusionComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'etq-emision-pallet',
      component: CmbEmisionPalletCajaComponent,
      canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmbExtrusionRoutingModule { }

export const cmbExtrusionRouterComponents = [
  CmbExtrusionComponent,
  CmbMenuExtrusionComponent,
  CmbEmisionPalletCajaComponent,
];
