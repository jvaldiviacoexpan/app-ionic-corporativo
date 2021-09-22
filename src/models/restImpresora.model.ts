/* eslint-disable @typescript-eslint/naming-convention */
export class RestImpresoraModel {
    Status: Status;
    Objeto: Objeto[];
}

export class Objeto {
    NSERIAL:        string;
    IP:             string;
    PUERTO:         number;
    IMP_NOMBRE:     string;
    AVAILABLE:      boolean;
    SECTOR:         number;
    TAG_NOMBRE:     string;
    TIPO_IMPRESORA: number;
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
