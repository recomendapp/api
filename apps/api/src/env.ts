import { apiSchema, validateEnv } from '@api/env';

export const env = validateEnv(apiSchema);
