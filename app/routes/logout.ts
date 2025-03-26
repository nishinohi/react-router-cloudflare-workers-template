import { redirect } from 'react-router'
import { getOrCreateAuth } from '~/lib/auth.server'
import type { Route } from './+types/logout'

export function loader() {
  return redirect('/login')
}

export async function action({ request, context }: Route.ActionArgs) {
  try {
    const res = await getOrCreateAuth(context.cloudflare.env).api.signOut({
      headers: request.headers,
      request,
    })
    if (res.success) return redirect('/')
    throw redirect('/')
  } catch (e) {
    console.error(e)
    throw redirect('/')
  }
}
