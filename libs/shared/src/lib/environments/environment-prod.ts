import { Environment } from '../models/environment';

/**
 * Configuracion de environment para trabajar de
 * manera local.
 */
export const environment: Environment = {
  production: true,
  alertsConfig: {
    closeDelay: 4000,
    closeOnClick: true,
  },
  clientsConfig: {
    apiBasePath: 'https://devusers.balanz.com/admin/api/v1',
    publicBasePath: 'https://devusers.balanz.com',
    source: 'Admin',
    cmsBasePath: 'https://cms.balanz.com/PFS'
  },
  loggingConfig: {
    appName: 'balanz-admin-v2',
    basePath: 'https://devba.balanz.com/api/v1/analytics/data-events',
    enabled: false,
  },
  storageConfig: {
    encrypt: true,
    prefix: 'adm2'
  },
  ecnrypterConfig: {
    secret: 'BALANZSECRET'
  }
};
