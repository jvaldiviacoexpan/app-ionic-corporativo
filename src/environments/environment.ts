// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // urlBase:     'http://localhost:8100',
  // urlcxp:      'https://localhost:44356/api',
  // urlCxpAuth0: 'https://localhost:44360/api',
  // https://localhost:44333/api/v1/logistica/inventario/
  production: false,
  urlBase:      'https://movil.coexpan.cl/app-corporativo',
  urlcxp:       'https://api.coexpan.cl/api/v1/bodega/materias-primas',
  urlAuth0:     'https://coexpanchile.us.auth0.com',
  urlCxpAuth0:  'https://api.coexpan.cl/api/v1/auth0',
  urlApi:       'https://api.coexpan.cl',
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
