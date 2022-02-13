import { RestImpresoraModel } from './../models/restImpresora.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Login } from '../models/sapbo.model';
import { SecurityService } from '../providers/external/security.service';
import { AlertController, ToastController } from '@ionic/angular';
import { ToolService } from 'src/providers/external/tools.service';
import { CxpService } from '../providers/internal/cxp.service';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent implements OnInit {

  impseleccionada: string;

  constructor(
    public auth: AuthService,
    private securityServ: SecurityService,
    private alertController: AlertController,
    private toastController: ToastController,
    private toolServices: ToolService,
    private cxpService: CxpService,
  ) { }

  ngOnInit(): void {
    this.auth.getAccessTokenSilently().subscribe(()=>{}, (err: Error) => {
      // console.log(err.message);
    });
  }

  get existeUrsSap(): boolean {
    if (localStorage.getItem('sapusr')) {
      return true;
    } else {
      return false;
    }
  }

  async alertaLoginSap() {
    const db: string = localStorage.getItem('sapdb');
    if (db === null) {
      this.presentToast('Seleccione una empresa antes de continuar.', 5000, 'warning');
      return;
    }
    const alert = await this.alertController.create({
      header: 'Login Sap Business One',
      message: 'Ingrese Usuario y Password',
      inputs: [
        {
          placeholder: 'Usuario',
          name: 'usr',
          type: 'text',
        },
        {
          placeholder: 'Password',
          name: 'psw',
          type: 'password',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            // console.log('Confirm Cancel.');
          }
        }, {
          text: 'Enviar',
          cssClass: 'btnAlertSuccess',
          handler: (data) => {
            this.loginSap(data.psw, data.usr, db);
          }
        }
      ]
    });
    await alert.present();
  }


  loginSap(si: string, se: string, so: string) {
    this.toolServices.simpleLoader('Cargando...');
    const login = new Login();
    login.resu = se;
    login.psws = si;
    login.npmc = so;
    const sapusr = this.securityServ.encrypt(JSON.stringify(login));
    // console.log(sapusr);
    this.securityServ.sapIniciarSesion(sapusr).then((data: any) => {
      this.toolServices.dismissLoader();
      if (data.Status === 'T') {
        localStorage.setItem('sapusr', sapusr);
        this.presentToast(data.Sap_Message, 5000, 'success');
      } else {
        const ltr = 'Error con las Credenciales en Sap Business One, Asegúrese de que estén bien escritas e inténtelo nuevamente.';
        this.presentToast(ltr, 5000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => this.toolServices.dismissLoader());
  }

  async alertaLogout() {
    const alert = await this.alertController.create({
      header: 'Aplicación Corporativa',
      message: '¿Esta seguro que desea salir del sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertSuccess',
          handler: () => { }
        }, {
          text: 'Cerrar Sesión',
          cssClass: 'btnAlertDanger',
          handler: () => {
            this.toolServices.simpleLoader('Cargando...');
            this.logoutAuth();
          }
        }
      ]
    });
    await alert.present();
  }

  logoutAuth() {
    this.auth.logout({
      federated: true,
      returnTo: `${env.urlBase}/#/pages/root/login`,
      // returnTo: 'http://localhost:8100/#/pages/root/login'
    });
    localStorage.removeItem('sapusr');
    this.toolServices.simpleLoader('Cargando...');
  }


  logoutSap(): void {
    localStorage.removeItem('sapusr');
    this.presentToast('Desconectado de Sap Business One', 4000, 'medium');
  }

  obtenerImpresora() {
    this.toolServices.simpleLoader('Cargando...');
    let impresoras: RestImpresoraModel = new RestImpresoraModel();
    this.cxpService.obtenerImpresoras().then((data: any) => {
      impresoras = data;
      this.seleccionarImpresora(impresoras);
      // console.log(impresoras);
    }, (err) => {
      console.warn(err);
    }).finally();
  }

  async seleccionarImpresora(impresoras: RestImpresoraModel) {
    const options = {
      header: 'Aplicación Corporativa',
      message: 'Seleccione una Impresora.',
      inputs: [],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => { }
        }, {
          text: 'Seleccionar',
          cssClass: 'btnAlertSuccess',
          handler: (data: any) => {
            // console.log(data);
            if (data === undefined) {
              this.toolServices.simpleLoader('Cargando...');
              this.seleccionarImpresora(impresoras);
              this.presentToast('Seleccione una Impresora antes de Continuar.', 2000, 'warning');
            } else {
              this.toolServices.simpleLoader('Cargando...');
              const imp = { ip: data };
              this.cxpService.estadoImpresora(imp).then((rest: any) => {
                // console.log(rest);
                if (rest.Status === 'T') {
                  impresoras.Objeto.forEach(i => {
                    if (data === i.IP) {
                      this.presentToast(`Impresora ${i.TAG_NOMBRE} seleccionada.`, 2000, 'success');
                      this.impseleccionada = i.TAG_NOMBRE;
                      localStorage.setItem('ipimp', data);
                    }
                  });
                } else {
                  this.presentToast(rest.Message, 3000, 'danger');
                }
              }, (err) => {
                console.warn(err);
              }).finally(()=>this.toolServices.dismissLoader());
            }
          }
        }
      ]
    };
    options.inputs = [];
    impresoras.Objeto.forEach(i => {
      if (i.AVAILABLE) {
        options.inputs.push(
          {
            name: i.TAG_NOMBRE,
            type: 'radio',
            label: i.TAG_NOMBRE,
            value: i.IP,
          }
        );
      }
    });
    const alert = this.alertController.create(options);
    (await alert).present().finally(()=>this.toolServices.dismissLoader());
  }

  async presentToast(mensaje: string, duracion: number, colr: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: colr
    });
    toast.present();
  }



}
