import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MaquinaModel } from 'src/models/maquina.model';
import { MaquinasService } from '../../../../../../providers/internal/maquinas.service';
import { MotivoModel } from '../../../../../../models/motivo.model';
import { MotivosService } from '../../../../../../providers/internal/motivos.service';
import { RegistroParadaModel } from '../../../../../../models/anymodels.model';


@Component({
  selector: 'app-modal-registro-parada',
  templateUrl: './modal-registro-parada.component.html',
  styleUrls: ['./modal-registro-parada.component.scss']
})
export class ModalRegistroParadaComponent implements OnInit {

  maquina: MaquinaModel;
  motivo: MotivoModel;
  maquinas: MaquinaModel[];
  motivos: MotivoModel[];
  registro: RegistroParadaModel = new RegistroParadaModel();


  constructor(
    private modalController: ModalController,
    private maquinasService: MaquinasService,
    private motivosService: MotivosService,
  ) { }

  get validacionDatos(): boolean {
    if (
      this.registro.supervisor  === undefined ||
      this.registro.turno       === undefined ||
      this.registro.maquina     === undefined ||
      this.registro.motivo      === undefined ||
      this.registro.fecha       === undefined ||
      this.registro.horaInicio  === undefined ||
      this.registro.horaTermino === undefined ||
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
  }

  dismiss() {
    this.modalController.dismiss();
  }

  dismissData() {
    this.modalController.dismiss(this.registro);
  }

  onClick() {
    console.log(this.registro);
  }



}
