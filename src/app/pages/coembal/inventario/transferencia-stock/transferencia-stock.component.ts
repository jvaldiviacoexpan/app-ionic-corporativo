import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, ToastController, AlertController, IonText, IonInput } from '@ionic/angular';
import { Data, TransferenciaStockModel } from '../../../../../models/transferencia-stock.model';
import { ToolService } from '../../../../../providers/external/tools.service';
import { SapService } from '../../../../../providers/internal/sap.service';


@Component({
  selector: 'app-transferencia-stock',
  templateUrl: './transferencia-stock.component.html',
styleUrls: ['./transferencia-stock.component.scss']
})
export class TransferenciaStockComponent implements OnInit {

  @ViewChild('txtCodigo') txtQr: IonInput;
  transferenciaModel = new TransferenciaStockModel();
  bodegas: any[] = [];
  bodegasDestino: any[] = [];
  mensaje: string;
  consultaStock: any = {};
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
  ) { }

  ngOnInit(): void {
    this.transferenciaModel.data = new Data();
    // this.obtenerBodegas();
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacion(qr: string): void {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    const transf = qr.split('-');
    this.transferenciaModel.data.itemCode = transf[0];
    this.transferenciaModel.data.lote = transf[1];
    this.transferenciaModel.data.cantidad = Number(transf[3]);
    console.log(this.transferenciaModel.data);

  }

  consultarStockSap(event: any) {
    console.log('Probando consulta...');
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

    this.toolService.simpleLoader('Cargando...');

    this.sapService.postConsultarStock(consultarStock).then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data);
        if (data.Status.Status === 'T') {
          this.consultaStock = data.Response[0];
          this.llenarDatosOrigen(consultarStock.data.whsCode);
        } else {
          this.presentToast(data.Status.Message, 5000, 'warning');
          this.consultaStock = {};
          this.bodegaOrigen = { codigo: '', nombre: '' };
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
        this.llenarDatosDestino(codBodega);
        return;
      }
    });
  }

  llenarDatosDestino(codBodega: string) {
    this.bodegasDestino = this.bodegas.filter(e => e.Codigo !== codBodega);
    this.statusTransferencia();
  }

  async alertaConfirmarTransferencia() {

    const alert = await this.alertCtrl.create({
      header: 'Transferencia de',
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
            this.iniciartransferenciaStock();
          }
        }
      ]
    });
    await alert.present();
  }

  get deshabilitarBotonEnviar(): boolean {
    let resp = true;
    if (this.transferenciaModel.data.itemCode && this.transferenciaModel.data.lote) {
      if (this.transferenciaModel.data.itemCode !== undefined &&
        this.transferenciaModel.data.itemCode !== '' &&
        this.transferenciaModel.data.bodegaOrigen &&
        this.transferenciaModel.data.cantidad <= Number(this.consultaStock.BatchQuantity) &&
        this.transferenciaModel.data.bodegaDestino) {
          resp = false;
      }
    }
    return resp;
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

    this.toolService.simpleLoader('Cargando...');
    this.sapService.getObtenerBodegas(loginn).then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data);
        if (data.Status.Status === 'T') {
          this.bodegas = data.Response;
          console.log(this.bodegas);
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

  iniciartransferenciaStock() {

    this.transferenciaModel.login = localStorage.getItem('sapusr');

    this.toolService.simpleLoader('Cargando...');
    this.sapService.postTransferenciaStock(this.transferenciaModel).then((data: any) => {
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
