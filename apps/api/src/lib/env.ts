import { z } from 'zod'

const envSchema = z.object({
  API_PORT: z.coerce.number().default(3333),
  WEB_URL: z.string(),
  DATABASE_URL: z.string(),
  RESEND_KEY: z.string(),
  JWT_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)
