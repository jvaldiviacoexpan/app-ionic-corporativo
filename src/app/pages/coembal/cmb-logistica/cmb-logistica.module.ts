import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CmbLogisticaRoutingModule, cmbLogisticaRouterComponents } from './cmb-logistica-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CmbLogisticaRoutingModule
  ],
  declarations: [
    ...cmbLogisticaRouterComponents
  ]
})
export class CmbLogisticaModule { }
