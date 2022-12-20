import { NgModule } from '@angular/core';
import { MateriasPrimasComponent } from './materias-primas.component';
import { RouterModule, Routes } from '@angular/router';
import { EtqEntMateriasPrimasComponent } from './etq-ent-materias-primas/etq-ent-materias-primas.component';
import { MenuMateriasPrimasComponent } from './menu-materias-primas/menu-materias-primas.component';


const routes: Routes = [{
  path: '',
  component: MateriasPrimasComponent,
  children: [
    {
      path: 'menu',
      component: MenuMateriasPrimasComponent
    },
    {
      path: 'etiqueta',
      component: EtqEntMateriasPrimasComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MateriasPrimasRoutingModule { }

export const materiasPrimasRouterComponents = [
  MateriasPrimasComponent,
  EtqEntMateriasPrimasComponent,
  MenuMateriasPrimasComponent
];
