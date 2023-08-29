import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  IonInput, MenuController, ToastController,
  AlertController, NavParams, ModalController, IonSelect, IonButton, IonCardHeader
} from '@ionic/angular';
import { Data, DataAditional } from '../../../../../../models/transferencia-stock.model';
import { ToolService } from '../../../../../../providers/external/tools.service';
import { SapService } from '../../../../../../providers/internal/sap.service';
import { uid } from 'uid';


@Component({
  selector: 'app-transferencia-stock-masivo-modal',
  templateUrl: './transferencia-stock-masivo-modal.component.html',
  styleUrls: ['./transferencia-stock-masivo-modal.component.scss']
})

export class TransferenciaStockMasivoModalComponent implements OnInit, AfterViewInit {

  @ViewChild('selectOrigen') selectOrigen: IonSelect;
  @ViewChild('selectDestino') selectDestino: IonSelect;
  @ViewChild('txtCantidadPallet') txtCantidadPallet: IonInput;
  @ViewChild('btnEmision') btnEmision: IonButton;
  @ViewChild('sapcard') sapcard: IonCardHeader;

  bodegas: any[] = [];
  bodegasOrigen: any[] = [];
  bodegasDestino: any[] = [];
  mensaje = 'Cantidad a transferir supera a Bodega Origen.';
  cantidadTotal: number;
  stockBodegaOrigen: number;
  consultaStockBodega: any = {};
  respuestaStockBodega: any = [];
  datosExistentes: DataAditional = new DataAditional();
  loading = false;
  bocolor = 'warning';

  bodegaOrigen = {
    codigo: '',
    nombre: ''
  };

  bodegaDestino = {
    codigo: '',
    nombre: '',
  };

  constructor(
    private navParams: NavParams,
    private menuCtrl: MenuController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private toolService: ToolService,
    private sapService: SapService,
  ) {

  }

  get deshabilitarBotonEnviar(): boolean {
    let resp = true;
    if (this.datosExistentes.data.itemCode && this.datosExistentes.data.lote) {
      if (this.datosExistentes.data.itemCode !== undefined &&
        this.datosExistentes.data.itemCode !== '' &&
        this.datosExistentes.data.bodegaOrigen &&
        this.datosExistentes.data.cantidad <= this.stockBodegaOrigen &&
        this.datosExistentes.cantidadPallets > 0 &&
        this.datosExistentes.data.bodegaDestino) {
          resp = false;
      }
    }

    return resp;
  }

  get calcularCantidadTotal() {
    this.cantidadTotal = this.datosExistentes.cantidadPallets * this.datosExistentes.cantidadEnvasesPallet;
    this.datosExistentes.data.cantidad = this.cantidadTotal;
    return this.cantidadTotal;
  }

  get getObtenerBodegaOrigen(): boolean {
    let status: boolean;
    // console.log(this.transferenciaModel.data.bodegaOrigen);
    if (this.datosExistentes.data.bodegaOrigen !== undefined) {
      status = false;
    } else {
      status = true;
    }
    // console.log(this.transferenciaModel.data);
    return status;
  }

  get getEmisionSap(): boolean {
    return !isNaN(this.datosExistentes.sapEstado);
  }


  ngOnInit(): void {
    this.obtenerBodegas();
    console.log(this.navParams.get('datos'));
    this.datosExistentes.data = new Data();
    this.datosExistentes = this.navParams.get('datos');
    this.datosExistentes.data = this.navParams.get('datos').data;
    this.llenarDatosExtras();
    this.consultarStockBodegaSap();
    if (this.navParams.get('datos').uidd.length === 0) {
      this.datosExistentes.data.comentario = '1';
    } else {
      this.stockBodegaOrigen = Number(JSON.parse(this.datosExistentes.bodegaOrigenJson).BatchQuantity);
    }

  }

