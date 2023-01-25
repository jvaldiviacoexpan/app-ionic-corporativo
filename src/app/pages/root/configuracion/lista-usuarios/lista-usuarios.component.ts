import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';
import { Router } from '@angular/router';
import { PermisosComponent } from './permisos/permisos.component';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  arrayUsers = [];
  user: any;

  constructor(
    private menu: MenuController,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
    private route: Router,
    private modalController: ModalController,
  ) { }

  ngOnInit(): void {
    this.auth0ObtenerListaUsuarios();
  }

  ngAfterViewInit() { }

  menuToogle() {
    this.menu.toggle();
  }

  auth0ObtenerListaUsuarios() {
    this.auth0Service.getAuth().then((resp: any) => {
        const userdata = {
          idToken: resp.access_token,
        };
        const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Service.getUserList(datarest).then((users: any) => {
          this.arrayUsers = users.sort((a: any, b: any) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
          });
          console.log(users);
        }, (err) => {
          console.warn(err);
        });
      }, (err) => {
        console.warn(err);
      });
  }

  // Elminar
  irPermisos(user: any): void {
    this.user = user;
    this.route.navigateByUrl('pages/root/config/conf-menu');
  }

  createRange(nmb: number): any {
    return new Array(nmb).fill(0)
      .map((n, index) => index + 1);
  }

  async modalPermisos(user: any) {
    const modal = await this.modalController.create({
      component: PermisosComponent,
      componentProps: {
        usuario: user,
      }
    });
    modal.onDidDismiss().then((data: any) => {
      console.log(data);
    });
    await modal.present();
  }



}
