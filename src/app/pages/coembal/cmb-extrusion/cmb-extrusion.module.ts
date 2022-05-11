import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CmbExtrusionRoutingModule, cmbExtrusionRouterComponents } from './cmb-extrusion-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    CmbExtrusionRoutingModule
  ],
  declarations: [
    ...cmbExtrusionRouterComponents
  ]
})
export class CmbExtrusionModule { }

