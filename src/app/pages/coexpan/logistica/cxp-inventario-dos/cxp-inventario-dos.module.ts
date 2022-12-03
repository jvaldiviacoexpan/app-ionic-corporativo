import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CxpInvetarioDosRoutingModule, cxpInvetarioRouterComponents } from './cxp-inventario-dos-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CxpInvetarioDosRoutingModule
  ],
  exports: [],
  declarations: [
    ...cxpInvetarioRouterComponents,
  ]
})
export class CxpInventarioDosModule { }
