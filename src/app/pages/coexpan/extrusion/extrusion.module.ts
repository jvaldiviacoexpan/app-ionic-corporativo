import { NgModule } from '@angular/core';
import { extrusionRouterComponents, ExtrusionRoutingModule } from './extrusion-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicSelectableModule } from 'ionic-selectable';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    IonicModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    ExtrusionRoutingModule,
  ],
  declarations: [
    ...extrusionRouterComponents
  ]
})

export class ExtrusionModule { }

