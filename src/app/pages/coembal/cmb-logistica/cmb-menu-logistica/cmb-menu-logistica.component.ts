import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';



@Component({
  selector: 'app-cmb-menu-logistica',
  templateUrl: './cmb-menu-logistica.component.html',
  styleUrls: ['./cmb-menu-logistica.component.scss']
})
export class CmbMenuLogisticaComponent {

  constructor(
    private menu: MenuController,
    private router: Router,
  ) { }

  menuToogle() {
    this.menu.toggle();
  }

  navCmbInventario() {
    this.router.navigateByUrl('/pages/cmb/logistica/inventario');
  }


}
