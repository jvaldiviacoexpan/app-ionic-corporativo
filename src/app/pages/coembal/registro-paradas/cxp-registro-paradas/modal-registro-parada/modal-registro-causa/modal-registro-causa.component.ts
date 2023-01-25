import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { ParamArea, RegistroMotivosModel } from 'src/models/anymodels.model';
import { CxpService } from '../../../../../../../providers/internal/cxp.service';
import { ParamRequest } from '../../../../../../../models/anymodels.model';


@Component({
  selector: 'app-modal-registro-causa',
  templateUrl: './modal-registro-causa.component.html',
  styleUrls: ['./modal-registro-causa.component.scss']
})
export class ModalRegistroCausaComponent implements OnInit {

  registroMotivos: any[] = [];
  motivos: any[];
  maquinas: any[];

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private toastController: ToastController,
    // private motivosService: MotivosService,
    private cxpService: CxpService,
  ) {
    // console.log(navParams.get('motivos'));
    if (navParams.get('motivos') !== undefined) {
      this.registroMotivos = navParams.get('motivos');
    }
  }


  ngOnInit(): void {
    // this.motivos = this.motivosService.getMotivos();
    this.obtenerMotivosParadas();
    this.obtenerMaquinas();
  }

  public obtenerMotivosParadas() {
    const obj: ParamRequest<ParamArea> = new  ParamRequest();
    obj.paramRequest = new ParamArea();
    obj.paramRequest.area = 1;

    this.cxpService.obtenerMotivoParadas(obj).then((data: any) => {
      console.log(data.Objeto);
      this.motivos = data.Objeto;
    }, (err: any) => {
      console.warn(err);
    });
  }

  public obtenerMaquinas() {
    const obj: ParamRequest<ParamArea> = new  ParamRequest();
    obj.paramRequest = new ParamArea();
    obj.paramRequest.area = 1;

    this.cxpService.obtenerMaquinas(obj).then((data: any) => {
      console.log(data.Objeto);
      this.maquinas = data.Objeto;
    }, (err: any) => {
      console.warn(err);
    });
  }


  agregarCausa() {
    // console.log('Se agrego un item!');
    this.registroMotivos.push(new RegistroMotivosModel({
      motivo: null,
      minutos: null,
    }));
  }

  prueba(data: any) {
    console.log(data);
    console.log(this.registroMotivos);
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