  ngAfterViewInit(): void {
    if (!isNaN(this.datosExistentes.sapEstado)) {
      this.btnEmision.disabled = true;
    }
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  consultarStockBodegaSap() {

    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    const consultarStock =
    {
      login: localStorage.getItem('sapusr'),
      data: {
        itemCode: this.datosExistentes.data.itemCode,
        batchNumber: this.datosExistentes.data.lote
      }
    };

    this.toolService.simpleLoader('Cargando...');

    this.sapService.postConsultarStockBodega(consultarStock).then((data: any) => {
      if (data.Status.Status === 'T') {
        if (data.Status.Status === 'T') {
          this.respuestaStockBodega = data.Response;
          this.llenarDatosOrigen();
        } else {
          this.presentToast(data.Status.Message, 5000, 'warning');
          this.respuestaStockBodega = {};
          this.bodegaOrigen = { codigo: '', nombre: '' };
          setTimeout(() => {
            this.dismiss();
          }, 0);
        }
      } else {
        this.presentToast(data.Status.Message, 5000, 'warning');
        this.bodegaOrigen = { codigo: '', nombre: '' };
        setTimeout(() => {
            this.dismiss();
          }, 0);
      }

      console.log(isNaN(this.datosExistentes.sapEstado));
      if (isNaN(this.datosExistentes.sapEstado) === false) {
        setTimeout(() => {
          console.log('paso por el metodo importante');
          this.disableAll();
        }, 250);
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());

  }

  llenarDatosOrigen() {
    this.respuestaStockBodega.forEach((e: any) => {
      // console.log(e);
      this.bodegasOrigen.push(e);
      this.llenarDatosDestino(e.WhsCode);
    });
  }

  ionChangeDatosOrigen(row: any) {
    // this.transferenciaModel.data.bodegaOrigen = '01';
    const dataOrigen = JSON.parse(row.value);
    this.datosExistentes.data.bodegaOrigen = dataOrigen.WhsCode;
    this.stockBodegaOrigen = dataOrigen.TotalStock;
    this.llenarDatosDestino(dataOrigen.WhsCode);
  }

  llenarDatosDestino(codBodega: string) {
    this.bodegasDestino = this.bodegas.filter(e => e.Codigo !== codBodega);
    // this.statusTransferencia();
  }

  llenarDatosExtras() {
    this.datosExistentes.data.itemCode = this.navParams.get('datos').data.itemCode;
    // this.datosExistentes.cantidadEnvasesPallet = this.navParams.get('datos').data.cantidad;
    // this.datosExistentes.data.lote = this.navParams.get('datos').data.lote;
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

    // this.toolService.simpleLoader('Cargando...');
    this.sapService.getObtenerBodegas(loginn).then((data: any) => {
      if (data.Status.Status === 'T') {
        console.log(data);
        if (data.Status.Status === 'T') {
          this.bodegas = data.Response;
        } else {
          this.presentToast('Error en la comunicación con el servidor. \n Intente nuevamente', 5000, 'warning');
        }
      } else {
        this.presentToast(data.Status.Message, 5000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(
      // () => this.toolService.dismissLoader()
    );
  }

  ionchangeCantidadTotal() {
    this.datosExistentes.data.cantidad = this.datosExistentes.cantidadPallets * this.datosExistentes.cantidadEnvasesPallet;
  }

  disableAll() {
    this.selectOrigen.disabled = true;
    this.selectDestino.disabled = true;
    this.txtCantidadPallet.disabled = true;
    this.btnEmision.disabled = true;
    this.stockBodegaOrigen = 0;
    this.bocolor = this.datosExistentes.status;
    this.mensaje = this.datosExistentes.sapMensaje;
    // this.sapcard.color = this.datosExistentes.status;
  }


  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

  dismissData() {
    this.datosExistentes.data.cantidad = this.datosExistentes.cantidadPallets * this.datosExistentes.cantidadEnvasesPallet;
    if (this.datosExistentes.uidd.length === 0) {
      this.datosExistentes.uidd = uid();
    }
    this.datosExistentes.bodegaOrigenJson = this.datosExistentes.bodegaOrigenJson;
    this.datosExistentes.status = 'warning';
    this.modalCtrl.dismiss(this.datosExistentes);
  }


  dismiss() {
    this.modalCtrl.dismiss();
  }

}
