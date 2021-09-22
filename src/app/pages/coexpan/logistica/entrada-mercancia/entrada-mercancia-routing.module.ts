import { NgModule } from '@angular/core';
import { Routes, Router, RouterModule } from '@angular/router';
import { EmMateriasPrimasComponent } from './em-materias-primas/em-materias-primas.component';
import { EntradaMercanciaComponent } from './entrada-mercancia.component';



const routes: Routes = [{
  path: '',
  component: EntradaMercanciaComponent,
  children: [
    {
      path: 'em-materias-primas',
      component: EmMateriasPrimasComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntradaMercanciaRoutingModule { }

export const entradaMercanciaRouterComponent = [
  EntradaMercanciaComponent,
  EmMateriasPrimasComponent,
];

