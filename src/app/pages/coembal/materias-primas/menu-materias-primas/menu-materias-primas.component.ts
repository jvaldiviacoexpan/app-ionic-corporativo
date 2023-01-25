import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  selector: 'app-menu-materias-primas',
  templateUrl: './menu-materias-primas.component.html',
  styleUrls: ['./menu-materias-primas.component.scss'],
})
export class MenuMateriasPrimasComponent implements OnInit, AfterViewInit {

  enabled = {
    mpr01: false,
    mpr02: false,
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

  irEmisionPallet() {
    this.route.navigateByUrl('/pages/materias-primas/etiqueta');
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
          // Todo Falta informacion adicional
        });
      }, (err) => {
        // Todo Falta informacion adicional
      }).finally(() => this.toolService.dismissLoader());
    });
  }

  habilitarModulos() {
    const mpr01 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'mpr01' && el.enabled === true);
    const mpr02 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 'mpr02' && el.enabled === true);


    if (mpr01  !== undefined) { this.enabled.mpr01 = true; }
    if (mpr02  !== undefined) { this.enabled.mpr02 = true; }

  }


}

