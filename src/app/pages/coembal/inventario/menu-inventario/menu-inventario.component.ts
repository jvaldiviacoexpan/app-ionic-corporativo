import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { BehaviorSubject } from 'rxjs';
import { ToolService } from '../../../../../providers/external/tools.service';



@Component({
  selector: 'app-menu-inventario',
  templateUrl: './menu-inventario.component.html',
  styleUrls: ['./menu-inventario.component.scss']
})
export class MenuInventarioComponent implements AfterViewInit {

  enabled = {
    inv01: false,
    inv02: false,
    inv03: false,
    inv04: false,
  };
  showThisContent$ = new BehaviorSubject<any>({});

  constructor(
    private menu: MenuController,
    private router: Router,
    private auth: AuthService,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService,
    private toolService: ToolService,
  ) { }

  menuToogle() {
    this.menu.toggle();
  }

  ngAfterViewInit(): void {
    this.obtenerRoles();
  }

  //#region  RUTAS
  navCmbInventario() {
    this.router.navigateByUrl('/pages/inventario/inventario-coembal');
  }

  navCxpInventario() {
    this.router.navigateByUrl('/pages/inventario/inventario-coexpan');
  }

  navCmbInventarioCorrea() {
    this.router.navigateByUrl('/pages/inventario/inventario-coembal-correa');
  }

  navCxpInventarioCorrea() {
    this.router.navigateByUrl('/pages/inventario/inventario-coexpan-correa');
  }
  //#endregion  RUTAS

  obtenerRoles() {
    this.toolService.simpleLoader('Cargando...');
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
      }).finally(() => this.toolService.dismissLoader());
    });
  }

  habilitarModulos() {
    const inv01 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'inv01' && el.enabled === true);
    const inv02 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'inv02' && el.enabled === true);
    const inv03 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'inv03' && el.enabled === true);
    const inv04 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'inv04' && el.enabled === true);

    if (inv01 !== undefined) { this.enabled.inv01 = true; }
    if (inv02 !== undefined) { this.enabled.inv02 = true; }
    if (inv03 !== undefined) { this.enabled.inv03 = true; }
    if (inv04 !== undefined) { this.enabled.inv04 = true; }
  }


}
