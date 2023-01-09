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
      this.http.post(`${env.urlMateriasPrimas}/get-oc`, JSON.stringify(idCarpeta))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public emisionEtiquetasMateriasPrimas(emisionEtq: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/generar-etiqueta`, JSON.stringify(emisionEtq))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerPalletCodigoBarra(codbarra: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/obtener-pl`, JSON.stringify(codbarra))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public enviarEntradaMercanciaMateriasPrimas(em: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/sap/entrada-mercancia`, JSON.stringify(em))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerImpresoras() {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlMateriasPrimas}/obtener-impresoras`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  public estadoImpresora(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/estado-impresora`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


  // Modulo de registro de paradas
  public enviarRegistrosParadas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/ingresar-parada`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerSupervisadores(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/obtener-supervisores`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerMotivoParadas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/obtener-motivoparadas`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public obtenerMaquinas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlMateriasPrimas}/obtener-maquinas`, JSON.stringify(data))
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
      this.http.post(`${env.urlApi}/api/v1/wscxp-extrusion/etiquetas/info-bobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEmisionPalletBobina(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/wscxp-extrusion/etiquetas/emision-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  // Emision de Etiqueta Caja Pallet Coembal
  public postBuscarDatosCaja(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/wscxp-extrusion/etiquetas/info-caja-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEmisionPalletCaja(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/wscxp-extrusion/etiquetas/emision-caja-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
