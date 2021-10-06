import { Time } from '@angular/common';
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
  hDocEntry:   number;
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
  docEntry:  number;
}

export class RegistroParadaModel {
  supervisor: string;
  turno: string;
  maquina: MaquinaModel;
  motivo: MotivoModel;
  fecha: Date;
  horaInicio: Date;
  horaTermino: Date;
  observacion: string;
}


