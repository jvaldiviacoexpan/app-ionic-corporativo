import { Injectable } from '@angular/core';
import { MaquinaModel } from 'src/models/maquina.model';

@Injectable({
  providedIn: 'root',
})
export class MaquinasService {

  private maquinas: MaquinaModel[] = [
    new MaquinaModel({ id: 1, nombre: 'ETIQ.11', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 2, nombre: 'ETIQ.12', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 3, nombre: 'ETIQ.13', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 4, nombre: 'ETIQ.18', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 5, nombre: 'ETIQ.N1', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 6, nombre: 'ETIQ.N2', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 7, nombre: 'ETIQ.N3', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 8, nombre: 'ETIQ.N4', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 9, nombre: 'ETIQ.N4', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 10, nombre: 'ETIQ.N5', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 11, nombre: 'ETIQ.N6', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 12, nombre: 'ETIQ.N7', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 13, nombre: 'ETIQ.N8', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 14, nombre: 'PERFORADORA', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 15, nombre: 'ROBOT-1', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 16, nombre: 'SIROPACK', familia: 'Etiquetado' }),
    new MaquinaModel({ id: 17, nombre: 'ETIQ.10', familia: 'Etiquetado Bod 2260' }),
    new MaquinaModel({ id: 18, nombre: 'MOBAPACK', familia: 'Etiquetado Bod 2260' }),
    new MaquinaModel({ id: 19, nombre: 'S.O.S.', familia: 'Etiquetado Bod 2260' }),
    new MaquinaModel({ id: 20, nombre: 'SERVITAL MANUAL', familia: 'Etiquetado Bod 2260' }),
    new MaquinaModel({ id: 21, nombre: 'TALLER CMB', familia: 'Etiquetado Bod 2260' }),
    new MaquinaModel({ id: 22, nombre: 'DM-44', familia: 'Impresión' }),
    new MaquinaModel({ id: 23, nombre: 'POLITYPE', familia: 'Impresión' }),
    new MaquinaModel({ id: 24, nombre: 'VD-560(1)', familia: 'Impresión' }),
    new MaquinaModel({ id: 25, nombre: 'VD560L-3', familia: 'Impresión' }),
    new MaquinaModel({ id: 26, nombre: 'VDCM-608', familia: 'Impresión' }),
    new MaquinaModel({ id: 27, nombre: 'PERFORADORA', familia: 'Perforado' }),
    new MaquinaModel({ id: 28, nombre: 'REB N1', familia: 'Rebordeado' }),
    new MaquinaModel({ id: 29, nombre: '45-2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 30, nombre: '45-3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 31, nombre: '50K-1', familia: 'Termoformado' }),
    new MaquinaModel({ id: 32, nombre: '50K-2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 33, nombre: '54K-1', familia: 'Termoformado' }),
    new MaquinaModel({ id: 34, nombre: '54KC', familia: 'Termoformado' }),
    new MaquinaModel({ id: 35, nombre: '70K-2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 36, nombre: '70k-3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 37, nombre: 'KIEFEL-1', familia: 'Termoformado' }),
    new MaquinaModel({ id: 38, nombre: 'KIEFEL-2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 39, nombre: 'KIEFEL-3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 41, nombre: 'KIEFEL-4', familia: 'Termoformado' }),
    new MaquinaModel({ id: 42, nombre: 'KIEFEL-5', familia: 'Termoformado' }),
    new MaquinaModel({ id: 43, nombre: 'KTR4-2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 44, nombre: 'KTR4-3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 45, nombre: 'KTR4-4', familia: 'Termoformado' }),
    new MaquinaModel({ id: 46, nombre: 'KTR4-5PP', familia: 'Termoformado' }),
    new MaquinaModel({ id: 47, nombre: 'RDM/1', familia: 'Termoformado' }),
    new MaquinaModel({ id: 48, nombre: 'RDM/2', familia: 'Termoformado' }),
    new MaquinaModel({ id: 49, nombre: 'RDM/3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 50, nombre: 'RDM/6', familia: 'Termoformado' }),
    new MaquinaModel({ id: 51, nombre: 'RDM/63', familia: 'Termoformado' }),
    new MaquinaModel({ id: 52, nombre: 'RDM58-3', familia: 'Termoformado' }),
    new MaquinaModel({ id: 53, nombre: 'SWING 6005', familia: 'Termoformado' }),
    new MaquinaModel({ id: 54, nombre: 'SWING 6053', familia: 'Termoformado' }),
    new MaquinaModel({ id: 55, nombre: 'SWING 6054', familia: 'Termoformado' }),
    new MaquinaModel({ id: 56, nombre: 'TR-4', familia: 'Termoformado' })
  ];


  public getMaquinas(): MaquinaModel[] {
    return this.maquinas;
  }


}
