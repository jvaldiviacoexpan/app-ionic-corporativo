import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, MenuController, ToastController } from '@ionic/angular';
import { CxpService } from '../../../../../../providers/internal/cxp.service';
import { RestPalletModel } from '../../../../../../models/rest.model';
import { Doc, EmMateriaPrimaModel, Ign1EMDetalle } from '../../../../../../models/sapbo.model';
import { ToolService } from '../../../../../../providers/external/tools.service';


@Component({
  selector: 'app-em-materias-primas',
  templateUrl: './em-materias-primas.component.html',
  styleUrls: ['./ent-materias-primas.component.scss']
})

export class EmMateriasPrimasComponent implements OnInit {

  @ViewChild('codbar') codBarra: IonInput;

  loadCodbar = false;
  arrayPallet: RestPalletModel[] = [];

  constructor(
    private menu: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private toolService: ToolService,
  ) { }

  ngOnInit(): void {

  }

  get getCantidadPallet(): number {
    return this.arrayPallet.length;
  }

  menuToogle() {
    this.menu.toggle();
  }

  obtenerPallet(cod: string) {
    // arrayPallet
    this.codBarra.disabled = true;
    this.loadCodbar = true;
    this.cxpService.obtenerPalletCodigoBarra(cod).then((data: any) => {
      console.log(data);
      if (data.Status.Status === 'T') {
        if (data.Objeto[0]) {
          if (this.arrayPallet.find(m => m.CodBarra === data.Objeto[0].CodBarra)) {
            this.presentToast('El Pallet ya se encuentra en la lista.', 4000, 'warning');
          }
          else if (this.arrayPallet.length > 0) {
            if (this.arrayPallet[0].NumeroCarpeta !== data.Objeto[0].NumeroCarpeta) {
              this.presentToast('El Pallet corresponde a una orden diferente.', 4000, 'warning');
            }
            this.arrayPallet.push(data.Objeto[0]);
          }
          else {
            this.arrayPallet.push(data.Objeto[0]);
          }
        } else {
          this.presentToast('Pallet no encontrado.', 4000, 'warning');
        }
      } else {
        this.presentToast(data.Status.Message, 4000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.codBarra.disabled = false;
      this.loadCodbar = false;
      this.codBarra.value = '';
      setTimeout(() => {
        this.codBarra.setFocus();
      }, 10);
    });
  }

  listaEliminarPallet(codbarra: any) {
    const i = this.arrayPallet.indexOf( codbarra );
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.arrayPallet.splice(i, 1);
      this.presentToast('Pallet Quitado.', 2000, 'medium');
    }
  }

  enviarEntradaMercancia() {
    const em = new EmMateriaPrimaModel();
    em.doc = new Doc();
    em.doc.ign1_EMDetalle = [];
    if (this.arrayPallet.length === 0) {
      this.presentToast('Escanea algún Pallet antes de Continuar.', 2000, 'warning');
      return;
    }
    if (!localStorage.getItem('sapusr')) {
      this.presentToast('Inicie Sesión en Sap Business One para continuar.', 2000, 'warning');
      return;
    }
    this.toolService.simpleLoader('Enviando...');
    em.login = localStorage.getItem('sapusr');
    em.doc.oign_Reference1 = this.arrayPallet[0].Reference1.toString();
    em.doc.oign_Comments = 'Handheld Entrada de Mercancia - Materias Primas';
    em.doc.oign_JournalMemo = `Carpeta ${this.arrayPallet[0].NumeroCarpeta}`;
    let ign1 = new Ign1EMDetalle();
    this.arrayPallet.forEach(p => {
      ign1.ign1_DiscountPercent   = 0;
      ign1.ign1_ItemCode          = p.ItemCode;
      ign1.ign1_Price             = p.Price;
      ign1.ign1_Quantity          = p.Quantity;
      ign1.ign1_Currency          = p.Currency;
      ign1.ign1_WarehouseCode     = p.WarehouseCode;
      ign1.ign1_AccountCode       = p.AccountCode;
      ign1.ign1_LineTotal         = p.LineTotal;
      ign1.btnt_BatchNumber       = p.CodBarra;
      em.doc.ign1_EMDetalle.push(ign1);
      ign1 = new Ign1EMDetalle();
    });

    this.cxpService.enviarEntradaMercanciaMateriasPrimas(em).then((data: any) => {
      if (data.Status === 'T') {
        this.presentToast(data.Message, 3000, 'success');
        this.arrayPallet = [];
        // console.log(data);
      } else {
        this.presentToast(data.Message, 3000, 'warning');
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => this.toolService.dismissLoader());

  }


  async presentToast(mensaje: string, duracion: number, colr: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: colr, translucent: true
  });
    toast.present();
  }



}
