import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, IonButton, IonTextarea, ToastController, AlertController, IonCheckbox } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { Data, EtiquetaBobinaModel } from '../../../../../models/entrada-mercancia/etiqueta-bobina.model';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-etiqueta-bobina',
  templateUrl: './etiqueta-bobina.component.html',
  styleUrls: ['./etiqueta-bobina.component.scss']
})
export class EtiquetaBobinaComponent implements OnInit {

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
    this.alertaActualizarFuenteDatos();

    this.auth.user$.subscribe(data => {
      this.usuario = data.email;
    });
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  async alertaActualizarFuenteDatos(event?: any) {

    const alert = await this.alertCtrl.create({
      header: 'Actualizar datos SCP Coexpan',
      message: 'Desea actualizar la fuente de datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            if (event) { event.target.complete(); }
            this.reestablecerDatos();
          }
        }, {
          text: 'Actualizar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.actualizarFuenteDatos();
          }
        }
      ]
    });
    await alert.present().finally(() => {
      if (event) { event.target.complete(); }
    });
  }

  actualizarFuenteDatos(): void {
    this.toolService.simpleLoader('Refrescando datos...');
    this.cxpService.getEjecutarEtlPesaje().then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data);
        if (data.Response[0].STATUS === 1) {
          this.presentToast('Datos refrescados', 2000, 'success');
        } else {
          this.presentToast('Error en la comunicación con el servidor. \n Intente nuevamente.', 5000, 'warning');
        }
      } else {
        this.presentToast(data.Status.Message, 5000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => { this.toolService.dismissLoader(); this.reestablecerDatos();});
  }

  async alertaConfirmarEtiquetaBobina() {

    const ipPrint = localStorage.getItem('ipimp');

    if (!ipPrint) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Etiqueta Bobina',
      message: 'Desea generar Etiqueta de Pallet Bobinas?',
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
    const etiqueta: EtiquetaBobinaModel = new EtiquetaBobinaModel();
    etiqueta.data = new Data();

    etiqueta.login = '';
    etiqueta.ipPrint = localStorage.getItem('ipimp');
    etiqueta.sapetiqueta = this.chkSapEtiqueta.checked;
    etiqueta.data.codBarras = this.limpiarCodigos(this.txtCodigos.value);
    etiqueta.data.fechaScan = this.obtenerFecha();
    etiqueta.data.bodega = 1;
    etiqueta.data.idUsuario = 0;

    this.toolService.simpleLoader('Cargando...');
    this.cxpService.postEtiquetaBobinaEm(etiqueta).then((data: any) => {

      if (data.Status.Status === 'T') {
        this.presentToast(data.Status.Message, 5000, 'success');
        this.reestablecerDatos();

      } else {
        this.presentToast(data.Status.Message, 5000, 'warning');
      }
    }, (erro: any) => {
      console.error(erro);
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
