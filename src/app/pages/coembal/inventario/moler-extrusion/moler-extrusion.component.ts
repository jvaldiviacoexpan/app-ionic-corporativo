import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, AlertController, IonInput } from '@ionic/angular';
import { Data, TransferenciaStockModel } from 'src/models/transferencia-stock.model';
import { ToolService } from 'src/providers/external/tools.service';
import { CxpService } from 'src/providers/internal/cxp.service';
import { SapService } from 'src/providers/internal/sap.service';
import { DataPorMolerModel, Data2 } from '../../../../../models/transferencia-por-moler.model';


@Component({
  selector: 'app-transferencia-stock',
  templateUrl: './moler-extrusion.component.html',
styleUrls: ['./moler-extrusion.component.scss']
})
export class MolerExtrusionComponent implements OnInit {

  @ViewChild('txtCodigo') txtQr: IonInput;
  transferenciaModel = new TransferenciaStockModel();
  porMolerModel: any = {};
  porMolerModelBobinas: any = {};
  unidadMedida = '';
  qrMoler = '';
  bodegas: any[] = [];
  bodegasDestino: any[] = [];
  mensaje: string;
  consultaStock: any = {};
  isBtnExtrusion: boolean;
  loading = false;

  bodegaOrigen = {
    codigo: '',
    nombre: ''
  };

  bodegaDestino = {
    codigo: '',
    nombre: '',
  };

  constructor(
    private menuCtrl: MenuController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private toolService: ToolService,
    private sapService: SapService,
    private cxpService: CxpService,
  ) { }

  get deshabilitarBotonEnviar(): number {
    let resp = 0;
    if (this.porMolerModel.produccionOF) {
      if(this.porMolerModel.produccionOF === '' || this.porMolerModel.produccionOF === null)  { resp++; }
      if(this.porMolerModel.bodega === '' || this.porMolerModel.bodega === null)  { resp++; }
      if(this.porMolerModel.cantidadCajas === 0  || this.porMolerModel.cantidadCajas === null) { resp++; }
      if(this.porMolerModel.fecha === '' || this.porMolerModel.fecha === null)  { resp++; }
      if(this.porMolerModel.lote === '' || this.porMolerModel.lote === null)  { resp++; }
      if(this.porMolerModel.cantidad === 0  || this.porMolerModel.cantidad === null) { resp++; }
      if(this.porMolerModel.total === '' || this.porMolerModel.total === null)  { resp++; }
      if(this.porMolerModel.precioEnvase === '' || this.porMolerModel.precioEnvase === null)  { resp++; }
      if(this.porMolerModel.descripcionProducto === '' || this.porMolerModel.descripcionProducto === null)  { resp++; }
      if(this.porMolerModel.codProceso === '' || this.porMolerModel.codProceso === null)  { resp++; }
      if(this.porMolerModel.proceso === '' || this.porMolerModel.proceso === null)  { resp++; }
      if(this.porMolerModel.cantxCaja === '' || this.porMolerModel.cantxCaja === null)  { resp++; }
      if(this.porMolerModel.color === '' || this.porMolerModel.color === null)  { resp++; }
      if(this.porMolerModel.tipoResina === '' || this.porMolerModel.tipoResina === null)  { resp++; }
      if(this.porMolerModel.codCosto === '' || this.porMolerModel.codCosto === null)  { resp++; }
      // if(this.porMolerModel.familia === '' || this.porMolerModel.familia === null)  { resp++; }
      if(this.porMolerModel.peso === '' || this.porMolerModel.peso === null)  { resp++; }
      if(this.porMolerModel.codigoPorMoler === '' || this.porMolerModel.codigoPorMoler === null)  { resp++; }
      if(this.porMolerModel.codigoProducto === '' || this.porMolerModel.codigoProducto === null)  { resp++; }
      if(this.porMolerModel.cliente === '' || this.porMolerModel.cliente === null)  { resp++; }
      if(this.porMolerModel.nombreMaquina === '' || this.porMolerModel.nombreMaquina === null)  { resp++; }
      if(this.porMolerModel.precio === '' || this.porMolerModel.precio === null)  { resp++; }
      // if(this.porMolerModel.ipImpresora === '' || this.porMolerModel.ipImpresora === null)  { resp++; }
    } else {
      resp++;
    }
    // console.log(resp);
    return resp;
  }

