import { Routes, RouterModule } from '@angular/router';
import { EtqEntradaMercanciaComponent } from './etq-entrada-mercancia.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{
  path: '',
  component: EtqEntradaMercanciaComponent,
  children: [
    {
      path: 'etq-entr-materias-primas',
      // component: EtqEntMateriasPrimasComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EtqEntradaMercanciaRoutingModule { }

export const etqEntradaMercanciaRouterComponents = [
  EtqEntradaMercanciaComponent,
];
