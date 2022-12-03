import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CxpInventarioComponent } from './cxp-inventario.component';
import { CxpRegistroInventarioComponent } from './cxp-registro-inventario/cxp-registro-inventario.component';

const routes: Routes = [{
  path: '',
  component: CxpInventarioComponent,
  children: [
    {
      path: 'reg-inventario',
      component: CxpRegistroInventarioComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CxpInventarioRoutingModule { }

export const cxpInventarioRouterComponents = [
  CxpInventarioComponent,
  CxpRegistroInventarioComponent
];
