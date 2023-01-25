
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { IonInput, IonButton, MenuController, ToastController, AlertController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';
import { Data, RequestEntradaMercancia } from 'src/models/requestEntradaMercanciaCajasModel.model';

@Component({
  selector: 'app-pt-caja',
  templateUrl: './pt-caja.component.html',
  styleUrls: ['./pt-caja.component.scss']
})
export class PtCajaComponent implements OnInit, AfterViewInit {

  // Componentes
  @ViewChild('txtCodigo') txtCodigo: IonInput;
  @ViewChild('cantCajas') txtCantCajas: IonInput;
  @ViewChild('btnCodigo') btnCodigo: IonButton;
  @ViewChild('btnEmision') btnEmision: IonButton;

  dtoDatosResponse: any;
  loading = false;
  cliente = '';
  ordenFab = '';
  producto = '';

  constructor(
    private menuCtrl: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private toolService: ToolService,
    private alertController: AlertController,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.btnEmision.disabled = true;
    this.alertaActualizarFuenteDatos();
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacionCaja(cod: string): any {
    this.reestablecerDatos();
    this.loading = true;
    const data = { login: '', data: '' };
    if (cod.length === 0) {
      this.presentToast('Escanee un codigo antes de continuar.', 2000, 'warning');
      this.codigoSetFocus();
      return;
    }
    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }
    data.login = localStorage.getItem('sapusr');
    data.data = cod.trim();
    this.accionBusqueda(true);
    this.cxpService.postBuscarDatosCaja(data).then((resp: any) => {
      if (resp.Status.Status === 'T') {

        console.log(resp);
        this.dtoDatosResponse = resp;
        this.cliente = this.dtoDatosResponse.Response.cliente;
        this.ordenFab = this.dtoDatosResponse.Response.lote;
        this.producto = this.dtoDatosResponse.Response.codigoProducto;
        this.cantidadCajasSetFocus();

      } else {
        this.presentToast(resp.Status.Message, 2000, 'warning');
      }
      // console.log(resp);
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.accionBusqueda(false);
    });
  }

  async alertaActualizarFuenteDatos(event?: any) {

    const alert = await this.alertController.create({
      header: 'Actualizar datos SCP Coembal',
      message: 'Desea actualizar la fuente de datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            if (event) { event.target.complete(); }
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

  async alertaConfirmarEtiqueta() {

    if (!this.successEntradaMercancia() || !this.revisionDatosEntradaMercancia()) {
      return;
    }

    const alert = await this.alertController.create({
      header: 'Entrada de Mercancía',
      message: 'Desea cargar los productos al sistema?',
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
            this.emitirPalletCajaCoembal();
          }
        }
      ]
    });
    await alert.present();
  }

  emitirPalletCajaCoembal(): void {

    const req: RequestEntradaMercancia = new RequestEntradaMercancia();
    req.data = new Data();
    req.data = this.dtoDatosResponse.Response;
    req.login = localStorage.getItem('sapusr');
    req.data.ipImpresora = localStorage.getItem('ipimp');
    req.data.cantidadCajas = Number(this.txtCantCajas.value.toString());

    console.log(req);

    this.toolService.simpleLoader('Enviando datos...');
    this.cxpService.postSapEntradaMercanciaCajaPallet(req).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast('Imprimiendo etiqueta...', 2000, 'success');
        this.reestablecerDatos();
      } else {
        this.presentToast(data.Message, 5000, 'warning');
        setTimeout(() => {
          this.presentToast(`Sap: ${data.Sap_Message}`, 4000, 'warning');
        }, 5000);
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }

  actualizarFuenteDatos(): void {
    this.toolService.simpleLoader('Refrescando datos...');
    this.cxpService.getEjecutarEtlExtrusion().then((data: any) => {
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
    }).finally(() => this.toolService.dismissLoader());
  }

  codigoSetFocus() { setTimeout(() => { this.txtCodigo.setFocus(); }, 300); }
  cantidadCajasSetFocus() { setTimeout(() => { this.txtCantCajas.setFocus(); }, 300); }

  get deshabilitarBotonEnviar(): boolean {
    let resp = true;
    if (this.dtoDatosResponse && this.txtCantCajas) {
      if (this.txtCantCajas.value) {
        if (this.txtCantCajas.value !== undefined && this.txtCantCajas.value !== '0') {
          resp = false;
        }
      }
    }
    return resp;
  }

  accionBusqueda(action: boolean) {
    this.txtCodigo.disabled = action;
    this.btnCodigo.disabled = action;
    this.loading = action;
    if (action) { this.txtCodigo.value = ''; }
  }

  reestablecerDatos() {
    this.cliente = '';
    this.ordenFab = '';
    this.producto = '';
    this.dtoDatosResponse = null;
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
    if (this.dtoDatosResponse.Response.cantxCaja === '0') {
      this.presentToast('SAPBO: Und/Caja o Kg/Bob sin parámetros, modifique en Sap Business One y vuelva a intentar.', 5000, 'warning');
      ok = false;
    }
    return ok;

  }

  revisionDatosEntradaMercancia(): boolean {

    const status = {
      message: ''
    };
    let result = false;
    const list: string[] = [];

    if (this.dtoDatosResponse.Response.bodega === null) {
      status.message = 'Sap BO: Sin asignación de bodega.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.cantxCaja === null) {
      status.message = 'Sap BO: Cantidad por cajas vacío.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.codCosto === null) {
      status.message = 'Sap BO: Sin asignación de código de costo.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.codigoProducto === null) {
      status.message = 'SCP2: Sin asignación de código de producto.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.peso === null) {
      status.message = 'Sap BO: Sin asignación de peso envase.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.precio === null) {
      status.message = 'Sap BO: Precio resina no asignado.';
      list.push(status.message);
    }

    if (this.dtoDatosResponse.Response.precioEnvase === null) {
      status.message = 'Sap BO: Precio envase no válido.';
      list.push(status.message);
    }

    let msg = `Error al enviar Entrada Mercancia. <br> <ul>`;
    if (list.length > 0) {
      list.forEach(e => {
        msg += `<li>${e}</li>`;
      });
      msg += '</ul>';
      this.presentToast(`${msg}`, 5000, 'warning');

    } else {
      result = true;
    }
    return result;

  }

}
