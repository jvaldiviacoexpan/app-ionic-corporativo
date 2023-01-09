
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MaquinaModel } from 'src/models/maquina.model';
import { v4 as uuidv4 } from 'uuid';
import { MaquinasService } from '../../../../../../providers/internal/maquinas.service';
import { MotivoModel } from '../../../../../../models/motivo.model';
import { MotivosService } from '../../../../../../providers/internal/motivos.service';
import { RegistroParadaModel, ParamRequest, ParamSupervisores } from '../../../../../../models/anymodels.model';
import { CxpService } from '../../../../../../providers/internal/cxp.service';
import { CmbModalRegistroCausaComponent } from './cmb-modal-registro-causa/cmb-modal-registro-causa.component';


@Component({
  selector: 'app-modal-registro-parada',
  templateUrl: './cmb-modal-registro-parada.component.html',
  styleUrls: ['./cmb-modal-registro-parada.component.scss']
})
export class CmbModalRegistroParadaComponent implements OnInit {

  maquina: MaquinaModel;
  motivo: MotivoModel;
  maquinas: MaquinaModel[];
  motivos: MotivoModel[];
  listaSupervisores: any[];
  registro: RegistroParadaModel = new RegistroParadaModel();


  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private maquinasService: MaquinasService,
    private motivosService: MotivosService,
    private cxpService: CxpService,
  ) {
    if (navParams.get('parada') !== undefined) {
      this.registro = navParams.get('parada');
    }
  }

  get validacionDatos(): boolean {
    // console.log(this.registro);
    if (
      // this.registro.maquina     === undefined ||
      this.registro.supervisor  === undefined ||
      this.registro.fecha       === undefined ||
      this.registro.turno       === undefined ||
      this.registro.motivos?.length < 0       ||
      this.registro.observacion === undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  ngOnInit(): void {
    this.maquinas = this.maquinasService.getMaquinas();
    this.motivos = this.motivosService.getMotivos();
    // this.obtenerSupervisores();
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: CmbModalRegistroCausaComponent,
      componentProps: {
        registro: this.registro,
      }
    });
    modal.onDidDismiss().then((data) => {
      // console.log(data);
      if (data.data === undefined) {
        // console.log('Sin Datos');
      } else {
        this.registro.motivos = data.data;
        this.registro.nroMotivos = this.registro.motivos?.length;
      }
    });
    await modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  dismissData() {
    if (this.registro.uid === undefined) {
      this.registro.uid = uuidv4();
    }
    this.modalController.dismiss(this.registro);
  }

  onClick() {
    // console.log(this.registro);
  }

  // Servicios
  public obtenerSupervisores(area: number) {
    const obj: ParamRequest<ParamSupervisores> = new  ParamRequest();
    obj.paramRequest = new ParamSupervisores();
    obj.paramRequest.area = area;
    obj.paramRequest.empresa = 'CMB';

    this.cxpService.obtenerSupervisadores(obj).then((data: any) => {
      this.listaSupervisores = data.Objeto;
    }, err => {
      console.warn(err);
    });

  }



}
