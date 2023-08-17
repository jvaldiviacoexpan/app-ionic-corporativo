import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, IonInput, IonButton, AlertController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { EtiquetaPalletBobinaModel, ModelData } from 'src/models/entrada-mercancia/etiqueta-pallet-bobina.model';


@Component({
  selector: 'app-reimprimir-etiqueta-bobina',
  templateUrl: './reimprimir-etiqueta-bobina.component.html',
  styleUrls: ['./reimprimir-etiqueta-bobina.component.scss']
})
export class ReimprimirEtiquetaBobinaComponent implements OnInit {

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

    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Reimprimir Etiqueta',
      message: 'Desea imprimir la etiqueta Pallet Bobina?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            if (event) { event.target.complete(); }
          }
        }, {
          text: 'Imprimir',
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

    this.toolService.simpleLoader('Enviando datos...');
    const etq: EtiquetaPalletBobinaModel = new EtiquetaPalletBobinaModel();
    etq.modelData = new ModelData();
    etq.ipAddress = localStorage.getItem('ipimp');
    etq.modelData.descProducto = this.dtoDatosResponse.NOM_PRODUCTO;
    etq.modelData.cliente = this.dtoDatosResponse.CLIENTE;
    etq.modelData.medidas = this.dtoDatosResponse.MEDIDAS;
    etq.modelData.pesoBruto = this.dtoDatosResponse.PESO_BRUTO;
    etq.modelData.pesoNeto = this.dtoDatosResponse.PESO_NETO;
    etq.modelData.ordenFab = this.dtoDatosResponse.ORDEN_FAB;
    etq.modelData.codProducto = this.dtoDatosResponse.COD_PRODUCTO;
    etq.modelData.cantBobinas = this.dtoDatosResponse.CANT_BOB;
    etq.modelData.correlativo = this.dtoDatosResponse.CORRELATIVO;
    etq.modelData.fecha = this.dtoDatosResponse.FECHA;
    // etq.modelData.hora = this.dtoDatosResponse.HORA;
    etq.modelData.codQr = this.dtoDatosResponse.CODBAR_MULTI;
    etq.modelData.sapCorrel = this.dtoDatosResponse.SAP_CORREL;

    this.accionBusqueda(true);
    this.cxpService.postReimprimirEtiquetaBobinaEm(etq).then((resp: any) => {
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
