// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase:      'https://movil.coexpan.cl/app-corporativo',

  // API LOCAL
  // urlBase:  'http://localhost:8100',
  // urlAuth0: 'https://localhost:44360/api',
  // urlMateriasPrimas:   'https://localhost:44356/api',
  // urlInventario: 'https://localhost:44362/api',

  // API DESARROLLO
  urlBase: 'https://movil.coexpan.cl/desa-app-corporativo',
  urlAuth0: 'https://test.coexpan.cl/api/v1/integracion/auth0',
  urlMateriasPrimas: 'https://test.coexpan.cl/api/v1/bodega/materias-primas',
  urlInventario: 'https://test.coexpan.cl/api/v1/logistica/inventario',
  // urlcxpprueba: 'https://localhost:44303',

  // API PRODUCCION
  // urlBase: 'https://movil.coexpan.cl/app-corporativo',
  // urlAuth0: 'https://coexpancl.us.auth0.com', NO SIRVE AHORA
  // urlMateriasPrimas: 'https://api.coexpan.cl/api/v1/bodega/materias-primas',
  //urlInventario: 'https://localhost:44333/api',
  urlApi: 'https://api.coexpan.cl',

  // constantes
  dbCoembal: 'SBO_COEMBAL_FUSION_TEST',
  // dbCoembal: 'SBO_COEMBAL_FUSION',

  dismissTimer: 250,

};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
