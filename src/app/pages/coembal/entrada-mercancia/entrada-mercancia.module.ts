
import { EntradaMercanciaRoutingModule, entradaMercanciaRouterComponents } from './entrada-mercancia-routing.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    EntradaMercanciaRoutingModule
  ],
  declarations: [
    ...entradaMercanciaRouterComponents
  ]
})
export class EntradaMercanciaModule { }
