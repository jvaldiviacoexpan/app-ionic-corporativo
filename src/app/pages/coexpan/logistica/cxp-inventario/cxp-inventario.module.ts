import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { cxpInventarioRouterComponents, CxpInventarioRoutingModule } from './cxp-inventario-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CxpInventarioRoutingModule
  ],
  exports: [],
  declarations: [
    ...cxpInventarioRouterComponents
  ]
})
export class CxpInventarioModule { }
