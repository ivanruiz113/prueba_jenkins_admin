import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: [
    ['monitoring', '/admin/v2/monitoring/remoteEntry.mjs'],
    ['authorizations', '/admin/v2/authorizations/remoteEntry.mjs'],
    ['debugger', '/admin/v2/debugger/remoteEntry.mjs'],
  ],
};

export default config;
