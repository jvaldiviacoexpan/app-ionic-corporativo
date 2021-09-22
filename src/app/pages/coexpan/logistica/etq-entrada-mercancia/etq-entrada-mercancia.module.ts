import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { EtqEntradaMercanciaRoutingModule, etqEntradaMercanciaRouterComponents } from './etq-entrada-mercancia-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EtqEntradaMercanciaRoutingModule,
  ],
  declarations: [
    ...etqEntradaMercanciaRouterComponents
  ]
})

export class EtqEntradaMercanciaModule { }


