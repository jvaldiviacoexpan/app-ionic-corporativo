import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent {

  constructor(
      private menu: MenuController,
      private route: Router,
  ) {
    console.log('PermisosComponent initialized');
  }

  menuToogle() {
    this.menu.toggle();
  }

}

