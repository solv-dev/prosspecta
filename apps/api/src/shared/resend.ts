import { env } from '@prosspecta/env'
import { Resend } from 'resend'

export const resend = new Resend(env.RESEND_KEY)
