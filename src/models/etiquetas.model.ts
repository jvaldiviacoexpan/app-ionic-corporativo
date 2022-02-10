export class DtoImpresora <T> {
    login:   string;
    ipPrint: string;
    data:    T[];
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
