// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // urlcxp:      'https://localhost:44356/api',
  // urlCxpAuth0: 'https://localhost:44360/api',
  // urlcxp:      'http://192.168.33.140:9095/logistica/ionic-materias-primas/api', Error Distancia SAP BO
  // urlBase:     'http://localhost:8100',
  production: false,
  urlBase:      'https://192.168.11.15/app-corporativo',
  urlAuth0:     'https://coexpanchile.us.auth0.com',
  urlcxp:       'http://192.168.11.15:9094/logistica/ionic-materias-primas/api',
  urlCxpAuth0:  'http://192.168.33.140:9095/main/auth0/api',
};

/*
* For easier debugging in development mode, you can import the following file
* to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
*
* This import should be commented out in production mode because it will have a negative impact
* on performance if an error is thrown.
*/

// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
