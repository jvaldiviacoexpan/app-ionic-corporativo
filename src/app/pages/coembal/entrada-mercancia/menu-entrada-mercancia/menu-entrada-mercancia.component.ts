import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  selector: 'app-menu-entrada-mercancia',
  templateUrl: './menu-entrada-mercancia.component.html',
  styleUrls: ['./menu-entrada-mercancia.component.scss']
})
export class MenuEntradaMercanciaComponent implements OnInit, AfterViewInit {

  enabled = {
    etr01: false,
    etr02: false,
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

  ngOnInit(): void { }

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
    const etr01 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'etr01' && el.enabled === true);
    const etr02 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'etr02' && el.enabled === true);


    if (etr01  !== undefined) { this.enabled.etr01 = true; }
    if (etr02  !== undefined) { this.enabled.etr02 = true; }

  }

  menuToogle() {
    this.menu.toggle();
  }

  irPtCaja() {
    this.route.navigateByUrl('/pages/entrada-mercancia/pt-caja');
  }


  irReimprimirPtCaja() {
    this.route.navigateByUrl('/pages/entrada-mercancia/reimprimir-pt-caja');
  }

}