  get deshabilitarBotonEnviarBobinas(): number {
    let resp = 0;
      if(this.porMolerModelBobinas.produccionOF) {
        if(this.porMolerModelBobinas.bodega === '' || this.porMolerModelBobinas.bodega === null)  { resp++; }
        if(this.porMolerModelBobinas.cantidad === 0 || this.porMolerModelBobinas.cantidad === null)  { resp++; }
        if(this.porMolerModelBobinas.cliente === ''  || this.porMolerModelBobinas.cliente === null) { resp++; }
        if(this.porMolerModelBobinas.codCosto === '' || this.porMolerModelBobinas.codCosto === null)  { resp++; }
        if(this.porMolerModelBobinas.codigoBarra === '' || this.porMolerModelBobinas.codigoBarra === null)  { resp++; }
        if(this.porMolerModelBobinas.codigoPorMoler === 0  || this.porMolerModelBobinas.codigoPorMoler === null) { resp++; }
        if(this.porMolerModelBobinas.codigoProducto === '' || this.porMolerModelBobinas.codigoProducto === null)  { resp++; }
        if(this.porMolerModelBobinas.color === '' || this.porMolerModelBobinas.color === null)  { resp++; }
        if(this.porMolerModelBobinas.descripcionProducto === '' || this.porMolerModelBobinas.descripcionProducto === null)  { resp++; }
        if(this.porMolerModelBobinas.lote === '' || this.porMolerModelBobinas.lote === null)  { resp++; }
        if(this.porMolerModelBobinas.precio === '' || this.porMolerModelBobinas.precio === null)  { resp++; }
        if(this.porMolerModelBobinas.tipoResina === '' || this.porMolerModelBobinas.tipoResina === null)  { resp++; }
        if(this.porMolerModelBobinas.total === '' || this.porMolerModelBobinas.total === null)  { resp++; }
        if(this.porMolerModelBobinas.unidadMedida === '' || this.porMolerModelBobinas.unidadMedida === null)  { resp++; }
    } else {
      resp++;
    }
    console.log(resp);
    return resp;
  }

  ngOnInit(): void {
    this.transferenciaModel.data = new Data();
    this.obtenerBodegas();
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }


   // TODO Mejorar este metodo
  obtenerInformacion(qr: string): void {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    if (qr.indexOf('-') !== -1) {
      this.isBtnExtrusion = true;
      const transf = qr.split('-');
      this.qrMoler = qr.trim();
      this.transferenciaModel.data.itemCode = transf[0];
      this.transferenciaModel.data.lote = transf[1];
      this.transferenciaModel.data.cantidad = Number(transf[3]);
    } else {
      this.isBtnExtrusion = false;
      if (qr.length === 16) {
        this.obtenerInformacionPorMolerbobinas(qr.trim());
      } else {
        this.presentToast('Código no identificado...', 5000, 'warning');
      }
    }

  }

