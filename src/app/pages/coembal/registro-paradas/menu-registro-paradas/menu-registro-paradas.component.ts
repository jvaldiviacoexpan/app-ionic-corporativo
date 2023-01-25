import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { BehaviorSubject } from 'rxjs';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  templateUrl: './menu-registro-paradas.component.html',
  styleUrls: ['./menu-registro-paradas.component.css']
})
export class MenuRegistroParadasComponent implements OnInit, AfterViewInit {

  enabled = {
    rgp01: false,
    rgp02: false,
  };
  showThisContent$ = new BehaviorSubject<any>({});

  constructor(
    private menu: MenuController,
    private route: Router,
    private auth: AuthService,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void {
    // console.log('RegistroParadas menu works');
  }

  ngAfterViewInit(): void {
    this.toolService.simpleLoader('Cargando...');
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
          this.habilitarModulos();
        }, (err) => {
        });
      }, (err) => {
      }).finally(() => this.toolService.dismissLoader());
    });
  }

  menuToogle() {
    this.menu.toggle();
  }

  irRegistroParadasCoembal() {
    this.route.navigateByUrl('/pages/registro-paradas/rgp-coembal');
  }

  irRegistroParadasCoexpan() {
    this.route.navigateByUrl('/pages/registro-paradas/rgp-coexpan');
  }

  habilitarModulos() {
    const rgp01 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'rgp01' && el.enabled === true);
    const rgp02 = this.showThisContent$.value.datauser.find((el: any) => el.id === 'rgp02' && el.enabled === true);

    if (rgp01 !== undefined) { this.enabled.rgp01 = true; }
    if (rgp02 !== undefined) { this.enabled.rgp02 = true; }
  }



}
