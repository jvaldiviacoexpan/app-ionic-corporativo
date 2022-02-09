import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})

export class CxpService {

  constructor(
    private http: HttpClient,
  ) { }


  public obtenerInformacionOc(idCarpeta: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/get-oc`, JSON.stringify(idCarpeta))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public emisionEtiquetasMateriasPrimas(emisionEtq: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/generar-etiqueta`, JSON.stringify(emisionEtq))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerPalletCodigoBarra(codbarra: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/obtener-pl`, JSON.stringify(codbarra))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public enviarEntradaMercanciaMateriasPrimas(em: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/sap/entrada-mercancia`, JSON.stringify(em))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerImpresoras() {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlcxp}/obtener-impresoras`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public estadoImpresora(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/estado-impresora`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public enviarRegistrosParadas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxp}/ingresar-parada`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // Emision de Etiquetas Bobinas
  public postBuscarDatosBobina(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlcxpprueba}/api/etiquetas/info-bobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
