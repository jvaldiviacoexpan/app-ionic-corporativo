import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SecurityService } from '../../../../../providers/external/security.service';
import { Login } from '../../../../../models/sapbo.model';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';

@Component({
  selector: 'app-a-menu-logistica',
  templateUrl: './a-menu-logistica.component.html',
  styleUrls: ['./a-menu-logistica.component.scss'],
})
export class AMenuLogisticaComponent implements OnInit {

  constructor(
    private menu: MenuController,
    private route: Router,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe((data) => {
      // console.log(data);
    });
  }

  navEntradaMercanciaMp() {
    this.route.navigateByUrl('/pages/logistica/em/em-materias-primas');
  }

  navEtqEntradaMercanciaMp() {
    this.route.navigateByUrl('/pages/logistica/etqem/etq-entr-materias-primas');
  }

  navRegInventario() {
    this.route.navigateByUrl('/pages/logistica/inv/reg-inventario');
  }

  menuToogle() {
    this.menu.toggle();
  }



}
