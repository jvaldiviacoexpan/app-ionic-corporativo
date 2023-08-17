// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // API LOCAL
  // urlBase: 'http://localhost:8100',
  // urlAuth0: 'https://localhost:44360/api',
  // urlMateriasPrimas: 'https://localhost:44356/api',
  // urlInventario: 'https://localhost:44362/api',
  // urlEntradaMercancia: 'https://localhost:44303/api',

  // API DESARROLLO
  urlBase: 'https://test.coexpan.cl/app-corporativo',
  urlAuth0: 'https://test.coexpan.cl/api/v1/integracion/auth0',
  urlMateriasPrimas: 'https://test.coexpan.cl/api/v1/bodega/materias-primas',
  urlInventario: 'https://test.coexpan.cl/api/v1/logistica/inventario',
  urlEntradaMercancia: 'https://test.coexpan.cl/api/v1/extrusion/api-entrada-mercancia',

  // API PRODUCCION
  // urlBase: 'https://movil.coexpan.cl/app-corporativo',
  // urlAuth0: 'https://api.coexpan.cl/api/v1/integracion/auth0',
  // urlMateriasPrimas: 'https://api.coexpan.cl/api/v1/bodega/materias-primas',
  // urlInventario: 'https://api.coexpan.cl/api/v1/logistica/inventario',
  // urlEntradaMercancia: 'https://api.coexpan.cl/api/v1/extrusion/api-entrada-mercancia',

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
