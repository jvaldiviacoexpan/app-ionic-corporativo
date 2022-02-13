import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CmbExtrusionRoutingModule, cmbExtrusionRouterComponents } from './cmb-extrusion-routing.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    CmbExtrusionRoutingModule
  ],
  declarations: [
    ...cmbExtrusionRouterComponents
  ]
})
export class CmbExtrusionModule { }

