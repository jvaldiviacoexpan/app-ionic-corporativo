import { Component, AfterViewInit, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '@auth0/auth0-angular';
import { Auth0Service } from '../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../providers/external/security.service';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit, AfterViewInit {

  constructor(
    private menu: MenuController,
    private auth: AuthService,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void {
    this.auth0ObtenerListaUsuarios();
  }

  ngAfterViewInit() { }

  menuToogle() {
    this.menu.toggle();
  }

  auth0ObtenerListaUsuarios() {
    this.auth.user$.subscribe((user) => {
      this.auth0Service.getAuth().then((resp: any) => {
        const userdata = {
          idToken: resp.access_token,
        };
        const datarest = this.securityService.encrypt(JSON.stringify(userdata));
        this.auth0Service.getUserList(datarest).then((respu: any) => {
          console.log(respu);
        }, (err) => {
          console.warn(err);
        });
      }, (err) => {
        console.warn(err);
      });
    });
  }



}
