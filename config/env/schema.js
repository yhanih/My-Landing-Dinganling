import { z } from 'zod';

const EnvSchema = z.object({
  SUPABASE_URL: z.string().url({ message: 'SUPABASE_URL must be a valid URL' }),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  BASE_URL: z.string().optional(),
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
});

const normalize = (source = {}) => ({
  SUPABASE_URL:
    source.VITE_SUPABASE_URL ||
    source.NEXT_PUBLIC_SUPABASE_URL ||
    source.SUPABASE_URL ||
    source.PUBLIC_SUPABASE_URL ||
    '',
  SUPABASE_ANON_KEY:
    source.VITE_SUPABASE_ANON_KEY ||
    source.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    source.SUPABASE_ANON_KEY ||
    '',
  SUPABASE_SERVICE_ROLE_KEY:
    source.SUPABASE_SERVICE_ROLE_KEY || source.PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
  BASE_URL: source.VITE_BASE_URL || source.NEXT_PUBLIC_BASE_URL || source.BASE_URL,
  STRIPE_PUBLIC_KEY:
    source.VITE_STRIPE_PUBLIC_KEY || source.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || source.STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY: source.STRIPE_SECRET_KEY,
});

export const resolveEnv = (rawEnv, { includeServer = false } = {}) => {
  const normalized = normalize(rawEnv);
  const parsed = EnvSchema.parse(normalized);

  if (!includeServer) {
    delete parsed.SUPABASE_SERVICE_ROLE_KEY;
    delete parsed.STRIPE_SECRET_KEY;
  }

  return parsed;
};

export default EnvSchema;
