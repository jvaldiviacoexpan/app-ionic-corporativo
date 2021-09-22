import { entradaMercanciaRouterComponent, EntradaMercanciaRoutingModule } from './entrada-mercancia-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EntradaMercanciaRoutingModule,
  ],
  exports: [],
  declarations: [
    ...entradaMercanciaRouterComponent
  ]
})
export class EntradamercanciaModule { }
