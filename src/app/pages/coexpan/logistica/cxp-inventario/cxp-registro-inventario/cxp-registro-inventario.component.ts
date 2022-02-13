import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController, AlertController, IonInput, IonButton } from '@ionic/angular';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { InventarioService } from '../../../../../../providers/internal/inventario.service';
import { CxpDatosBobinas, CxpRegistroInventarioModel } from '../../../../../../models/anymodels.model';


@Component({
  selector: 'app-cxp-registro-inventario',
  templateUrl: './cxp-registro-inventario.component.html',
  styleUrls: ['./cxp-registro-inventario.component.scss']
})

export class CxpRegistroInventarioComponent implements OnInit {

  invId$ = new BehaviorSubject<any>({});
  stsbobina: CxpDatosBobinas = new CxpDatosBobinas();
  stsbobinaa: CxpRegistroInventarioModel = new CxpRegistroInventarioModel();
  loading: boolean;
  listaRegistro: any = [];
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('txtBobina') txtBobina: IonInput;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  @ViewChild('cantidad') txtCantidad: IonInput;
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

  btnRegistrar() {
    // console.log(this.txtBobina.value?.toString());
    if (this.txtBobina.value?.toString().length <= 3 ||
        this.txtCantidad.value <= 0) {
      this.btnenviar.disabled = true;
    } else {
      this.btnenviar.disabled = false;
    }
  }

  obtenerDatos(value: any) {
    this.loading = true;
    this.inventarioServ.cxpObtenerbobina(value).then((data: any) => {
      // console.log(data);
      if (data.Objeto[0]) {
        this.stsbobina = data.Objeto[0];
        this.stsbobinaa.codBarra = data.Objeto[0].CODBARRA;
        this.stsbobinaa.padUser = this.invId$.value.invid;
        this.stsbobinaa.cantidad = data.Objeto[0].CANTIDAD;
        // this.txtCantidad.value = data.Objeto[0].CANTIDAD;
        this.btnenviar.disabled = false;
      } else {
        // console.log('no encontrado');
        this.stsbobina = new CxpDatosBobinas();
        this.stsbobina.CODSAP = 'N/A';
        this.stsbobina.DESCRIPCION = 'N/A';
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => { this.loading = false; this.apuntarCantidad(); });
  }

  enviarRegistroInventario() {
    // console.log(Number(this.txtCantidad.value.toString().replace(',','.')));

    this.loading = true;
    this.btnenviar.disabled = true;
    this.stsbobinaa.codBarra = this.txtBobina.value.toString();
    this.stsbobinaa.padUser = this.invId$.value.invid;
    this.stsbobinaa.cantidad = Number(this.txtCantidad.value.toString().replace(',','.'));
    // console.log(this.stsbobinaa);
    this.inventarioServ.cxpRegistrarInventario(this.stsbobinaa).then((data: any) => {
      if (data.Status.Status === 'T') {
        this.txtBobina.value = '';
        this.txtCantidad.value = 0;
        this.stsbobina = null;
        this.obtenerListaInventario();
      } else {
        // console.log(data);
      }
    }, (err) => {
      console.warn(err);
    }).finally(() => {
      this.loading = false; this.btnenviar.disabled = false; this.apuntarCodBarra();
    });
  }

  obtenerListaInventario() {
    if (this.invId$.value.invid) {
      const user = this.invId$.value.invid;
      const fecha = moment(new Date()).format('DD-MM-yyyy');
      this.inventarioServ.cxpObtenerListaInventario(user, fecha).then((data: any) => {
        // console.log(data);
        this.listaRegistro = data.Objeto;
      }, (err) => {
        console.warn(err);
      });
    } else {
      // console.log('sin datos');
    }
  }

  eliminarRegistro(id: number) {
    this.inventarioServ.cxpEliminarRegistroInventario(id).then((data: any) => {
      // console.log(data);
      this.obtenerListaInventario();
    }, (err) => {
      console.warn(err);
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
            // console.log('Confirm Cancel:', blah);
          },
        },
        {
          text: 'Okay',
          cssClass: 'btnAlertSuccess',
          handler: (data) => {
            // console.log(data);
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


  async confirmarEliminar(id: number, codigo: string, kilos: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar Eliminación',
      message: `Registro: <strong>${codigo}</strong> | <strong>${kilos} Kg.</strong>`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'btnAlertDanger',
          handler: (blah) => {
            // console.log('Confirm Cancel:', blah);
          },
        },
        {
          text: 'Continuar',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            this.inventarioServ.cxpEliminarRegistroInventario(id).then((data: any) => {
              // console.log(data);
              this.obtenerListaInventario();
            }, (err) => {
              console.warn(err);
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
      // console.log(idem);
    }
  }

  apuntarCodBarra() {
    setTimeout(() => {
      this.txtBobina.setFocus();
    }, 200);
  }

  apuntarCantidad() {
    setTimeout(() => {
      this.txtCantidad.setFocus();
    }, 200);
  }




}
