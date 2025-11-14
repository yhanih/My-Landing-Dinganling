import { resolveEnv } from './schema.js';

export const getServerEnv = () => {
  return resolveEnv(process.env, { includeServer: true });
};

export default getServerEnv;
