import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, IonInput, IonButton, ToastController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { CajaPalletModel, DtoImpresoraOne } from '../../../../../models/etiquetas.model';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  selector: 'app-cmb-emision-pallet-caja',
  templateUrl: './cmb-emision-pallet-caja.component.html',
  styleUrls: ['./cmb-emision-pallet-caja.component.css']
})
export class CmbEmisionPalletCajaComponent implements OnInit, AfterViewInit {

  // Componentes
  @ViewChild('txtCodigo') txtCodigo: IonInput;
  @ViewChild('cantCajas') txtCantCajas: IonInput;
  @ViewChild('btnCodigo') btnCodigo: IonButton;
  @ViewChild('btnEmision') btnEmision: IonButton;

  dtoDatos: any;
  loading = false;
  cliente = '';
  ordenFab = '';
  producto = '';

  constructor(
    private menuCtrl: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.btnEmision.disabled = true;
  }

  menuToogle(): void {
    this.menuCtrl.toggle();
  }

  obtenerInformacionCaja(cod: string): any {
    this.reestablecerDatos();
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
        this.dtoDatos = resp.Response[0];
        this.cliente = resp.Response[0].Cliente;
        this.ordenFab = resp.Response[0].Lote;
        this.producto = resp.Response[0].DescProducto;
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

  emitirPalletCajaCoembal(): void {
    const dtoEtiqueta: DtoImpresoraOne<CajaPalletModel> = new DtoImpresoraOne<CajaPalletModel>();
    dtoEtiqueta.data = new CajaPalletModel();
    dtoEtiqueta.data.descProducto = this.dtoDatos.DescProducto;
    dtoEtiqueta.data.cliente = this.dtoDatos.Cliente;
    dtoEtiqueta.data.proceso = this.dtoDatos.Proceso;
    dtoEtiqueta.data.lote = this.dtoDatos.Lote;
    dtoEtiqueta.data.color = this.dtoDatos.Color;
    dtoEtiqueta.data.codProducto = this.dtoDatos.CodProducto;
    dtoEtiqueta.data.tipoResina = this.dtoDatos.TipoResina;
    dtoEtiqueta.data.cantidadCajas = this.txtCantCajas.value.toString();
    dtoEtiqueta.ipPrint = localStorage.getItem('ipimp');
    dtoEtiqueta.login = localStorage.getItem('sapusr');
    if (!dtoEtiqueta.ipPrint) {
      this.presentToast('Seleccione una impresora antes de emitir la etiqueta.', 2000, 'warning');
      return;
    }
    if (!dtoEtiqueta.login) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }
    // console.log(dtoEtiqueta);
    this.toolService.simpleLoader('Generando etiqueta...');
    this.cxpService.postEmisionPalletCaja(dtoEtiqueta).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast('Imprimiendo etiqueta...', 2000, 'success');
        this.reestablecerDatos();
      } else {
        this.presentToast(data.Message, 5000, 'warning');
      }
    }, err => {
      console.error(err);
    }).finally(() => this.toolService.dismissLoader());
  }

  codigoSetFocus() { setTimeout(() => { this.txtCodigo.setFocus(); }, 300); }
  cantidadCajasSetFocus() { setTimeout(() => { this.txtCantCajas.setFocus(); }, 300); }

  get deshabilitarBotonEnviar(): boolean {
    if (this.dtoDatos === null) {
      return true;
    } else {
      return false;
    }
  }

  accionBusqueda(action: boolean) {
    this.txtCodigo.disabled = action;
    this.btnCodigo.disabled = action;
    this.loading = action;
    if (action) { this.txtCodigo.value = ''; }
  }

  reestablecerDatos() {
    this.dtoDatos = null;
    this.cliente = '';
    this.ordenFab = '';
    this.producto = '';
  }

  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
