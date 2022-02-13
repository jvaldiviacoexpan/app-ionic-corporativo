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

  loadMenu: boolean;
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

  obtenerRoles() {
    this.loadMenu = true;
    this.auth.user$.subscribe((user) => {
      this.auth0Serv.getAuth().then((resp: any) => {
        const userdata = {
          idToken: resp.access_token,
          email: user.email,
        };
        const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Serv.getDataUser(datarest).then((restuser: any) => {
          this.showThisContent$.next({ datauser: restuser[0].app_metadata.roles });
        }, (err) => {
          console.warn(err);
        });
      }, (err) => {
        console.warn(err);
      }).finally(()=>this.loadMenu = false);
    });
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





}

