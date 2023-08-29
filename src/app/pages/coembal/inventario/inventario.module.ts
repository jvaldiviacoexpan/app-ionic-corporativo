import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { InventarioRoutingModule, inventarioRouterComponents } from './inventario-routing.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    InventarioRoutingModule,
    IonicSelectableModule,
    FormsModule,
  ],
  declarations: [
    ...inventarioRouterComponents
  ]
})
export class InventarioModule { }
