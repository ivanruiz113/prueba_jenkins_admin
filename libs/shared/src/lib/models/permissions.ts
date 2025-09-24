export interface PermissionMenu {
  id: string;
  texto: string;
  path: string;
  opciones: Record<string, any>;
  accesible: boolean;
}

export interface UserPermission {
  id: string;
  texto: string;
  path: string;
  opciones: Record<string, any>;
  menu: PermissionMenu[];
  accesible: boolean;
}

export type UserPermissions = UserPermission[];
