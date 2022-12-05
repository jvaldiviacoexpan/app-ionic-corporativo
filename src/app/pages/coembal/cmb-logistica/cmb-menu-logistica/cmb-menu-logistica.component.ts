import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { BehaviorSubject } from 'rxjs';



@Component({
  selector: 'app-cmb-menu-logistica',
  templateUrl: './cmb-menu-logistica.component.html',
  styleUrls: ['./cmb-menu-logistica.component.scss']
})
export class CmbMenuLogisticaComponent implements AfterViewInit {

  enabled = {
    found4: false,
  };
  showThisContent$ = new BehaviorSubject<any>({});

  constructor(
    private menu: MenuController,
    private router: Router,
    private auth: AuthService,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService
  ) { }

  menuToogle() {
    this.menu.toggle();
  }

  ngAfterViewInit(): void {
    this.obtenerRoles();
  }

  navCmbInventario() {
    this.router.navigateByUrl('/pages/cmb/logistica/inventario');
  }

  obtenerRoles() {
    this.auth.user$.subscribe((user) => {
      this.auth0Serv.getAuth().then((resp: any) => {
        const userdata = {
          idToken: resp.access_token,
          idUser: user.sub,
        };
        const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Serv.getUserRoles(datarest).then((restuser: any) => {
          this.showThisContent$.next({ datauser: restuser.app_metadata.roles });
          this.habilitarModulos();
        }, (err) => {
        });
      }, (err) => {
      });
    });
  }

  habilitarModulos() {
    const found4 = this.showThisContent$.value.datauser.find((el: any) => el.id === 4);

    if (found4 !== undefined) { this.enabled.found4 = true; }
  }


}
