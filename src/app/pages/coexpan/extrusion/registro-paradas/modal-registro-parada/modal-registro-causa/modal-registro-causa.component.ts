import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { RegistroMotivosModel } from 'src/models/anymodels.model';
import { MotivoModel } from '../../../../../../../models/motivo.model';
import { MotivosService } from '../../../../../../../providers/internal/motivos.service';


@Component({
  selector: 'app-modal-registro-causa',
  templateUrl: './modal-registro-causa.component.html',
  styleUrls: ['./modal-registro-causa.component.scss']
})
export class ModalRegistroCausaComponent implements OnInit {

  registroMotivos: RegistroMotivosModel[] = [];
  motivos: MotivoModel[];

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private toastController: ToastController,
    private motivosService: MotivosService,
  ) {
    // console.log(navParams.get('motivos'));
    if (navParams.get('motivos') !== undefined) {
      this.registroMotivos = navParams.get('motivos');
    }
  }


  ngOnInit(): void {
    this.motivos = this.motivosService.getMotivos();
  }


  agregarCausa() {
    // console.log('Se agrego un item!');
    this.registroMotivos.push(new RegistroMotivosModel({
      motivo: null,
      minutos: null,
    }));
  }


  eliminarRegistro(r: RegistroMotivosModel) {
    const i = this.registroMotivos.indexOf(r);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (i !== -1) {
      this.registroMotivos.splice(i, 1);
      // this.presentToast('Registro Eliminado.', 2000, 'medium');
    }
  }


  async presentToast(mensaje: string, duracion: number, tcolor: string) {
    const toast = await this.toastController.create({
      message: mensaje, duration: duracion, color: tcolor
    });
    await toast.present();
  }


  dismissData() {
    this.modalController.dismiss(this.registroMotivos);
  }


  dismiss() {
    this.modalController.dismiss();
  }

}

