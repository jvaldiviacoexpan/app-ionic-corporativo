// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // urlBase:      'https://movil.coexpan.cl/app-corporativo',

  // API DEV
  urlBase:        'http://localhost:8100',
  urlAuth0: 'https://localhost:44360/api',
  // urlcxp:      'https://localhost:44356/api',
  // https://localhost:44333/api/v1/logistica/inventario/
  // urlcxpprueba: 'https://localhost:44303',

  // API
  // urlBase:      'https://movil.coexpan.cl/app-corporativo',
  // urlAuth0:     'https://coexpancl.us.auth0.com',
  urlcxp:       'https://api.coexpan.cl/api/v1/bodega/materias-primas',
  urlApi: 'https://api.coexpan.cl',

  // constantes
  dbCoexpan: '01TEST_COEMBAL',
  dbCoembal: '01TEST_COEMBAL',
  // dbCoexpan: 'Z_SBO_COEXPAN_TEST2',
  // dbCoembal: 'Z_SBO_COEMBAL_TEST2',

};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
