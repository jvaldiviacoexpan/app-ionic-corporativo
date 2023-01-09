import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { environment as env } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { Auth0Service } from '../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../providers/external/security.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, AfterViewInit {

  modulos = {
    materiasprimas: false,
    inventario: false,
    registroParadas: false,
    configuracion: false,

    loading: true,
  };

  showThisContent$ = new BehaviorSubject<any>({});
  authRoles$ = new BehaviorSubject<any>({});

  tiempoDia = '';
  loading = true;

  constructor(
    public auth: AuthService,
    private route: Router,
    private menu: MenuController,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService
  ) { }

  ngOnInit() {
    this.tiempoDia = this.obtenertiempoDia();
    this.auth.user$.subscribe((data) => {
        this.loading = false;
    });
    this.asignarEmpresa();
  }

  ngAfterViewInit() {
    this.obtenerRoles();
  }


  irMenuMenuConfig() {
    this.route.navigateByUrl('pages/root/config/conf-menu');
  }

  asignarEmpresa() {
    localStorage.setItem('sapdb', env.dbCoembal);
  }

  obtenertiempoDia(): string {
    const TIEMPO = new Date();
    if (TIEMPO.getHours() >= 5 && TIEMPO.getHours() <= 11) {
      return 'Buenos Días';
    } else if (TIEMPO.getHours() >= 12 && TIEMPO.getHours() <= 20) {
      return 'Buenas Tardes';
    } else {
      return 'Buenas Noches';
    }
  }

  menuToogle() {
    this.menu.toggle();
  }

  navMenuMateriasPrimas() {
    this.route.navigateByUrl('/pages/materias-primas/menu');
  }

  navMenuInventario() {
    this.route.navigateByUrl('/pages/inventario/menu-inventario');
  }

  navMenuRegistroParadas() {
    this.route.navigateByUrl('/pages/registro-paradas/menu');
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
    const foundConfiguracion  = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'configuracion');
    const foundMateriasPrimas = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'materias-primas');
    const foundInventario = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'inventario');
    const foundRegistroParadas     = this.showThisContent$.value.datauser.find((el: any) => el.zone === 'registro-paradas');


    if (foundConfiguracion  !== undefined) { this.modulos.configuracion = true; }
    if (foundMateriasPrimas !== undefined) { this.modulos.materiasprimas = true; }
    if (foundInventario     !== undefined) { this.modulos.inventario = true; }
    if (foundRegistroParadas     !== undefined) { this.modulos.registroParadas = true; }
  }

}
