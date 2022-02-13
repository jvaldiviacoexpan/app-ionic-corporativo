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

  loadMenu: boolean;
  showThisContent$ = new BehaviorSubject<any>({});
  authRoles$ = new BehaviorSubject<any>({});

  constructor(
    private route: Router,
    private auth: AuthService,
    private menu: MenuController,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.obtenerRoles();
  }

  obtenerRoles() {
    this.loadMenu = true;
    this.auth.user$.subscribe((user) => {
      this.auth0Service.getAuth().then((resp: any) => {
        const userdata = {
          idToken: resp.access_token,
          email: user.email,
        };
        const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Service.getDataUser(datarest).then((restuser: any) => {
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

  irMenuLogistica() {
    this.route.navigateByUrl('/pages/logistica/menu-logistica');
  }

  irMenuExtrusion() {
    this.route.navigateByUrl('/pages/extrusion/menu-extrusion');
  }


}

