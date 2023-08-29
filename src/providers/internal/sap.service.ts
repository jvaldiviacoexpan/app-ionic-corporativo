import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

export class SapService {

  constructor(
    private http: HttpClient,
  ) { }

  public getObtenerBodegas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/sap/obtener-bodegas`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postConsultarStock(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/sap/consultar-stock`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postConsultarStockBodega(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/sap/consultar-stock-bodega`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postTransferenciaStock(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/sap/transferencia-bodega`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
