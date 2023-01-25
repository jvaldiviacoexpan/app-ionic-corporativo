import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';

@Component({
  selector: 'app-a-menu-extrusion',
  templateUrl: './a-menu-extrusion.component.html',
  styleUrls: ['./a-menu-extrusion.component.scss'],
})
export class AMenuExtrusionComponent implements OnInit, AfterViewInit {

  enabled = {
    found5: false,
    found6: false,
    found7: false,
    found8: false,
    found9: false,
    found10: false,
    found11: false,
  };

  showThisContent$ = new BehaviorSubject<any>({});

  constructor(
    private menu: MenuController,
    private route: Router,
    private auth: AuthService,
    private auth0Serv: Auth0Service,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngAfterViewInit(): void {
    this.obtenerRoles();
  }

  irRegistroParadas() {
    this.route.navigateByUrl('/pages/extrusion/reg-paradas');
  }

  irEmisionPallet() {
    this.route.navigateByUrl('/pages/extrusion/emision-pallet');
  }

  irRegistroCorrea(): void {
    this.route.navigateByUrl('/pages/extrusion/registro-inv-correa');
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
    const found5 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 5 && el.enabled === true);
    const found6 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 6 && el.enabled === true);
    const found7 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 7 && el.enabled === true);
    const found8 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 8 && el.enabled === true);
    const found9 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 9 && el.enabled === true);
    const found10 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 10 && el.enabled === true);
    const found11 = this.showThisContent$.value.datauser
      .find((el: any) => el.id === 11 && el.enabled === true);


    if (found5 !== undefined) { this.enabled.found5 = true; }
    if (found6 !== undefined) { this.enabled.found6 = true; }
    if (found7 !== undefined) { this.enabled.found7 = true; }
    if (found8 !== undefined) { this.enabled.found8 = true; }
    if (found9 !== undefined) { this.enabled.found9 = true; }
    if (found10 !== undefined) { this.enabled.found10 = true; }
    if (found11 !== undefined) { this.enabled.found11 = true; }

  }


}

