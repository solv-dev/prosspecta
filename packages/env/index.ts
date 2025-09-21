import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    API_PORT: z.coerce.number().default(3333),
    FRONT_URL: z.string(),
    DATABASE_URL: z.string(),
    RESEND_KEY: z.string(),
    JWT_SECRET: z.string(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_API_URL: z.string(),
  },
  runtimeEnv: {
    API_PORT: process.env.SERVER_PORT,
    FRONT_URL: process.env.FRONT_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    RESEND_KEY: process.env.RESEND_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  emptyStringAsUndefined: true,
})
