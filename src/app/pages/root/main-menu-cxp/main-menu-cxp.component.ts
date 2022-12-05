import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../providers/external/security.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu-cxp.component.html',
  styleUrls: ['./main-menu-cxp.component.scss']
})
export class MainMenuCxpComponent implements OnInit, AfterViewInit {

  modulos = {
    logistica: false,
    extrusion: false,
    rrhh: false,
    finanzas: false,
    loading: true,
  };

  showThisContent$ = new BehaviorSubject<any>({});
  authRoles$ = new BehaviorSubject<any>({});

  constructor(
    private route: Router,
    private auth: AuthService,
    private menu: MenuController,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.obtenerRoles();
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
          this.modulos.loading = false;
          this.habilitarModulos();
        }, (err) => {
        });
      }, (err) => {
      }).finally(() => this.modulos.loading = false);
    });
  }

  menuToogle() {
    this.menu.toggle();
  }

  irMenuLogistica() {
    this.route.navigateByUrl('/pages/logistica/menu-logistica');
  }

  irMenuExtrusion() {
    this.route.navigateByUrl('/pages/extrusion/menu-extrusion');
  }

  habilitarModulos() {
    const foundExtrusion = this.showThisContent$.value.datauser
      .find((el: any) => el.zone === 'extrusion' && el.business === 'cxp');

    const foundLogistica = this.showThisContent$.value.datauser
      .find((el: any) => el.zone === 'logistica' && el.business === 'cxp');

    const foundRrhh = this.showThisContent$.value.datauser
      .find((el: any) => el.zone === 'finanzas' && el.business === 'cxp');

    const foundFinanzas = this.showThisContent$.value.datauser
      .find((el: any) => el.zone === 'rrhh' && el.business === 'cxp');

    if (foundExtrusion !== undefined) { this.modulos.extrusion = true; }
    if (foundLogistica !== undefined) { this.modulos.logistica = true; }
    if (foundRrhh !== undefined) { this.modulos.rrhh = true; }
    if (foundFinanzas !== undefined) { this.modulos.finanzas = true; }
  }


}

