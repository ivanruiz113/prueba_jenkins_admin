import { UserPermissions } from './permissions';

/** Datos del usuario loggeado. */
export interface User {
  idAplicacion: number;
  idProductor: string;
  idPersona: string;
  Nombre: string;
  idSesion: string;
  AccessToken: string;
  Avatar: string;
  email: string;
  TipoDocumento: string;
  Documento: string;
  TelefonoFijo: string;
  TelefonoMovil: string;
  tieneC4D: string;
  CaraRegistrada: string;
  CUIL: string;
  UltimoLogin: string;
  user: string;
  Asesor: any;
  Permisos: UserPermissions;
  Parametros: any;
  cuentas: any;
}
