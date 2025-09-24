import { Injectable } from '@angular/core';
import { environment, Environment } from '@balanz-backoffice/shared';

/**
 * Servicio encargado de proveer el envionment de la aplicacion.
 */
@Injectable({ providedIn: 'root' })
export class EnvironmentService {

  get env(): Environment {
    return environment;
  }

}
