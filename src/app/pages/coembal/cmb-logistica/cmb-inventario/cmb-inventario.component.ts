import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';
import { InventarioService } from '../../../../../providers/internal/inventario.service';
import { AlertController, MenuController, IonInput, IonButton } from '@ionic/angular';
import { CmbRegistroInventarioModel, CmbGetRegistro } from '../../../../../models/anymodels.model';



@Component({
  selector: 'app-cmb-inventario',
  templateUrl: './cmb-inventario.component.html',
  styleUrls: ['./cmb-inventario.component.scss']
})
export class CmbInventarioComponent implements OnInit {

  invId$ = new BehaviorSubject<any>({});
  // stsbobina: CxpDatosBobinas = new CxpDatosBobinas();
  // stsbobinaa: CxpRegistroInventarioModel = new CxpRegistroInventarioModel();
  stsInventario: CmbGetRegistro = new CmbGetRegistro();
  stsInventarioo: CmbRegistroInventarioModel = new CmbRegistroInventarioModel();
  loading: boolean;
  listaRegistro: any = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('txtcodbarra') txtCodabarra: IonInput;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('cantidad') txtCantidad: IonInput;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('unixcaja') txtUnixcaja: IonInput;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('btnenviar') btnenviar: IonButton;

  constructor(
    private menu: MenuController,
    private alertCtrl: AlertController,
    private inventarioServ: InventarioService,
  ) { }

  menuToogle() {
    this.menu.toggle();
  }

  ngOnInit(): void {
    this.asignarIdentificador();
    this.invId$.next({ invid: localStorage.getItem('inv-id') });
    this.obtenerListaInventario();
  }

  obtenerDatos(value: any) {
    this.loading = true;
    this.inventarioServ.cmbObtenerinformacion(value).then((data: any) => {
      console.log(data);
      if (data.Objeto[0]) {
        this.stsInventario = data.Objeto[0];
        this.txtUnixcaja.value = data.Objeto[0].UNIDXCAJA;
        this.btnenviar.disabled = false;
      } else {
        console.log('no encontrado');
        this.stsInventario = new CmbGetRegistro();
        this.stsInventario.ORDEN = 0;
        this.stsInventario.PRODUCTO = 'N/A';
      }
    }, (err) => {
      console.log(err);
    }).finally(() => { this.loading = false; this.apuntarCantidad(); });
  }

  btnRegistrar() {
    // console.log(this.txtBobina.value?.toString());
    if (this.txtCodabarra.value?.toString().length <= 3 ||
        this.txtCantidad.value <= 0 || this.txtUnixcaja.value <= 0) {
      this.btnenviar.disabled = true;
    } else {
      this.btnenviar.disabled = false;
    }
  }

  enviarRegistroInventario() {
    // console.log(Number(this.txtCantidad.value.toString().replace(',','.')));
    this.loading = true;
    this.btnenviar.disabled = true;
    this.stsInventarioo.codBarra = this.txtCodabarra.value.toString();
    this.stsInventarioo.cantxCaja = Number(this.txtUnixcaja.value);
    this.stsInventarioo.cantidad = Number(this.txtCantidad.value);
    this.stsInventarioo.padUser = localStorage.getItem('inv-id');
    this.inventarioServ.cmbRegistrarInventario(this.stsInventarioo).then((data: any) => {
      if (data.Status.Status === 'T') {
        this.txtCodabarra.value = '';
        this.txtCantidad.value = 0;
        this.txtUnixcaja.value = 0;
        this.stsInventario = null;
        this.obtenerListaInventario();
      } else {
        console.log(data);
      }
    }, (err) => {
      console.log(err);
    }).finally(() => {
      this.loading = false; this.btnenviar.disabled = false; this.apuntarCodBarra();
    });
  }

  obtenerListaInventario() {
    if (this.invId$.value.invid) {
      const user = this.invId$.value.invid;
      const fecha = moment(new Date()).format('DD-MM-yyyy');
      this.inventarioServ.cmbObtenerListaInventario(user, fecha).then((data: any) => {
        console.log(data);
        this.listaRegistro = data.Objeto;
      }, (err) => {
        console.log(err);
      });
    } else {
      console.log('sin datos');
    }
  }

  eliminarRegistro(id: number) {
    this.inventarioServ.cmbEliminarRegistroInventario(id).then((data: any) => {
      console.log(data);
      this.obtenerListaInventario();
    }, (err) => {
      console.log(err);
    });
  }

  async registroDevice() {
    const alert = await this.alertCtrl.create({
      header: 'Nombre Dipositivo',
      message: 'Ingrese <strong>Identificador</strong> para el inventario.',
      inputs: [
        {
          name: 'identificador',
          type: 'text',
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: (blah) => {
            console.log('Confirm Cancel:', blah);
          },
        },
        {
          text: 'Okay',
          cssClass: 'btnAlertSuccess',
          handler: (data) => {
            console.log(data);
            localStorage.setItem('inv-id', data.identificador);
            this.invId$.next({ invid: localStorage.getItem('inv-id') });
            this.asignarIdentificador();
            this.obtenerListaInventario();
          },
        },
      ],
    });
    return alert.present();
  }


  async confirmarEliminar(id: number, codigo: string, cantidad: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `Orden: <strong>${codigo}</strong> | <strong>${cantidad} Kg.</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: (blah) => {
            console.log('Confirm Cancel:', blah);
          },
        },
        {
          text: 'Continuar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.inventarioServ.cmbEliminarRegistroInventario(id).then((data: any) => {
              console.log(data);
              this.obtenerListaInventario();
            }, (err) => {
              console.log(err);
            });
          }
        },
      ],
    });
    return alert.present();
  }

  asignarIdentificador() {
    const idem = localStorage.getItem('inv-id');
    if (idem === null || idem === '') {
      this.registroDevice();
      console.log(idem);
    }
  }

  apuntarCodBarra() {
    setTimeout(() => {
      this.txtCodabarra.setFocus();
    }, 200);
  }

  apuntarCantidad() {
    setTimeout(() => {
      this.txtCantidad.setFocus();
    }, 200);
  }

}

