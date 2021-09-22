import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController, ToastController } from '@ionic/angular';
import { CxpService } from 'src/providers/internal/cxp.service';
import { RestOcModel } from '../../../../../../models/rest.model';
import { TstUser, Datos, EmisionEtiquetaMpModel, ParamZebra } from '../../../../../../models/anymodels.model';

@Component({
  selector: 'app-ent-materias-primas',
  templateUrl: './etq-ent-materias-primas.component.html',
  styleUrls: ['./etq-ent-materias-primas.component.scss'],
})
export class EtqEntMateriasPrimasComponent implements OnInit {

  ocRows: RestOcModel[] = [];
  proveedor: string;
  area: string;
  loadSkeleton: boolean;

  constructor(
    private menu: MenuController,
    private cxpService: CxpService,
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    // this.buscarNumeroCarpeta('CXMP-PRUEBA');
  }

  menuToogle() {
    this.menu.toggle();
  }


  public buscarNumeroCarpeta(ncarpeta: string) {
    this.ocRows = [];
    this.loadSkeleton = true;
    const info = {
      codigoOrden: ncarpeta.trim(),
    };

    this.cxpService.obtenerInformacionOc(info).then((data: any) => {
      // console.log(data);
      if (data.Status.Status !== 'T') {
        this.presentToast(data.Status.Message, 5000, 'primary');
      } else {
        this.ocRows = data.Objeto;
        this.proveedor = data.Objeto[0].H_CardName;
        this.area = data.Objeto[0].H_U_AREA;
        console.log(this.ocRows);
      }
    }, (err) => {
      console.log(err);
    })
    .finally(() => {
      this.loadSkeleton = false;
    });
  }



  async alertaConfirmarEtiqueta(oc: RestOcModel) {
    if (!localStorage.getItem('ipimp')) {
      this.presentToast('Seleccione una impresora antes de continuar.', 2000, 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Emisión de Etiquetas',
      message: 'Ingrese la <strong>Cantidad de Pallets</strong>.',
      inputs: [
        {
          name: 'cantEtqs',
          type: 'number',
          min: 1, max: 50,
          cssClass: '',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: 'Enviar',
          cssClass: 'btnAlertSuccess',
          handler: (data) => {
            const usr: TstUser = new TstUser();
            usr.docEntry  = Number(oc.H_DocEntry);
            usr.cantEtq   = data.cantEtqs;
            usr.numAtCard = oc.H_NumAtCard;
            usr.usuario = 'jordan.valdivia@coexpan.cl';
            usr.fecha = '.';
            this.alertaVeriricarEmisionEtiquetas(usr, oc);
            // console.log(`Cantidad: ${data.cantPallets}`);
          }
        }
      ]
    });
    await alert.present();
  }


  async alertaVeriricarEmisionEtiquetas(usr: TstUser, oc: RestOcModel) {
    const alert = await this.alertController.create({
      header: 'Confirmación Envío',
      message: `Se enviarán <strong>${usr.cantEtq} Etiquetas.</strong><hr>¿Desea Continuar?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: () => {
            console.log('Confirm Cancel.');
          }
        }, {
          text: 'Si, confirmar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.enviarEtiquetasServicio(usr, oc);
          }
        }
      ]
    });
    await alert.present();
  }


  public enviarEtiquetasServicio(us: TstUser, oc: RestOcModel) {
    const emision: EmisionEtiquetaMpModel = new EmisionEtiquetaMpModel();
    const dat: Datos = this.generarObjetoDatos(oc);
    const imp: ParamZebra = this.generarObjetoParamzebra();
    emision.datos = dat;
    emision.tstUser = us;
    emision.paramZebra = imp;

    this.cxpService.emisionEtiquetasMateriasPrimas(emision).then((data: any) => {
      console.log(data);
      if (data.Status === 'T') {
        this.presentToast(data.Message, 5000, 'success');
      } else {
        this.presentToast(data.Message, 5000, 'danger');
      }
    }, (err) => {
      console.log(err);
    });
  }


  public generarObjetoDatos(oc: RestOcModel): Datos {
    const dat: Datos = new Datos();
    dat.bAcctCode     = oc.B_AcctCode;
    dat.bCurrency     = oc.B_Currency;
    dat.bDscription   = oc.B_Dscription;
    dat.bItemCode     = oc.B_ItemCode;
    dat.bLineTotal    = Number(oc.B_LineTotal);
    dat.bOcrCode      = oc.B_OcrCode;
    dat.bQuantity     = Number(oc.B_Quantity);
    dat.bRate         = Number(oc.B_Rate);
    dat.bUomEntry     = Number(oc.B_UomEntry);
    dat.bWhsCode      = oc.B_WhsCode;
    dat.hCardCode     = oc.H_CardCode;
    dat.hCardName     = oc.H_CardName;
    dat.hComments     = oc.H_Comments;
    dat.hDocCur       = oc.H_DocCur;
    dat.hDocDate      = oc.H_DocDate;
    dat.hDocEntry     = Number(oc.H_DocEntry);
    dat.hDocRate      = Number(oc.H_DocRate);
    dat.hDocStatus    = oc.H_DocStatus;
    dat.hDocTotal     = Number(oc.H_DocTotal);
    dat.hDocTotalFc   = Number(oc.H_DocTotalFC);
    dat.hJrnlMemo     = oc.H_JrnlMemo;
    dat.hNumAtCard    = oc.H_NumAtCard;
    dat.hRef1         = Number(oc.H_Ref1);
    dat.huArea        = oc.H_U_AREA;
    dat.huClausulas   = oc.H_U_CLAUSULAS;
    dat.hunCarpeta    = oc.H_U_N_CARPETA;
    dat.huTipo        = oc.H_U_TIPO;
    dat.bPrice        = Number(oc.B_Price.replace(',','.'));
    dat.bTotalFrgn    = Number(oc.B_TotalFrgn.trim());
    dat.bPesoPallet   = Number(oc.B_PesoPallet.trim());
    return dat;
  }

  public generarObjetoParamzebra(): ParamZebra {
    const p: ParamZebra = new ParamZebra();
    p.ip = localStorage.getItem('ipimp');
    return p;
  }


  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }



}
