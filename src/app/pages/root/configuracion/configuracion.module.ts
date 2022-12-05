import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicSelectableModule } from 'ionic-selectable';
import { configuracionRouterComponents, ConfiguracionRoutingModule } from './configuracion-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    IonicSelectableModule,
    ConfiguracionRoutingModule
  ],
  declarations: [
    ...configuracionRouterComponents
  ]
})
export class ConfiguracionModule { }
