/* eslint-disable @typescript-eslint/naming-convention */

export class EntradaMercancia {
    login: Login;
    doc:   Doc;
}

export class Doc {
    oign_DocDate:     Date;
    oign_DocDueDate:  Date;
    oign_Reference1:  string;
    oign_Reference2:  string;
    oign_Comments:    string;
    oign_JournalMemo: string;
    ign1_EMDetalle:   Ign1EMDetalle[];
}

export class Ign1EMDetalle {
    ign1_ShipDate:        Date;
    ign1_DiscountPercent: number;
    ign1_ItemCode:        string;
    ign1_Price:           number;
    ign1_Quantity:        number;
    ign1_Currency:        string;
    ign1_WarehouseCode:   string;
    ign1_AccountCode:     string;
    ign1_LineTotal:       number;
    btnt_BatchNumber:     string;
    btnt_Quantity:        number;
    btnt_AddmisionDate:   Date;
}

export class Login {
    psws: string;
    resu: string;
    npmc: string;
}

export class EmMateriaPrimaModel {
    login: string;
    doc:   Doc;
}


