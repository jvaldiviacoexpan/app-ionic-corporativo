export class TransferenciaStockModel {
    login: string;
    data:  Data;
}

export class Data {
    bodegaOrigen:  string;
    bodegaDestino: string;
    comentario:    string;
    itemCode:      string;
    cantidad:      number;
    lote:          string;
}

export class DataAditional {
  uidd: string;
  bodegaOrigenJson: string;
  cantidadPallets: number;
  cantidadEnvasesPallet: number;
  status: string;
  sapEstado: number;
  sapMensaje: string;
  loading: boolean;
  data: Data;
}

