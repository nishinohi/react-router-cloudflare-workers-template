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
    secondaryStorage: {
      get: async (key) => {
        const value = await env.SESSION_KV.get(key)
        return value
      },
      set: async (key, value, ttl) => {
        if (ttl) {
          await env.SESSION_KV.put(key, value, {
            expiration: Math.floor((Date.now() + 7 * 24 * 60 * 60 * 1000) / 1000),
            expirationTtl: ttl,
          })
          return
        }
        await env.SESSION_KV.put(key, value)
      },
      delete: async (key) => {
        await env.SESSION_KV.delete(key)
      },
    },
  })
  return auth
}
