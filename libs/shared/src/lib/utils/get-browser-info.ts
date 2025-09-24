import { BrowserInfo } from '../models/browser-info';
import { UAParser } from 'ua-parser-js';
import { VERSION_INFO } from './version-info';

/**
 * Funcion encargada de armar el objeto con la info
 * actual del navegador.
 */
export const getBrowserInfo = (storageService: any): BrowserInfo => {
  const platVersion = -1;
  const deviceId = storageService.get('bdid', 'local');
  const uaData = new UAParser();
  const browserName = uaData?.getBrowser()?.name;
  const browserVersion = uaData.getBrowser()?.version;
  const soName = uaData?.getOS()?.name;
  const soVersion = (soName === 'Windows' && platVersion >= 13) ?
    '11' : uaData?.getOS()?.version;
  return {
    idDispositivo: deviceId,
    TipoDispositivo: 'Web',
    sc: 1,
    Nombre: `${soName} ${soVersion} ${browserName} ${browserVersion}`,
    SistemaOperativo: soName,
    VersionSO: soVersion,
    VersionAPP: VERSION_INFO?.version || '',
  } as BrowserInfo;
}
