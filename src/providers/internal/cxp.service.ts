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
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/info-bobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEmisionPalletBobina(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/emision-pallet`, JSON.stringify(data))
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
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/info-caja-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEmisionPalletCaja(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/emision-caja-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postSapEntradaMercanciaCajaPallet(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/entrada-mercancia-cajapallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getEjecutarEtlExtrusion() {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlEntradaMercancia}/etiquetas/ejecucion-etl-extrusion`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postObtenerDatosEtiqueta(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/obtener-datos-etiqueta`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postReimprimirCajaPallet(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/etiquetas/reimprimir-caja-pallet`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public getEjecutarEtlPesaje() {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlEntradaMercancia}/extrusion-bobina/init-pesaje`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEtiquetaBobinaEm(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/etiqueta-bobina-em`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postObtenerDatosEtiquetaBobinaEm(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/get-etq-pallet-bobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postReimprimirEtiquetaBobinaEm(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/reimprimir-etiqueta-bobina-em`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postReimprimirEtiquetaBobinaSap(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(
        `${env.urlEntradaMercancia}/extrusion-bobina/api/extrusion-bobina/reimprimir-etiqueta-bobina-sap`, JSON.stringify(data)
      )
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postEliminarEtiquetaBobinaEm(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/eliminar-etiqueta-bobina-em`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postSapObtenerDatosEtiquetaBobinaEm(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/obtener-datos-palletbobina-em`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postAgregarEntradaMercanciaPalletBobinas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/sap-em-agregar-palletbobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postReimprimirEtiquetaPalletRecepcion(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/extrusion-bobina/reimprimir-etq-palletrecepcionbobina`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postObtenerInformacionMoler(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/pormoler/info-por-moler`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postObtenerInformacionMolerBobinas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/pormoler/info-por-moler-bobinas`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postTransferenciaPorMoler(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/pormoler/transferencia-por-moler`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public postTransferenciaPorMolerBobinas(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlEntradaMercancia}/pormoler/transferencia-por-moler-bobinas`, JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }


}
