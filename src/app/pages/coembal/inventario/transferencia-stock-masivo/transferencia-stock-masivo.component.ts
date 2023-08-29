import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, MenuController, ToastController, AlertController, ModalController } from '@ionic/angular';
import { Data, TransferenciaStockModel, DataAditional } from '../../../../../models/transferencia-stock.model';
import { ToolService } from '../../../../../providers/external/tools.service';
import { SapService } from '../../../../../providers/internal/sap.service';
import { TransferenciaStockMasivoModalComponent } from './transferencia-stock-masivo-modal/transferencia-stock-masivo-modal.component';

@Component({
  selector: 'app-transferencia-stock-masivo',
  templateUrl: './transferencia-stock-masivo.component.html',
  styleUrls: ['./transferencia-stock-masivo.component.scss']
})
export class TransferenciaStockMasivoComponent implements OnInit {

  @ViewChild('txtCodigo') txtQr: IonInput;
  transferenciaModel = new TransferenciaStockModel();
  listaPallets: DataAditional[] = [];
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
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private toolService: ToolService,
    private sapService: SapService,
  ) { }

  get deshabilitarBotonEnviar(): boolean {
    let resp = true;
    if (this.listaPallets.filter(e => e.sapEstado === undefined).length > 0) {
          resp = false;
    }
    return resp;
  }

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

    if (qr === '') {
      this.presentToast('Escanea un código QR de etiqueta.', 1000, 'warning');
      return;
    }

    if (qr.split('-').length < 4) {
      this.presentToast('Código QR incorrecto, intente nuevamente.', 1000, 'warning');
      return;
    }

    const transf = qr.split('-');
    this.transferenciaModel.data.itemCode = transf[0];
    this.transferenciaModel.data.lote = transf[1];
    this.transferenciaModel.data.cantidad = Number(transf[3]);

    this.agregarTsm(this.transferenciaModel.data);

  }

  async agregarTsm(dataenv: any) {

    const dataAdd: DataAditional = new DataAditional();
    dataAdd.uidd = '';
    dataAdd.data = new Data();
    dataAdd.cantidadPallets = 1;
    dataAdd.cantidadEnvasesPallet = dataenv.cantidad;
    dataAdd.data.cantidad = dataenv.cantidad;
    dataAdd.data.itemCode = dataenv.itemCode;
    dataAdd.data.lote = dataenv.lote;

    const modal = await this.modalCtrl.create({
      component: TransferenciaStockMasivoModalComponent,
      componentProps: {
        datos: dataAdd,
      }
    });
    modal.onDidDismiss().then((dtreturn) => {
      if (dtreturn.data !== undefined) {
        this.listaPallets.push(dtreturn.data);
      }
      this.reestablecerTextoQr();
    });
    await modal.present();
  }

  async modificarInformacion(pallet: any) {
    console.log(pallet);
    const modal = await this.modalCtrl.create({
      component: TransferenciaStockMasivoModalComponent,
      componentProps: {
        datos: pallet,
      }
    });
    modal.onDidDismiss().then((dtreturn) => {
      if (dtreturn.data !== undefined) {
        this.listaPallets.forEach(e => {
          if (dtreturn.data.uidd === e.uidd) {
            e = dtreturn.data;
          }
        });
        console.log(dtreturn.data);
        this.reestablecerTextoQr();
      }
    });
    await modal.present();
  }

  listaEliminarPallet(uidd) {
    console.log(this.listaPallets);
    console.log(uidd);
    const i = this.listaPallets.indexOf(uidd);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.listaPallets.splice(i, 1);
      this.presentToast('Registro eliminado.', 2000, 'medium');
    }
  }

  async alertaConfirmarTransferencia() {

    const alert = await this.alertCtrl.create({
      header: 'Transferencia de Stock',
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



  iniciartransferenciaStock() {

    this.transferenciaModel.login = localStorage.getItem('sapusr');
    // this.toolService.simpleLoader('Cargando...');
    this.listaPallets.forEach(e => {
      if (isNaN(e.sapEstado)) {
        e.loading = true;
        this.transferenciaModel.data = e.data;
        this.transferenciaModel.data.comentario = '';
        this.sapService.postTransferenciaStock(this.transferenciaModel).then((data: any) => {
          console.log(data);
          if (data.Status === 'T') {
            // this.presentToast('Transferencia realizada con exito.', 5000, 'success');
            e.status = 'success';
            e.sapEstado = data.Sap_Id;
            e.sapMensaje = data.Message;
            // this.reestablecerDatos();
          } else {
            e.status = 'danger';
            e.sapEstado = data.Sap_Id;
            e.sapMensaje = data.Sap_Message;
          }
        }, err => {
          console.error(err);
        }).finally(() => {
          // this.toolService.dismissLoader();
          e.loading = false;
          this.reestablecerTextoQr();
        });
      } else {
        // this.toolService.dismissLoader();
      }
    });

  }


  reestablecerDatos() {
    this.listaPallets = [];
    this.reestablecerTextoQr();
  }

  reestablecerTextoQr() {
    this.txtQr.value = '';
    this.txtQr.setFocus();
  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
