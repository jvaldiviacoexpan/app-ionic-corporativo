import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, IonButton, IonTextarea, ToastController, AlertController, IonCheckbox } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { AuthService } from '@auth0/auth0-angular';
import { imprimirEtiquetaModel } from 'src/models/anymodels.model';


@Component({
  selector: 'app-reimprimir-etiqueta-bobina-sap',
  templateUrl: './reimprimir-etiqueta-bobina-sap.component.html',
  styleUrls: ['./reimprimir-etiqueta-bobina-sap.component.scss']
})
export class ReimprimirEtiquetaBobinaSapComponent implements OnInit {

  @ViewChild('btnEnviar') btnEnviar: IonButton;
  @ViewChild('codigos') txtCodigos: IonTextarea;
  @ViewChild('sapetiqueta') chkSapEtiqueta: IonCheckbox;

  codigos: string;
  arrayCod: string[];
  usuario = '';

  constructor(
    private auth: AuthService,
    private menuCtrl: MenuController,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private cxpService: CxpService,
    private toolService: ToolService,
  ) { }

  get isEnabledEnviar(): boolean {
    let enabled = false;
    if (this.txtCodigos) {
      enabled = this.txtCodigos.value?.length !== 0 ? false : true;
    }
    return enabled;
  }

  get contadorCodigos(): number {
    let contador = 0;
    if (this.txtCodigos) {
      if (this.txtCodigos.value?.trim().length > 0) {
        contador = this.txtCodigos.value?.trim().split(' ').length;
      }
    }
    return contador;
  }

  get contadorCodigosNoRepetidos(): number {
    let contador = 0;
    if (this.txtCodigos) {
      if (this.txtCodigos.value?.trim().length > 0) {
        contador = this.limpiarCodigos(this.txtCodigos.value?.trim()).length;
      }
    }
    return contador;
  }

  ngOnInit(): void {
    // this.alertaActualizarFuenteDatos();

    this.auth.user$.subscribe(data => {
      this.usuario = data.email;
    });
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  async alertaConfirmarEtiquetaBobina() {

    const ipPrint = localStorage.getItem('ipimp');

    if (!ipPrint) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Reimprimir Etiqueta Bobina SAP',
      message: 'Desea reimprimir Etiqueta de Bobinas SAP?',
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
            this.enviarEtiquetaBobina();
          }
        }
      ]
    });
    await alert.present();
  }

  enviarEtiquetaBobina() {
    const etiqueta: imprimirEtiquetaModel<string> = new imprimirEtiquetaModel<string>();

    etiqueta.ipAddress = localStorage.getItem('ipimp');
    etiqueta.modelData = this.txtCodigos.value;

    this.toolService.simpleLoader('Cargando...');
    this.cxpService.postReimprimirEtiquetaBobinaSap(etiqueta).then((data: any) => {

      if (data.Status === 'T') {
        this.presentToast(data.Message, 5000, 'success');
        this.reestablecerDatos();

      } else {
        this.presentToast(data.Message, 5000, 'warning');
      }
    }, (error: any) => {
      console.error(error);
    }).finally(() => this.toolService.dismissLoader());
  }

  limpiarCodigos(codigos: string): string[] {
    const arrayCadena = codigos.trim().split(' ');
    const arrayCadenaClean = arrayCadena.filter(Boolean);
    const arrayClean = [...new Set(arrayCadenaClean)];
    return arrayClean;
  }

  reestablecerDatos() {
    this.txtCodigos.value = '';
    setTimeout(() => {
      this.txtCodigos.setFocus();
    }, 250);
  }

  obtenerFecha(): string {
    const fechaDate = new Date();
    let fechaString = '';
    const anio = fechaDate.getFullYear();
    let dia = '';
    let mes = '';
    let hora = '';
    let minuto = '';
    let segundo = '';

    if (fechaDate.getDate() < 10) {
        dia = `0${fechaDate.getDate()}`;
    } else { dia = fechaDate.getDate().toString(); }

    if (fechaDate.getMonth() < 9) {
        mes = `0${fechaDate.getMonth() + 1}`;
    } else { mes = (fechaDate.getMonth() + 1).toString(); }

    if (fechaDate.getHours() < 10) {
        hora = `0${fechaDate.getHours()}`;
    } else { hora = fechaDate.getHours().toString(); }

    if (fechaDate.getMinutes() < 10) {
        minuto = `0${fechaDate.getMinutes()}`;
    } else { minuto = fechaDate.getMinutes().toString(); }

    if (fechaDate.getSeconds() < 10) {
        segundo = `0${fechaDate.getSeconds()}`;
    } else { segundo = fechaDate.getSeconds().toString(); }
    fechaString = `${anio}${mes}${dia} ${hora}:${minuto}:${segundo}`;
    console.log(mes);
    return fechaString;

  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
