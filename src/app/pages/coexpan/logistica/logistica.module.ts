import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { logisticaRouterComponents, LogisticaRoutingModule } from './logistica-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LogisticaRoutingModule,
  ],
  declarations: [
    ...logisticaRouterComponents
  ]
})

export class LogisticaModule { }

