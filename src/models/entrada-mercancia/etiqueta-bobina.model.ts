
export class EtiquetaBobinaModel {
    login:   string;
    data:    Data;
    ipPrint: string;
    sapetiqueta: boolean;
}

export class Data {
    codBarras: string[];
    fechaScan: string;
    bodega:    number;
    idUsuario: number;
}