  obtenerBodegas() {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    const loginn = {
      login: localStorage.getItem('sapusr'),
      data: {
        login: ''
      }
    };

    this.toolService.simpleLoader('Obteniendo información...');
    this.sapService.getObtenerBodegas(loginn).then((data: any) => {
      if (data.Status.Status === 'T') {
        // console.log(data);
        if (data.Status.Status === 'T') {
          this.bodegas = data.Response;
          // console.log(this.bodegas);
        } else {
          this.presentToast('Error en la comunicación con el servidor. \n Intente nuevamente', 5000, 'warning');
        }
      } else {
        this.presentToast(data.Status.Message, 5000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }


  obtenerInformacionPorMoler(qr: string) {

    const sap = {
      login: localStorage.getItem('sapusr'),
      data: this.qrMoler
    };

    this.toolService.simpleLoader('Obteniendo datos del pallet...');
    this.cxpService.postObtenerInformacionMoler(sap).then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data.Response);
        this.porMolerModel = data.Response;
      } else {
        this.presentToast(data.Sap_Message, 10000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }


  obtenerInformacionPorMolerbobinas(qr: string) {

    const sap = {
      login: localStorage.getItem('sapusr'),
      data: qr
    };

    this.toolService.simpleLoader('Obteniendo datos del pallet...');
    this.cxpService.postObtenerInformacionMolerBobinas(sap).then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data.Response);
        this.porMolerModelBobinas = data.Response;
        this.transferenciaModel.data.itemCode = this.porMolerModelBobinas.codigoProducto;
        this.transferenciaModel.data.lote = this.porMolerModelBobinas.lote;
        this.transferenciaModel.data.cantidad = this.porMolerModelBobinas.cantidad;
      } else {
        this.presentToast(data.Message, 10000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }


  consultarStockSap(event: any) {
    this.transferenciaModel.data.bodegaDestino = '';
    const consultarStock =
    {
      login: localStorage.getItem('sapusr'),
      data: {
        itemCode: this.transferenciaModel.data.itemCode,
        whsCode: event.detail.value,
        batchNumber: this.transferenciaModel.data.lote
      }
    };

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    this.toolService.simpleLoader('Consultando Stock...');

    this.sapService.postConsultarStock(consultarStock).then((data: any) => {
      if (data.Status.Status === 'T') {
          if (this.isBtnExtrusion) {
            this.consultaStock = data.Response[0];
            this.llenarDatosOrigen(consultarStock.data.whsCode);
            this.qrMoler = this.qrMoler + `-${consultarStock.data.whsCode}`;
            this.obtenerInformacionPorMoler(this.qrMoler);
          } else {
            this.consultaStock = data.Response[0];
            this.llenarDatosOrigen(consultarStock.data.whsCode);
            this.porMolerModelBobinas.bodega = consultarStock.data.whsCode;
          }

        } else {
          this.presentToast(data.Status.Message, 5000, 'warning');
          this.consultaStock = {};
          this.bodegaOrigen = { codigo: '', nombre: '' };
        }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());

  }

  llenarDatosOrigen(codBodega: string) {
    this.bodegas.forEach(e => {
      if (e.Codigo === codBodega) {
        this.bodegaOrigen.nombre = e.Bodega;
        this.bodegaOrigen.codigo = codBodega;
        // this.llenarDatosDestino(codBodega);
        return;
      }
    });
  }

  // llenarDatosDestino(codBodega: string) {
  //   this.bodegasDestino = this.bodegas.filter(e => e.Codigo !== codBodega);
  //   this.statusTransferencia();
  // }

  async alertaConfirmarTransferencia() {

    const alert = await this.alertCtrl.create({
      header: 'Transferencia Por Moler',
      message: 'Desea transferir los productos?',
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
            this.iniciarTransferenciaStockPorMoler();
          }
        }
      ]
    });
    await alert.present();
  }


  async alertaConfirmarTransferenciaBobinas() {

    const alert = await this.alertCtrl.create({
      header: 'Transferencia Por Moler Bobinas',
      message: 'Desea transferir los productos?',
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
            this.iniciarTransferenciaStockPorMolerBobinas();
          }
        }
      ]
    });
    await alert.present();
  }


  statusTransferencia(): boolean {
    console.log(this.transferenciaModel.data.cantidad);
    console.log(this.consultaStock.BatchQuantity);

    if (this.transferenciaModel.data.cantidad > Number(this.consultaStock.BatchQuantity)) {
      this.mensaje = 'Cantidad a transferir supera a Bodega Origen.';
      return true;
    } else {
      return false;
    }
  }

  iniciarTransferenciaStockPorMoler() {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione impresora antes de continuar.', 5000, 'warning');
      return;
    }

    const moler: DataPorMolerModel = new DataPorMolerModel();
    moler.data = new Data2();

    moler.login = localStorage.getItem('sapusr');
    moler.data.ipImpresora = localStorage.getItem('ipimp');
    moler.data.produccionOF = this.porMolerModel.produccionOF;
    moler.data.bodega = this.porMolerModel.bodega;
    moler.data.cantidadCajas = this.porMolerModel.cantidadCajas;
    moler.data.fecha = this.porMolerModel.fecha;
    moler.data.lote = this.porMolerModel.lote;
    moler.data.cantidad = this.porMolerModel.cantidad;
    moler.data.total = this.porMolerModel.total;
    moler.data.precioEnvase = this.porMolerModel.precioEnvase;
    moler.data.descripcionProducto = this.porMolerModel.descripcionProducto;
    moler.data.codProceso = this.porMolerModel.codProceso;
    moler.data.proceso = this.porMolerModel.proceso;
    moler.data.cantxCaja = this.porMolerModel.cantxCaja;
    moler.data.color = this.porMolerModel.color;
    moler.data.tipoResina = this.porMolerModel.tipoResina;
    moler.data.codCosto = this.porMolerModel.codCosto;
    moler.data.familia = this.porMolerModel.familia;
    moler.data.peso = this.porMolerModel.peso;
    moler.data.codigoPorMoler = this.porMolerModel.codigoPorMoler;
    moler.data.codigoProducto = this.porMolerModel.codigoProducto;
    moler.data.cliente = this.porMolerModel.cliente;
    moler.data.nombreMaquina = this.porMolerModel.nombreMaquina;
    moler.data.unidadMedida = this.porMolerModel.unidadMedida;
    moler.data.precio = this.porMolerModel.precio;

    this.toolService.simpleLoader('Cargando...');
    this.cxpService.postTransferenciaPorMoler(moler).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast('Transferencia realizada con exito.', 5000, 'success');
        this.reestablecerDatos();
      } else {
        this.presentToast(data.Sap_Message, 10000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }


  iniciarTransferenciaStockPorMolerBobinas() {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione impresora antes de continuar.', 5000, 'warning');
      return;
    }

    const request = {
      login: localStorage.getItem('sapusr'),
      data: this.porMolerModelBobinas
    };

    request.data.ipImpresora = localStorage.getItem('ipimp');

    this.toolService.simpleLoader('Cargando...');
    this.cxpService.postTransferenciaPorMolerBobinas(request).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast('Transferencia realizada con exito.', 5000, 'success');
        this.reestablecerDatos();
      } else {
        this.presentToast(data.Sap_Message, 10000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }


  reestablecerDatos() {
    this.transferenciaModel = new TransferenciaStockModel();
    this.transferenciaModel.data = new Data();
    this.txtQr.value = '';
    this.mensaje = '';
    this.consultaStock = {};
    this.bodegasDestino = [];
    this.bodegaOrigen = {
      codigo: '',
      nombre: ''
    };
    this.bodegaDestino = {
      codigo: '',
      nombre: '',
    };
    this.txtQr.setFocus();
  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
