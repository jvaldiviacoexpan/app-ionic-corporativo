import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonInput, IonButton, MenuController, ToastController, AlertController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { Data, RequestDatosEtiqueta } from 'src/models/requestEtqCajaPalletModel.model';



@Component({
  selector: 'app-reimprimir-pt-caja',
  templateUrl: './reimprimir-pt-caja.component.html',
  styleUrls: ['./reimprimir-pt-caja.component.scss']
})
export class ReimprimirPtCajaComponent implements OnInit, AfterViewInit {

  // Componentes
  @ViewChild('txtCodigo') txtCodigo: IonInput;
  @ViewChild('cantCajas') txtCantCajas: IonInput;
  @ViewChild('btnCodigo') btnCodigo: IonButton;

  etRows: [] = [];

  dtoDatosResponse: any;
  loading = false;

  constructor(
    private menuCtrl: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private toolService: ToolService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacionCaja(cod: string): any {
    this.reestablecerDatos();
    this.loading = true;

    if (cod.length === 0) {
      this.presentToast('Escanee un codigo antes de continuar.', 2000, 'warning');
      this.codigoSetFocus();
      return;
    }

    this.accionBusqueda(true);
    this.cxpService.postObtenerDatosEtiqueta(cod).then((resp: any) => {
      if (resp.Status.Status === 'T') {
        this.dtoDatosResponse = resp;
        this.etRows = this.dtoDatosResponse.Response;
      } else {
        this.presentToast(resp.Status.Message, 2000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.accionBusqueda(false);
    });
  }

  async alertaConfirmarEtiqueta(data: any) {

    const alert = await this.alertController.create({
      header: 'Imprimir Etiqueta',
      message: 'Desea imprimir la etiqueta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            // console.log('Confirm Cancel.');
          }
        }, {
          text: 'Imprimir',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.emitirPalletCajaCoembal(data);
          }
        }
      ]
    });
    await alert.present();
  }

  emitirPalletCajaCoembal(data: any): void {

    const req: RequestDatosEtiqueta = new RequestDatosEtiqueta();
    req.data = new Data();
    req.ipPrint = localStorage.getItem('ipimp');

    req.data.descProducto = data.DESC_PRODUCTO;
    req.data.cliente = data.CLIENTE;
    req.data.proceso = data.PROCESO;
    req.data.cantxCaja = data.CANTIDADXCAJA;
    req.data.lote = data.LOTE;
    req.data.color = data.COLOR;
    req.data.codProducto = data.COD_PRODUCTO;
    req.data.cantidadCajas = data.CANTIDAD_CAJAS;
    req.data.correlativo = data.CORRELATIVO;
    req.data.fecha = data.FECHA;
    req.data.codigoQr = data.CODIGO_QR;
    req.data.tipoResina = 'ND';
    req.data.codProceso = 'ND';
    req.data.sapCorrel = data.SAP_CORREL;


    console.log(req);

    this.toolService.simpleLoader('Enviando datos...');
    this.cxpService.postReimprimirCajaPallet(req).then((resp: any) => {
      if (resp.Status === 'T') {
        this.presentToast('Imprimiendo etiqueta...', 2000, 'success');
        this.reestablecerDatos();
      } else {
        this.presentToast(resp.Message, 5000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }

  get deshabilitarBotonEnviar(): boolean {
    let resp = true;
    if (this.dtoDatosResponse) {
      resp = false;
    }
    return resp;
  }

  codigoSetFocus() { setTimeout(() => { this.txtCodigo.setFocus(); }, 300); }

  accionBusqueda(action: boolean) {
    this.txtCodigo.disabled = action;
    this.btnCodigo.disabled = action;
    this.loading = action;
    if (action) { this.txtCodigo.value = ''; }
  }

  reestablecerDatos() {
    this.etRows = [];
  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

  successEntradaMercancia(): boolean {
    let ok = true;
    const ipPrint = localStorage.getItem('ipimp');
    const login = localStorage.getItem('sapusr');

    if (!ipPrint) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      ok = false;
    }
    if (!login) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      ok = false;
    }

    return ok;

  }

}

