const { gitDescribeSync } = require('git-describe');
const { version } = require('../package.json');
const { writeFileSync } = require('fs');

const gitInfo = {
  ...gitDescribeSync({
    dirtyMark: false,
    dirtySemver: false
  }),
  version
};

const data = `
/**
 * ¡IMPORTANTE!
 *
 * Este archivo es autogenerado por el script "./scripts/version-creator.script.js", no
 * modificarlo manualmente, ni pushearlo al repo.
 *
 */

export interface AppInfo {
  dirty: boolean | null;
  raw: string | null;
  hash: string | null;
  distance: any;
  tag: any;
  semver: any;
  suffix: string | null;
  semverString: string | null;
  version: string | null;
}

export const VERSION_INFO: AppInfo = ${JSON.stringify(gitInfo, null, 2)};
`;

writeFileSync('./libs/shared/src/lib/utils/version-info.ts', data, { encoding: 'utf-8' });
