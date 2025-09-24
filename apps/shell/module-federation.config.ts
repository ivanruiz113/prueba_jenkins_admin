import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['monitoring', 'authorizations', 'debugger'],
};

export default config;
