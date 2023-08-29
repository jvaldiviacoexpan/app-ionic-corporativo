import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, IonInput, IonButton, AlertController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { EtiquetaPalletBobinaModel, ModelData } from 'src/models/entrada-mercancia/etiqueta-pallet-bobina.model';


@Component({
  selector: 'app-eliminar-etiqueta-bobina',
  templateUrl: './eliminar-etiqueta-bobina.component.html',
  styleUrls: ['./eliminar-etiqueta-bobina.component.scss']
})
export class EliminarEtiquetaBobinaComponent implements OnInit {

  @ViewChild('txtCodigo') txtCodigo: IonInput;
  @ViewChild('btnCodigo') btnCodigo: IonButton;

  dtoDatosResponse: any = {};
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
    if (this.dtoDatosResponse) {
      if (this.dtoDatosResponse.NOM_PRODUCTO) {
        sts = false;
      }
    }
    return sts;
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacionCaja(cod: string): any {
    this.reestablecerDatos();
    this.loading = true;
    const data = { data: '', ipPrint: '' };
    if (cod.length === 0) {
      this.presentToast('Escanee un codigo antes de continuar.', 2000, 'warning');
      this.loading = false;
      this.codigoSetFocus();
      return;
    }

    data.data = cod.trim();
    this.accionBusqueda(true);
    this.cxpService.postObtenerDatosEtiquetaBobinaEm(data).then((resp: any) => {
      if (resp.Status.Status === 'T') {
        this.dtoDatosResponse = resp.Response[0];
        console.log(this.dtoDatosResponse);
      } else {
        this.presentToast(resp.Status.Message, 2000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.accionBusqueda(false);
    });
  }

  async alertaReimprimirEtiquetaPalletBobina(event?: any) {

    const alert = await this.alertController.create({
      header: 'Eliminar Etiqueta Pallet',
      message: 'Desea eliminar la etiqueta <Strong>Pallet Bobina</Strong> del sistema?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            if (event) { event.target.complete(); }
          }
        }, {
          text: 'Si, Eliminar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.reimprimirEtiquetaPalletBobina();
          }
        }
      ]
    });
    await alert.present().finally(() => {
      if (event) { event.target.complete(); }
    });
  }

  reimprimirEtiquetaPalletBobina() {

    const data = { data: '', ipPrint: '' };
    data.data = this.dtoDatosResponse.CODBAR_MULTI;

    this.toolService.simpleLoader('Esperando Respuesta...');

    this.accionBusqueda(true);
    this.cxpService.postEliminarEtiquetaBobinaEm(data).then((resp: any) => {
      if (resp.Status === 'T') {
        this.presentToast(resp.Message, 3000, 'success');
      } else {
        this.presentToast(resp.Message, 4000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.toolService.dismissLoader();
      this.reestablecerDatos();
      this.accionBusqueda(false);
    });
  }

  accionBusqueda(action: boolean) {
    this.txtCodigo.disabled = action;
    this.btnCodigo.disabled = action;
    this.loading = action;
    if (action) { this.txtCodigo.value = ''; }
  }

  codigoSetFocus() { setTimeout(() => { this.txtCodigo.setFocus(); }, 300); }

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
