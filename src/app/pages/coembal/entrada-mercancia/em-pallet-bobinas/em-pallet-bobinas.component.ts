import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, IonInput, IonButton, AlertController, IonItemSliding } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  selector: 'app-em-pallet-bobinas',
  templateUrl: './em-pallet-bobinas.component.html',
  styleUrls: ['./em-pallet-bobinas.component.scss']
})
export class EmPalletBobinaComponent implements OnInit {

  @ViewChild('txtCodigo') txtCodigo: IonInput;
  @ViewChild('btnCodigo') btnCodigo: IonButton;

  dtoDatosResponse: any = {};
  arrayDtoDatosResponse: any[] = [];
  countLoadingDtoDatosResponse: any[] = [];
  arrayCodigosAlmacenados: string[] = [];
  loading: boolean;

  constructor(
    private menuCtrl: MenuController,
    private toastController: ToastController,
    private alertController: AlertController,
    private cxpService: CxpService,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void {
    this.loading = false;
  }

  get disabledBotonImprimir() {
    let sts = true;
    if (this.arrayDtoDatosResponse.length > 0) {
      if (this.arrayDtoDatosResponse.filter(e => e.Data.fase.codStatus !== '200').length > 0) {
        // if (this.loading === false) {
        //   sts = false;
        // } else {
        //   sts = true;
        // }
        console.log(`loading: ${this.loading}`);

        sts = this.loading;
      }
    }
    console.log(sts);
    return sts;
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacionCaja(cod: string): any {

    this.reestablecerDatos();
    if (cod.length === 0) {
      this.presentToast('Escanee un codigo antes de continuar.', 2000, 'warning');
      this.codigoSetFocus();
      return;
    }

    if (this.verificarCodigoExistencialista(cod.trim())) {
      this.presentToast('El Pallet ya se encuentra o esta cargando.', 2000, 'warning');
      return;
    } else {
      this.arrayCodigosAlmacenados.push(cod);
    }

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 2000, 'warning');
      return;
    }

    const datos = { data: '', login: '' };
    datos.data = cod.trim();
    datos.login = localStorage.getItem('sapusr');

    this.countLoadingDtoDatosResponse.push('');

    this.accionBusqueda(true);
    this.cxpService.postSapObtenerDatosEtiquetaBobinaEm(datos).then((resp: any) => {
      if (resp.Data.status.Status === 'T') {
        this.arrayDtoDatosResponse.push(resp);
      } else {
        this.presentToast(resp.Data.status.Message, 2000, 'warning');
        this.eliminarCodigosTemporal(cod);
      }
    }, (err) => {
      this.eliminarCodigosTemporal(cod);
      console.warn(err);
    }).finally(() => {
      this.accionBusqueda(false);
      this.countLoadingDtoDatosResponse.pop();
    });
  }

  async alertaEnviarEntradaMercanciaPalletBobina(event?: any) {

    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 2000, 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'SAP Business One',
      message: 'Desea enviar el Pallet al sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            // if (event) { event.target.complete(); }
          }
        }, {
          text: 'Si, Enviar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.enviarEntradaMercanciaPalletBobina();
          }
        }
      ]
    });
    await alert.present().finally(() => {
      // if (event) { event.target.complete(); }
    });
  }

  enviarEntradaMercanciaPalletBobina() {

    this.accionBusqueda(true);
    const arrayTemporal = this.arrayDtoDatosResponse.filter(e => e.Data.fase.codStatus !== '200');
    this.loading = true;
    let count = 1;
    // this.toolService.simpleLoader('Enviando...');

    arrayTemporal.forEach(em => {

      em.IpPrint = localStorage.getItem('ipimp');
      em.Login = localStorage.getItem('sapusr');
      em.Data.fase.loadingStatus = true;
      em.Data.fase.codStatus = '200';


      this.cxpService.postAgregarEntradaMercanciaPalletBobinas(em).then((resp: any) => {
        if (em.Data.modelData.codQr === resp.Data.modelData.codQr) {
          this.eliminarPallet(em, false);
          resp.Data.fase.loadingStatus = false;
          this.arrayDtoDatosResponse.push(resp);
          this.arrayCodigosAlmacenados.push(resp.Data.modelData.codQr);

          if (arrayTemporal.length === count) {
            this.loading = false; } else { count++;
          }
        }

      }, (err) => {
          this.loading = false;
          console.warn(err);
      }).finally(() => {
        this.loading = false;
      });

      // Prueba NO BORRAR
      // setTimeout(() => {
      //   const resp = em;
      //   resp.Data.fase.loadingStatus = false;
      //   resp.Data.fase.codStatus = '200';
      //   resp.Data.fase.labelStatus = 'success';
      //   resp.Data.fase.messageStatus = 'Prueba - Pallet registrado con exito SAP BO.';
      //   this.eliminarPallet(em, false);
      //   this.arrayDtoDatosResponse.push(resp);
      //   this.arrayCodigosAlmacenados.push(resp.Data.modelData.codQr);
      // }, 8000);

    });

    // this.toolService.dismissLoader();

    this.accionBusqueda(true);
  }

  async alertaReimprimirPalletBobina(event?: IonItemSliding, p?: any) {

    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Imprimir etiqueta',
      message: 'Desea imprimir la etiqueta de <strong>Recepcion?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            // if (event) { event.target.complete(); }
          }
        }, {
          text: 'Si, Imprimir',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.reimprimirPalletBobina(p);
          }
        }
      ]
    });
    await alert.present().finally(() => {
      if (event) { event.close(); }
    });
  }

  reimprimirPalletBobina(p: any) {

    p.IpPrint = localStorage.getItem('ipimp');
    p.Data.fase.loadingStatus = true;

    this.cxpService.postReimprimirEtiquetaPalletRecepcion(p).then((resp: any) => {

      if (resp.Status === 'T') {
        this.presentToast(resp.Message, 2000, 'success');
      } else {
        this.presentToast(resp.Message, 2000, 'warning');
      }

    }, (err) => {
      console.warn(err);
    }).finally(() => {
      p.Data.fase.loadingStatus = false;
    });
  }

  accionBusqueda(action: boolean) {
    if (action) { this.txtCodigo.value = ''; }
  }

  eliminarPallet(uidd, msgsee: boolean) {
    const i = this.arrayDtoDatosResponse.indexOf(uidd);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.eliminarCodigosTemporal(uidd.Data.modelData.codQr);
      this.arrayDtoDatosResponse.splice(i, 1);
      if (msgsee) {
        this.presentToast('Registro eliminado.', 2000, 'medium');
      }
    }
  }

  eliminarCodigosTemporal(uidd) {
    const i = this.arrayCodigosAlmacenados.indexOf(uidd);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.arrayCodigosAlmacenados.splice(i, 1);
    }
  }

  codigoSetFocus() { setTimeout(() => { this.txtCodigo.setFocus(); }, 300); }

  verificarCodigoExistencialista(cod: string): boolean {
    let exists = false;
    console.log(this.arrayCodigosAlmacenados);
    this.arrayCodigosAlmacenados.forEach(e => {
      if (e === cod) { exists = true; }
    });
    return exists;
  }

  reestablecerDatos() {
    this.dtoDatosResponse = {};
    this.txtCodigo.value = '';
    this.codigoSetFocus();
  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
