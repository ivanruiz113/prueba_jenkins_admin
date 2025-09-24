export interface AlertConfig {
  /** Milisegundos que tarda en cerrar una alerta. */
  closeDelay: number;
  /** True si se desea cerrar las alertas al clickearlas. */
  closeOnClick: boolean;
}

export interface EncrypterConfig {
  /** Texto secreto para el encrypter. */
  secret: string;
}

export interface ClientsConfig {
  /** Base url para el llamado de las api. */
  apiBasePath: string;
  /** Base url para los datos estaticos y publicos. */
  publicBasePath: string;
  /** Nombre (const) del recurso donde se hará el llamado. */
  source: string;
  /** Base url para el cmd de imagenes. */
  cmsBasePath: string;
}

export interface LoggingConfig {
  /** True si se desea loguear al backend. */
  enabled: boolean;
  /** Base url para el api de logging. */
  basePath: string;
  /** Nombre que se indicará al api de logging. */
  appName: string;
}

export interface StorageConfig {
  /** True si se desea encriptar los valores de las keys. */
  encrypt: boolean;
  /** Prefijo que se asignara a las keys del storage. */
  prefix: string;
}

export interface Environment {
  /** True si es ambiente productivo. */
  production: boolean;
  /** Configuracion de environment para el alerts-controller. */
  alertsConfig: AlertConfig;
  /** Configuracion de environment para el consumo de clients api. */
  clientsConfig: ClientsConfig;
  /** Configuracion de environment para el consumo del logging service. */
  loggingConfig: LoggingConfig;
  /** Configuracion de environment para el consumo del storage service. */
  storageConfig: StorageConfig;
  /** Configuracion de environment para el consumo del encrypter service. */
  ecnrypterConfig: EncrypterConfig;
}
