import { Routes, RouterModule } from '@angular/router';
import { ExtrusionComponent } from './extrusion.component';
import { NgModule } from '@angular/core';
import { AMenuExtrusionComponent } from './a-menu-extrusion/a-menu-extrusion.component';
import { RegistroParadasComponent } from './registro-paradas/registro-paradas.component';
import { ModalRegistroParadaComponent } from './registro-paradas/modal-registro-parada/modal-registro-parada.component';
import { ModalRegistroCausaComponent } from './registro-paradas/modal-registro-parada/modal-registro-causa/modal-registro-causa.component';
import { CxpEmisionPalletComponent } from './cxp-emision-pallet/cxp-emision-pallet.component';
import { AuthGuard } from '@auth0/auth0-angular';



const routes: Routes = [{

  path: '',
  component: ExtrusionComponent,
  children: [
    {
      path: 'menu-extrusion',
      component: AMenuExtrusionComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'reg-paradas',
      component: RegistroParadasComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'emision-pallet',
      component: CxpEmisionPalletComponent,
      canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ExtrusionRoutingModule { }

export const extrusionRouterComponents = [
  ExtrusionComponent,
  AMenuExtrusionComponent,
  RegistroParadasComponent,
  ModalRegistroParadaComponent,
  ModalRegistroCausaComponent,
  CxpEmisionPalletComponent
];
