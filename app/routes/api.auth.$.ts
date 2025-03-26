import { getOrCreateAuth } from '~/lib/auth.server'
import type { Route } from './+types/api.auth.$'

export async function loader({ request, context }: Route.LoaderArgs) {
  return getOrCreateAuth(context.cloudflare.env).handler(request)
}

export async function action({ request, context }: Route.ActionArgs) {
  return getOrCreateAuth(context.cloudflare.env).handler(request)
}
