import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuracion',
  template: '<ion-router-outlet></ion-router-outlet>'
})
export class ConfiguracionComponent implements OnInit {

  @Input() user: any;

  constructor(
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log('Componente inicializado');
    // console.log(user);
  }

}
