export class DtoImpresora <T> {
    login:   string;
    ipPrint: string;
    data:    T[];
}

export class DtoImpresoraOne <T> {
    login:   string;
    ipPrint: string;
    data:    T;
}

export class BobinaModel {
    itemCode:  string;
    itemName:  string;
    cardName:  string;
    pesoBruto: string;
    pesoNeto:  string;
    nroBobina: string;
    ordenFab:  string;
}

export class CajaPalletModel {
  descProducto:  string;
  cliente:       string;
  proceso: string;
  codProceso: string;
  cantxCaja: string;
  lote:          string;
  color:         string;
  codProducto:   string;
  tipoResina:    string;
  cantidadCajas: string;
}
