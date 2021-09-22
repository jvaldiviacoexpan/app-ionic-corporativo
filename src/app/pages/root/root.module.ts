import { NgModule } from '@angular/core';
import { rootRouterComponents, RootRoutingModule } from './root-routing.module';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    RootRoutingModule,
  ],
  declarations: [
    ...rootRouterComponents,
  ]
})
export class RootModule { }

