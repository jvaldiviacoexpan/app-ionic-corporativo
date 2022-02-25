import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MenuController, IonInput, ToastController, IonButton, LoadingController } from '@ionic/angular';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { DtoImpresora, BobinaModel } from '../../../../../models/etiquetas.model';
import { ToolService } from '../../../../../providers/external/tools.service';

@Component({
  selector: 'app-cxp-emision-pallet',
  templateUrl: './cxp-emision-pallet.component.html',
  styleUrls: ['./cxp-emision-pallet.component.css']
})
export class CxpEmisionPalletComponent implements OnInit, AfterViewInit {

  // Componentes
  @ViewChild('codBobina') txtCodigoBobina: IonInput;
  @ViewChild('btnCodBobina') btnCodigoBobina: IonButton;
  @ViewChild('btnEviarPallet') btnEmitirPallet: IonButton;

  // inicializadores
  registroBobinas = [];
  loading = false;
  cliente = '';
  ordenFab = '';
  producto = '';


  constructor(
    private menu: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private toolServise: ToolService,
  ) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.codigoBarraSetFocus();
    this.btnEmitirPallet.disabled = true;
  }

  get deshabilitarBotonEnviar(): boolean {
    if (this.registroBobinas.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  menuToogle() {
    this.menu.toggle();
  }

  codigoBarraSetFocus() { setTimeout(() => {
    this.txtCodigoBobina.setFocus();
  }, 300); }

  accionBusqueda(action: boolean) {
    this.txtCodigoBobina.disabled = action;
    this.btnCodigoBobina.disabled = action;
    this.loading = action;
    if (action) { this.txtCodigoBobina.value = ''; }
  }

  buscarBobina(codBobina: string) {
    const data = { login: '', data: '' };
    if (codBobina.length <= 0) {
      this.presentToast('Escanee un codigo de barra.', 2000, 'warning');
      this.codigoBarraSetFocus();
      return;
    }
    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie sesión en Sap Business One para Continuar.', 5000, 'warning');
      return;
    }

    data.login = localStorage.getItem('sapusr');
    data.data = codBobina.trim();

    this.accionBusqueda(true);
    this.cxpService.postBuscarDatosBobina(data).then((resp: any) => {
      if (resp.Status.Status === 'T') {
        // this.registroBobinas.push();
        this.agregarBobinaPallet(resp.Response[0]);
      } else {
        this.presentToast(resp.Status.Message, 2000, 'warning');
      }
      // console.log(resp);
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.accionBusqueda(false);
      this.codigoBarraSetFocus();
    });
  }

  agregarBobinaPallet(bobina: any) {
    const i = this.registroBobinas.map(e => `${e.OrdenFab}${e.NroBobina}`).indexOf(`${bobina.OrdenFab}${bobina.NroBobina}`);
    if (this.registroBobinas.length === 0) {
      this.cliente = bobina.CardName === '' ? 'Cliente no registrado.' : bobina.CardName;
      this.ordenFab = bobina.OrdenFab;
      this.producto = bobina.ItemName;
    }
    if (i === -1) {
      if (bobina.OrdenFab === this.ordenFab) {
        this.registroBobinas.push(bobina);
      } else {
        this.presentToast(`Bobina no corresponde a la OF ${this.ordenFab}.`, 2000, 'warning');
      }
    } else {
      this.presentToast('La bobina ya se encuentra en la lista.', 2000, 'warning');
    }
  }

  removerBobina(bobina: any) {
    const i = this.registroBobinas.map(e => `${e.OrdenFab}${e.NroBobina}`).indexOf(`${bobina.OrdenFab}${bobina.NroBobina}`);
    if (i !== -1) { this.registroBobinas.splice(i, 1); }
  }

  emitirEtiquetaMultiple() {
    const dtoEtiqueta: DtoImpresora<BobinaModel> = new DtoImpresora<BobinaModel>();
    dtoEtiqueta.data = this.registroBobinas;
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
    console.log(dtoEtiqueta);
    this.toolServise.simpleLoader('Generando etiqueta...');
    this.cxpService.postEmisionPalletBobina(dtoEtiqueta).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast('Imprimiendo etiqueta...', 2000, 'success');
        this.registroBobinas = [];
      } else {
        this.presentToast(data.Message, 5000, 'warning');
      }
      console.log(data);

    }, err => {
      console.error(err);
    }).finally(() => this.toolServise.dismissLoader());

    // console.log(this.registroBobinas);
  }


  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
