// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // postApi: 'https://jsonplaceholder.typicode.com',
  usersEndpoint: 'http://localhost:8080/users',
  authEndpoint: 'http://localhost:8080/auth',
  vacuumEndpoint: 'http://localhost:8080/vacuum',
  historyEndpoint: 'http://localhost:8080/error-history',
  readPermissions: 'Read',
  createPermissions: 'Create',
  deletePermissions: 'Delete',
  updatePermissions: 'Update',
  vacuumAddPermissions: 'AddV',
  vacuumRemovePermissions: 'RemoveV',
  vacuumStartPermissions: 'StartV',
  vacuumStopPermissions: 'StopV',
  vacuumDischargePermissions: 'DischargeV',
  vacuumSearchPermissions: 'SearchV',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
