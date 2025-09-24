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

export const VERSION_INFO: AppInfo = {
  dirty: false,
  distance: '',
  hash: '',
  raw: '',
  semver: '',
  semverString: '',
  suffix: '',
  tag: '',
  version: '',
};
