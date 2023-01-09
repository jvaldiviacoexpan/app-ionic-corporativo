/* eslint-disable @typescript-eslint/naming-convention */
import { MaquinaModel } from './maquina.model';
import { MotivoModel } from './motivo.model';

export class EmisionEtiquetaMpModel {
    paramZebra: ParamZebra;
    tstUser:    TstUser;
    datos:      Datos;
}

export class Datos {
  bAcctCode:   string;
  bCurrency:   string;
  bDscription: string;
  bItemCode:   string;
  bLineTotal:  number;
  bOcrCode:    string;
  bQuantity:   number;
  bRate:       number;
  bUomEntry:   number;
  bWhsCode:    string;
  hCardCode:   string;
  hCardName:   string;
  hComments:   string;
  hDocCur:     string;
  hDocDate:    string;
  hDocNum:     number;
  hDocRate:    number;
  hDocStatus:  string;
  hDocTotal:   number;
  hDocTotalFc: number;
  hJrnlMemo:   string;
  hNumAtCard:  string;
  hRef1:       number;
  huArea:      string;
  huClausulas: string;
  hunCarpeta:  string;
  huTipo:      string;
  bPrice:      number;
  bTotalFrgn: number;
  bPesoPallet: number;
}

export class ParamZebra {
    ip: string;
}

export class TstUser {
  usuario:   string;
  cantEtq:   number;
  fecha:     string;
  numAtCard: string;
  docNum: number;
  pesoPallet: number;
}

export class RegistroParadaModel {
  uid: string;
  area: string;
  maquina: MaquinaModel;
  supervisor: string;
  fecha: string;
  turno: string;
  motivos: RegistroMotivosModel[];
  nroMotivos: number;
  observacion: string;

  // constructor(rp: RegistroParadaModel) {
  //   this.maquina = rp.maquina;
  //   this.supervisor = rp.supervisor;
  //   this.turno = rp.turno;
  //   this.motivo = rp.motivo;
  //   this.nroMotivos = rp.motivo.length;
  //   this.fecha = rp.fecha;
  //   this.horaInicio = rp.horaInicio;
  //   this.horaTermino = rp.horaTermino;
  //   this.observacion = rp.observacion;
  // }
}

export class RegistroMotivosModel {
  motivo: MotivoModel;
  minutos: number;
  constructor(mot: RegistroMotivosModel) {
    this.motivo = mot.motivo;
    this.minutos = mot.minutos;
  }
}

export class CxpRegistroInventarioModel {
  codBarra: string;
  padUser: string;
  cantidad: number;
}

export class CxpDatosBobinas {
  CANTIDAD: number;
  CODBARRA: string;
  CODSAP: string;
  DESCRIPCION: string;
}

export class CmbRegistroInventarioModel {
  codBarra: string;
  padUser: string;
  cantxCaja: number;
  cantidad: number;
}

export class CmbGetRegistro {
  ORDEN: number;
  PRODUCTO: string;
  UNIDXCAJA: number;
}

// Clases de registro de paradas

export class ParamRequest<T> {
  paramRequest: T;
}

export class ParamSupervisores {
  empresa: string;
  area: number;
}

export class ParamArea {
  area: number;
}







