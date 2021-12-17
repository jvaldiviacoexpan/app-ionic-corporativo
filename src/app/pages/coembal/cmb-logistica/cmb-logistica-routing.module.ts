import { Routes, RouterModule } from '@angular/router';
import { CmbLogisticaComponent } from './cmb-logistica.component';
import { CmbMenuLogisticaComponent } from './cmb-menu-logistica/cmb-menu-logistica.component';
import { NgModule } from '@angular/core';
import { CmbInventarioComponent } from './cmb-inventario/cmb-inventario.component';


const routes: Routes = [{
  path: '',
  component: CmbLogisticaComponent,
  children: [
    {
      path: 'menu-logistica',
      component: CmbMenuLogisticaComponent,
    },
    {
      path: 'inventario',
      component: CmbInventarioComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmbLogisticaRoutingModule { }

export const cmbLogisticaRouterComponents = [
  CmbLogisticaComponent,
  CmbMenuLogisticaComponent,
  CmbInventarioComponent
];
