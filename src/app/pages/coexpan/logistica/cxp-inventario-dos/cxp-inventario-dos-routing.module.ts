import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CxpInventarioDosComponent } from './cxp-inventario-dos.component';
import { CxpRegistroInventarioDosComponent } from './cxp-registro-inventario-dos/cxp-registro-inventario-dos.component';

const routes: Routes = [{
  path: '',
  component: CxpInventarioDosComponent,
  children: [
    {
      path: 'reg-inventario-dos',
      component: CxpRegistroInventarioDosComponent
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CxpInvetarioDosRoutingModule { }

export const cxpInvetarioRouterComponents = [
  CxpInventarioDosComponent,
  CxpRegistroInventarioDosComponent
];
