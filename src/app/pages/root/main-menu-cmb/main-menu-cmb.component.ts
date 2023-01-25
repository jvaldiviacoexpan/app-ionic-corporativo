import { Component, AfterViewInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Auth0Service } from '../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../providers/external/security.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-main-menu-cmb',
  templateUrl: './main-menu-cmb.component.html',
  styleUrls: ['./main-menu-cmb.component.scss']
})
export class MainMenuCmbComponent implements AfterViewInit {

  modulos = {
    logistica: false,
    extrusion: false,
    loading: true,
  };
  showThisContent$ = new BehaviorSubject<any>({});
  authRoles$ = new BehaviorSubject<any>({});

  constructor(
    private router: Router,
    private auth: AuthService,
    private menu: MenuController,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService
  ) { }

  ngAfterViewInit() {
    this.obtenerRoles();
  }

  menuToogle() {
    this.menu.toggle();
  }

  navMenuLogistica() {
    this.router.navigateByUrl('/pages/cmb/logistica/menu-logistica');
  }

  navMenuExtrusion() {
    this.router.navigateByUrl('/pages/cmb/extrusion/menu-extrusion');
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
      }).finally(() => this.modulos.loading = false);
    });
  }

  habilitarModulos() {
    const foundExtrusion = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'extrusion' && el.business === 'cmb');
    const foundLogistica = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'logistica' && el.business === 'cmb');

    if (foundExtrusion !== undefined) { this.modulos.extrusion = true; }
    if (foundLogistica !== undefined) { this.modulos.logistica = true; }
  }





}

