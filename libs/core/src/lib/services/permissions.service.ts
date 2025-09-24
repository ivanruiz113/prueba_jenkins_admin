import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { UserPermissions, UserPermission, PermissionMenu } from '@balanz-backoffice/shared';

@Injectable({ providedIn: 'root' })
export class PermissionsService {

  private _userService = inject(UserService);

  /**
   * Funcion encargada de validar si se posee permisos en base a los parametros
   * pasados. En caso de tener permiso, retornara true.
   * NOTAS:
   * 1. Solo valida los permisos del usuario, que se encuentren dentro
   * de Permisos > Transaccional.
   * 2. Si se requiere obtener el valor "accesible" del permiso, no enviar
   * parametros "permissionMenuId" y "option".
   * 3. Si se requiere obtener el valor "accesible" del menu, no enviar
   * parametro "option".
   *
   * @param permissionId identificador del permiso.
   * @param permissionMenuId (opcional) identificador del menu del permiso.
   * @param option (opcional) nombre de la propiedad, que se encuentra dentro de la propiedad
   * "opciones"; si "permissionMenuId" esta seteado, se busca dentro de las opciones
   * del menu, sino se busca dentro de las opciones del permiso.
   */
  checkPermissions(permissionId: string, permissionMenuId?: string, option?: string): boolean {
    const permissions: UserPermissions = this._userService.permissions();
    if (!permissions.length) {
      return false;
    }
    const permission: UserPermission | undefined = permissions.find((p: UserPermission) => p.id === permissionId);
    if (!permission) {
      return false;
    }
    if (!permissionMenuId) {
      return option ? permission.opciones?.[option] === 1 : permission.accesible;
    }
    const menu = permission.menu.find((menuOption: PermissionMenu) => menuOption.id === permissionMenuId);
    return option ? (menu?.opciones[option] === 1) : menu?.accesible || false;
  }

}
