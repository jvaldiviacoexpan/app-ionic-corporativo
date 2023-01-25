
import { Routes, RouterModule } from '@angular/router';
import { CmbRegistroParadasComponent } from './cmb-registro-paradas/cmb-registro-paradas.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { CxpRegistroParadasComponent } from './cxp-registro-paradas/cxp-registro-paradas.component';
import { NgModule } from '@angular/core';
import { RegistroParadasComponent } from '../cmb-extrusion/registro-paradas/registro-paradas.component';
import { MenuRegistroParadasComponent } from './menu-registro-paradas/menu-registro-paradas.component';
import { CmbModalRegistroParadaComponent } from './cmb-registro-paradas/cmb-modal-registro-parada/cmb-modal-registro-parada.component';
import { ModalRegistroParadaComponent } from './cxp-registro-paradas/modal-registro-parada/modal-registro-parada.component';
import { CmbModalRegistroCausaComponent }
  from './cmb-registro-paradas/cmb-modal-registro-parada/cmb-modal-registro-causa/cmb-modal-registro-causa.component';
import { ModalRegistroCausaComponent } from
  './cxp-registro-paradas/modal-registro-parada/modal-registro-causa/modal-registro-causa.component';


const routes: Routes = [{
  path: '',
  component: RegistroParadasComponent,
  children: [
    {
      path: 'menu',
      component: MenuRegistroParadasComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'rgp-coembal',
      component: CmbRegistroParadasComponent,
      canActivate: [AuthGuard],
    },
    {
      path: 'rgp-coexpan',
      component: CxpRegistroParadasComponent,
      canActivate: [AuthGuard],
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class RegistroParadasRoutingModule { }

export const registroParadasRouterComponents = [
  RegistroParadasComponent,
  MenuRegistroParadasComponent,
  CmbRegistroParadasComponent,
  CmbModalRegistroParadaComponent,
  CmbModalRegistroCausaComponent,
  CxpRegistroParadasComponent,
  ModalRegistroParadaComponent,
  ModalRegistroCausaComponent,
];
