import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-conf-menu',
  templateUrl: './conf-menu.component.html',
  styleUrls: ['./conf-menu.component.scss']
})
export class ConfMenuComponent {

  constructor(
    private menu: MenuController,
    private route: Router,
  ) { }

  menuToogle() {
    this.menu.toggle();
  }

  irPermisos() {
    this.route.navigateByUrl('pages/root/config/permisos');
  }



}
