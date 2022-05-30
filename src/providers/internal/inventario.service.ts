import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(
    private http: HttpClient
  ) { }


  //#region Coexpan Servicios
  cxpObtenerbobina(bobina: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cxp/inventario/info-bobina?id=${bobina}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpRegistrarInventario(registro: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/logistica/cxp/inventario/registro-inv`, JSON.stringify(registro))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpObtenerListaInventario(usr: string, fecha: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cxp/inventario/lista-inv?usr=${usr}&fecha=${fecha}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpEliminarRegistroInventario(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${env.urlApi}/api/v1/logistica/cxp/inventario/delete-registro?id=${id}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  //#endregion Coexpan Servicios

  //#region Coembal Servicios
  cmbObtenerinformacion(bobina: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cmb/inventario/info-etq?id=${bobina}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbRegistrarInventario(registro: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/logistica/cmb/inventario/registro-inv`, JSON.stringify(registro))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbObtenerListaInventario(usr: string, fecha: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cmb/inventario/lista-inv?usr=${usr}&fecha=${fecha}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbEliminarRegistroInventario(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${env.urlApi}/api/v1/logistica/cmb/inventario/delete-registro?id=${id}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  //#endregion Coembal Servicios

  // --

  //#regio Coexpan Servicios
  cxpCorreaObtenerbobina(bobina: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cxp/inventario-correa/info-bobina?id=${bobina}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpCorreaRegistrarInventario(registro: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/logistica/cxp/inventario-correa/registro-inv`, JSON.stringify(registro))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpCorreaObtenerListaInventario(usr: string, fecha: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cxp/inventario-correa/lista-inv?usr=${usr}&fecha=${fecha}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cxpCorreaEliminarRegistroInventario(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${env.urlApi}/api/v1/logistica/cxp/inventario-correa/delete-registro?id=${id}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  //#endregion Coexpan Servicios

  //#region Coembal Servicios
  cmbCorreaObtenerinformacion(bobina: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cmb/inventario-correa/info-etq?id=${bobina}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbCorreaRegistrarInventario(registro: any) {
    return new Promise((resolve, reject) => {
      this.http.post(`${env.urlApi}/api/v1/logistica/cmb/inventario-correa/registro-inv`, JSON.stringify(registro))
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbCorreaObtenerListaInventario(usr: string, fecha: string) {
    return new Promise((resolve, reject) => {
      this.http.get(`${env.urlApi}/api/v1/logistica/cmb/inventario-correa/lista-inv?usr=${usr}&fecha=${fecha}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  cmbCorreaEliminarRegistroInventario(id: number) {
    return new Promise((resolve, reject) => {
      this.http.delete(`${env.urlApi}/api/v1/logistica/cmb/inventario-correa/delete-registro?id=${id}`)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
  //#endregion Coembal Servicios


}
