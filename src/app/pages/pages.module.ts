import { NgModule } from '@angular/core';
import { PagesRoutingModule } from './pages-routing.module';
import { IonicModule } from '@ionic/angular';
import { PagesComponent } from './pages.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    IonicModule,
  ],
  exports: [ ],
  declarations: [
    PagesComponent,
  ]
})

export class PagesModule { }
