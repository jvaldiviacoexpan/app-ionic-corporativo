import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, NavParams, ModalController, ToastController, IonToggle } from '@ionic/angular';
import { Auth0Service } from '../../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../../providers/external/security.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit, AfterViewInit {

  @ViewChild('id1') toogle1: IonToggle;
  @ViewChild('id2') toogle2: IonToggle;
  @ViewChild('id3') toogle3: IonToggle;
  @ViewChild('id4') toogle4: IonToggle;
  @ViewChild('id5') toogle5: IonToggle;
  @ViewChild('id6') toogle6: IonToggle;
  @ViewChild('id7') toogle7: IonToggle;
  @ViewChild('id8') toogle8: IonToggle;
  @ViewChild('id9') toogle9: IonToggle;
  @ViewChild('id10') toogle10: IonToggle;
  @ViewChild('id11') toogle11: IonToggle;
  @ViewChild('id12') toogle12: IonToggle;
  @ViewChild('id13') toogle13: IonToggle;
  @ViewChild('id14') toogle14: IonToggle;
  @ViewChild('id15') toogle15: IonToggle;
  @ViewChild('id16') toogle16: IonToggle;
  @ViewChild('id17') toogle17: IonToggle;
  @ViewChild('id18') toogle18: IonToggle;

  user: any;
  roles = [];

  constructor(
    private navParams: NavParams,
    private menu: MenuController,
    private modalController: ModalController,
    private toastController: ToastController,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void {
    this.roles = [];
    this.user = this.navParams.data.usuario;
  }

  ngAfterViewInit(): void {
    this.obtenerRoles();
  }

  obtenerRoles() {
    console.log(this.user);
    this.auth0Service.getAuth().then((resp: any) => {
      const userdata = {
        idToken: resp.access_token,
        idUser: this.user.user_id,
      };
      const datarest = this.securityService.encrypt(JSON.stringify(userdata));
      this.auth0Service.getUserRoles(datarest).then((respp: any) => {
        console.log(respp.app_metadata);
        if (respp.app_metadata) {
          this.roles = respp.app_metadata.roles;
          setTimeout(() => {
            this.cargarPermisos();
          }, 50);
        } else {
          this.roles.push('init');
        }
      }, (err: any) => {
        console.error(err);
        this.roles = [];
      });
    }, (err: any) => {
      console.error(err);
    });
  }

  menuToogle() {
    this.menu.toggle();
  }


  tooglePermisos(toogle: any, empresa: string, area: string, descripcion: any, idmodulo: number) {

    const rol = {
      id: idmodulo,
      enabled: toogle,
      business: empresa,
      zone: area,
      description: descripcion,
    };

    this.adminRoles(rol);
  }

  adminRoles(data: any) {
    console.log(data);

    let find = false;
    this.roles.forEach((obj: any) => {
      if (obj.id) {
        if (obj.id === data.id) {
          obj.enabled = data.enabled;
          find = true;
        }
      }
    });
    if(!find) { this.roles.push(data); }
    console.log(this.roles);
  }


  dismissData() {
    const roles = {
      roles: this.roles,
    };
    const metadata = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      app_metadata: roles,
    };

    this.auth0Service.getAuth().then((resp: any) => {
      const userdata = {
        idToken: resp.access_token,
        idUser: this.user.user_id,
        appMetada: JSON.stringify(metadata),
      };
      console.log(userdata);
      const datarest = this.securityService.encrypt(JSON.stringify(userdata));
      this.auth0Service.updateUser(datarest).then((data: any) => {
        console.log(data);
      }, (err: any) => {
        console.error(err);
      });

    }, (err: any) => {
      console.error(err);
    });

    this.modalController.dismiss({holi: 'jeje'});
  }


  cargarPermisos() {
    console.log('cargar permisos');
    this.roles.forEach((data: any) => {
      console.log(data);

      if (data.id) {
        if (data.id === 1) { this.toogle1.checked = data.enabled; }
        if (data.id === 2) { this.toogle2.checked = data.enabled; }
        if (data.id === 3) { this.toogle3.checked = data.enabled; }
        if (data.id === 4) { this.toogle4.checked = data.enabled; }
        if (data.id === 5) { this.toogle5.checked = data.enabled; }
        if (data.id === 6) { this.toogle6.checked = data.enabled; }
        if (data.id === 7) { this.toogle7.checked = data.enabled; }
        if (data.id === 8) { this.toogle8.checked = data.enabled; }
        if (data.id === 9) { this.toogle9.checked = data.enabled; }
        if (data.id === 10) { this.toogle10.checked = data.enabled; }
        if (data.id === 11) { this.toogle11.checked = data.enabled; }
        if (data.id === 12) { this.toogle12.checked = data.enabled; }
        if (data.id === 13) { this.toogle13.checked = data.enabled; }
        if (data.id === 14) { this.toogle14.checked = data.enabled; }
        if (data.id === 15) { this.toogle15.checked = data.enabled; }
        if (data.id === 16) { this.toogle16.checked = data.enabled; }
        if (data.id === 17) { this.toogle17.checked = data.enabled; }
        if (data.id === 18) { this.toogle18.checked = data.enabled; }
      }
    });
  }

}

