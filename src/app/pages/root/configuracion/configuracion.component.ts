import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-configuracion',
  template: '<ion-router-outlet></ion-router-outlet>'
})
export class ConfiguracionComponent {

  constructor(
    private route: Router
  ) { }
}
