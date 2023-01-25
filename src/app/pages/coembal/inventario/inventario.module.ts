import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule, inventarioRouterComponents } from './inventario-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InventarioRoutingModule
  ],
  declarations: [
    ...inventarioRouterComponents
  ]
})
export class InventarioModule { }
