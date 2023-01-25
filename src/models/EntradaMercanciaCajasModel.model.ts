/* eslint-disable @typescript-eslint/naming-convention */
export class DataResponseModel {
    Status:   Status;
    Response: Response;
}

export class Response {
    produccionOF:        string;
    bodega:              string;
    cantidadCajas:       string;
    fecha:               string;
    lote:                string;
    cantidad:            string;
    total:               string;
    descripcionProducto: string;
    codProceso:          string;
    proceso:             string;
    cantxCaja:           string;
    color:               string;
    tipoResina:          string;
    codCosto:            string;
    familia:             string;
    peso:                string;
    codigoProducto:      string;
    cliente:             string;
    nombreMaquina:       string;
    precio:              string;
}

export class Status {
    Id:                      number;
    Message:                 string;
    Status:                  string;
    Sap_Id:                  number;
    Sap_Message:             string;
    Message_Exception:       string;
    Message_Exception_Descr: string;
}
