import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-conf-menu',
  templateUrl: './conf-menu.component.html',
  styleUrls: ['./conf-menu.component.scss']
})
export class ConfMenuComponent implements AfterViewInit {

  enabled = {
    cfg01: false,
    cfg02: false,
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

  menuToogle() {
    this.menu.toggle();
  }

  irPermisos() {
    this.route.navigateByUrl('pages/root/config/lista-usuarios');
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
          // Todo Falta informacion adicional
        });
      }, (err) => {
        // Todo Falta informacion adicional
      }).finally(() => this.toolService.dismissLoader());
    });
  }

  habilitarModulos() {
    const cfg01 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'cfg01' && el.enabled === true);
    const cfg02 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'cfg02' && el.enabled === true);


    if (cfg01  !== undefined) { this.enabled.cfg01 = true; }
    if (cfg02  !== undefined) { this.enabled.cfg02 = true; }

  }



}
