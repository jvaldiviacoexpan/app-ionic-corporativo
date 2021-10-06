import { Routes, RouterModule } from '@angular/router';
import { ExtrusionComponent } from './extrusion.component';
import { NgModule } from '@angular/core';
import { AMenuExtrusionComponent } from './a-menu-extrusion/a-menu-extrusion.component';
import { RegistroParadasComponent } from './registro-paradas/registro-paradas.component';
import { ModalRegistroParadaComponent } from './registro-paradas/modal-registro-parada/modal-registro-parada.component';



const routes: Routes = [{

  path: '',
  component: ExtrusionComponent,
  children: [
    {
      path: 'menu-extrusion',
      component: AMenuExtrusionComponent
    },
    {
      path: 'reg-paradas',
      component: RegistroParadasComponent
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
  ModalRegistroParadaComponent
];
