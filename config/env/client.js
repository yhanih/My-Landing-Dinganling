import { resolveEnv } from './schema.js';

export const getClientEnv = () => {
  const source = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : process.env;
  return resolveEnv(source, { includeServer: false });
};

export default getClientEnv;
