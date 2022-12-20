import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { SecurityService } from '../../../../../providers/external/security.service';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-a-menu-logistica',
  templateUrl: './a-menu-logistica.component.html',
  styleUrls: ['./a-menu-logistica.component.scss'],
})
export class AMenuLogisticaComponent implements OnInit, AfterViewInit {

  showThisContent$ = new BehaviorSubject<any>({});

  enabled = {
    etiquetaMateriasPrimas: false,
    etiquetaBobinas: false,
    entradaMateriasPrimas: false,
    entradaBobinas: false,
    salidaMateriaPrimas: false,
    salidaBobinas: false,
    inventario: false,
  };

  roles = [];

  constructor(
    private menu: MenuController,
    private route: Router,
    private auth: AuthService,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.obtenerRoles();
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

  navRegInventarioDos() {
    this.route.navigateByUrl('/pages/logistica/inv-dos/reg-inventario-dos');
  }

  menuToogle() {
    this.menu.toggle();
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
    const found12 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 12 && el.enabled === true);
    const found13 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 13 && el.enabled === true);
    const found14 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 14 && el.enabled === true);
    const found15 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 15 && el.enabled === true);
    const found16 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 16 && el.enabled === true);
    const found17 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 17 && el.enabled === true);
    const found18 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 18 && el.enabled === true);


    if (found12 !== undefined) { this.enabled.etiquetaMateriasPrimas = true; }
    if (found13 !== undefined) { this.enabled.etiquetaBobinas = true; }
    if (found14 !== undefined) { this.enabled.entradaMateriasPrimas = true; }
    if (found15 !== undefined) { this.enabled.entradaBobinas = true; }
    if (found16 !== undefined) { this.enabled.salidaMateriaPrimas = true; }
    if (found17 !== undefined) { this.enabled.salidaBobinas = true; }
    if (found18 !== undefined) { this.enabled.inventario = true; }

  }



}
