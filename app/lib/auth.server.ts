import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getOrCreateDBClient } from '~/model/d1client.server'

type Auth = ReturnType<typeof betterAuth>

let auth: Auth

export const getOrCreateAuth = (env: Env): Auth => {
  if (auth) return auth
  auth = betterAuth({
    secret: env.SESSION_SECRET,
    baseURL: env.BASE_URL,
    database: drizzleAdapter(getOrCreateDBClient(env), {
      provider: 'sqlite',
    }),
    socialProviders: {
      google: {
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
      },
    },
  })
  return auth
}
