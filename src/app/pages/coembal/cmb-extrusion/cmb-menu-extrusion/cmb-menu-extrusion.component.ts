import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './cmb-menu-extrusion.component.html',
  styleUrls: ['./cmb-menu-extrusion.component.css']
})
export class CmbMenuExtrusionComponent implements OnInit, AfterViewInit {

  enabled = {
    found1: false,
    found2: false,
    found3: false,
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
    // console.log('Extrusion menu works');
  }

  ngAfterViewInit(): void {
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
      });
    });
  }

  menuToogle() {
    this.menu.toggle();
  }

  navCmbEmisionCajaPallet() {
    this.route.navigateByUrl('/pages/cmb/extrusion/etq-emision-pallet');
  }

  irRegistroParadas() {
    this.route.navigateByUrl('/pages/cmb/extrusion/reg-paradas');
  }


  irInventarioCorrea(): void {
    this.route.navigateByUrl('/pages/cmb/extrusion/inv-correa');
  }

  habilitarModulos() {
    const found1 = this.showThisContent$.value.datauser.find((el: any) => el.id === 1);
    const found2 = this.showThisContent$.value.datauser.find((el: any) => el.id === 2);
    const found3 = this.showThisContent$.value.datauser.find((el: any) => el.id === 3);

    if (found1 !== undefined) { this.enabled.found1 = true; }
    if (found2 !== undefined) { this.enabled.found2 = true; }
    if (found3 !== undefined) { this.enabled.found3 = true; }
  }



}
