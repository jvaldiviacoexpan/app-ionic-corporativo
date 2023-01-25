import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { materiasPrimasRouterComponents, MateriasPrimasRoutingModule } from './materias-primas-routing.module';

@NgModule({
  imports: [
    IonicModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    MateriasPrimasRoutingModule
  ],
  declarations: [
    ...materiasPrimasRouterComponents,
  ]
})

export class MateriasPrimasModule { }
