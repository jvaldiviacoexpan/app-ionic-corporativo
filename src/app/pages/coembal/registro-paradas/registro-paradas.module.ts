import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RegistroParadasRoutingModule, registroParadasRouterComponents } from './registro-paradas-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    IonicSelectableModule,
    FormsModule,
    CommonModule,
    RegistroParadasRoutingModule,
  ],
  declarations: [
    ...registroParadasRouterComponents
  ]

})
export class RegistroParadasModule { }
