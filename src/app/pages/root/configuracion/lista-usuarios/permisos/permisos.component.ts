import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, NavParams, ModalController, ToastController, IonToggle } from '@ionic/angular';
import { Auth0Service } from '../../../../../../providers/internal/auth0.service';
import { SecurityService } from '../../../../../../providers/external/security.service';
import { ToolService } from '../../../../../../providers/external/tools.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss']
})
export class PermisosComponent implements OnInit, AfterViewInit {
  // Configuracion
  @ViewChild('cfg01') tglCfg01: IonToggle;
  @ViewChild('cfg02') tglCfg02: IonToggle;
  // Materias Primas
  @ViewChild('mpr01') tglMpr01: IonToggle;
  @ViewChild('mpr02') tglMpr02: IonToggle;
  // Inventario
  @ViewChild('inv01') tglInv01: IonToggle;
  @ViewChild('inv02') tglInv02: IonToggle;
  @ViewChild('inv03') tglInv03: IonToggle;
  @ViewChild('inv04') tglInv04: IonToggle;
  // Inventario
  @ViewChild('etr01') tglEtr01: IonToggle;
  @ViewChild('etr02') tglEtr02: IonToggle;
  // Registro Paradas
  @ViewChild('rgp01') tglRgp01: IonToggle;
  @ViewChild('rgp02') tglRgp02: IonToggle;

  //#region CODIGO LOGICO NO MODIFICAR

  user: any;
  roles = [];

  constructor(
    private navParams: NavParams,
    private menu: MenuController,
    private modalController: ModalController,
    private auth0Service: Auth0Service,
    private securityService: SecurityService,
    private toolService: ToolService,
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


  tooglePermisos(toogle: any, empresa: string, modulo: string, descripcion: any, componente: string) {

    const rol = {
      id: componente,
      enabled: toogle,
      business: empresa,
      zone: modulo,
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
    this.toolService.simpleLoader('Cargando...');
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
    }).finally(() => {
      this.modalController.dismiss();
      this.toolService.dismissLoader();
    });
  }

  dismiss() {
    this.modalController.dismiss();
  }

  //#endregion CODIGO LOGICO NO MODIFICAR

  cargarPermisos() {
    console.log('cargar permisos');
    this.roles.forEach((data: any) => {
      console.log(data);

      if (data.id) {
        switch (data.id) {
          // Configuracion
          case 'cfg01':
            this.tglCfg01.checked  = data.enabled;
            break;
          case 'cfg02':
            this.tglCfg02.checked  = data.enabled;
            break;
          // Materias Primas
          case 'mpr01':
            this.tglMpr01.checked  = data.enabled;
            break;
          case 'mpr02':
            this.tglMpr02.checked  = data.enabled;
            break;
          // Inventario
          case 'inv01':
            this.tglInv01.checked  = data.enabled;
            break;
          case 'inv02':
            this.tglInv02.checked  = data.enabled;
            break;
          case 'inv03':
            this.tglInv03.checked  = data.enabled;
            break;
          case 'inv04':
            this.tglInv04.checked  = data.enabled;
            break;
          // Entrada Mercancia
          case 'etr01':
            this.tglEtr01.checked = data.enabled;
            break;
          case 'etr02':
            this.tglEtr02.checked = data.enabled;
            break;
          // Registro Paradas
          case 'rgp01':
            this.tglRgp01.checked  = data.enabled;
            break;
          case 'rgp02':
            this.tglRgp02.checked  = data.enabled;
            break;

          default:
            break;
        }
      }
    });
  }

}

