/* eslint-disable @typescript-eslint/naming-convention */
export interface RestOcModel {
  B_AcctCode:    string;
  B_Currency:    string;
  B_Dscription:  string;
  B_ItemCode:    string;
  B_LineTotal:   string;
  B_OcrCode:     string;
  B_Quantity:    string;
  B_Rate:        string;
  B_UomEntry:    string;
  B_WhsCode:     string;
  H_CardCode:    string;
  H_CardName:    string;
  H_Comments:    string;
  H_DocCur:      string;
  H_DocDate:     string;
  H_DocNum:    string;
  H_DocRate:     string;
  H_DocStatus:   string;
  H_DocTotal:    string;
  H_DocTotalFC:  string;
  H_JrnlMemo:    string;
  H_NumAtCard:   string;
  H_Ref1:        string;
  H_U_AREA:      string;
  H_U_CLAUSULAS: string;
  H_U_N_CARPETA: string;
  H_U_TIPO:      string;
  B_Price:       string;
  B_TotalFrgn:   string;
  B_PesoPallet:  string;
}

export class RestPalletModel {
    CodBarra:        string;
    Reference1:      number;
    Comments:        string;
    JournalMemo:     string;
    DiscountPercent: number;
    ItemCode:        string;
    Currency:        string;
    Price:           number;
    Quantity:        number;
    WarehouseCode:   string;
    AccountCode:     string;
    LineTotal:       number;
    NumeroCarpeta:   string;
    Rate:            number;
    FechaOrden:      Date;
    CardName:        string;
    ItemDescription: string;
}



