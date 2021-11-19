import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, ModalController } from '@ionic/angular';
import { ModalRegistroParadaComponent } from './modal-registro-parada/modal-registro-parada.component';
import { RegistroParadaModel } from '../../../../../models/anymodels.model';
import { CxpService } from '../../../../../providers/internal/cxp.service';
import { ToolService } from '../../../../../providers/external/tools.service';


@Component({
  selector: 'app-registro-paradas',
  templateUrl: './registro.paradas.component.html',
  styleUrls: ['./registro-paradas.component.scss']
})
export class RegistroParadasComponent implements OnInit {

  registros: RegistroParadaModel[] = [];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private modalController: ModalController,
    private cxpService: CxpService,
    private toolService: ToolService,
  ) { }

  ngOnInit() { }


  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalRegistroParadaComponent,
    });
    modal.onDidDismiss().then((data) => {
      // console.log(data);
      if (data.data === undefined) {
        // console.log('Sin Datos');
      } else {
        this.registros.push(data.data);
      }
    });
    await modal.present();
  }


  async alertaInformacionParada(r: RegistroParadaModel) {

    const alert = await this.alertController.create({
      header: 'Información de Detención',
      message: `
      <strong>Supervisor</strong>: ${r.supervisor}<hr>
      <strong>Turno:</strong> ${r.turno}<hr>
      <strong>Máquina:</strong> ${r.maquina.nombre}<hr>
      <strong>Motivos:</strong> ${r.nroMotivos}<hr>
      <strong>Fecha:</strong> ${r.fecha}<hr>
      <strong>Observación:</strong> ${r.observacion}<hr>
      `,
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
          cssClass: 'btnAlertSuccess',
          handler: () => {
            // console.log('Confirm Cancel.');
          }
        }
      ]
    });
    await alert.present();
  }

  enviarRegistros() {
    if (this.registros.length <= 0) {
      this.presentToast('Debe registrar alguna Parada antes de continuar.', 3000, 'warning');
      return;
    }
    this.toolService.simpleLoader('Enviando...');
    // console.log(this.registros);
    this.cxpService.enviarRegistrosParadas(this.registros).then((data: any) => {
      // console.log(data);
      if (data.Status === 'T') {
        this.presentToast('Paradas registradas.', 3000, 'success');
        this.registros = [];
      }
    }, (err) => {
      this.presentToast('Error en registrar Paradas.', 3000, 'danger');
    }).finally(() => {
      setTimeout(() => {
        this.toolService.dismissLoader();
      }, 200);
    });
  }


  async modificarDatos(rp: RegistroParadaModel) {
    const modal = await this.modalController.create({
      component: ModalRegistroParadaComponent,
      componentProps: {
        parada: rp,
      }
    });
    modal.onDidDismiss().then((data) => {
      // console.log(data);
      if (data.data !== undefined) {
        if (this.registros.length <= 0) {
          this.registros.push(data.data);
          console.log('se agrego!');
        } else {
          // console.log(data.data.uid);
          this.registros.forEach(el => {
          if (data.data.uid === el.uid) {
            el = data.data;
          } else {
            this.registros.push(data.data);
          }
          });
        }
      }
    });
    await modal.present();
  }


  eliminarRegistro(r: RegistroParadaModel) {
    const i = this.registros.indexOf(r);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.registros.splice(i, 1);
      this.presentToast('Registro Eliminado.', 2000, 'medium');
    }
  }


  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }

}
