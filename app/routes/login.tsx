import { Form, redirect } from 'react-router'
import { authClient } from '~/lib/auth-client'
import { getOrCreateAuth } from '~/lib/auth.server'
import type { Route } from './+types/login'

export async function action({ request, context }: Route.ActionArgs) {
  const res = await getOrCreateAuth(context.cloudflare.env).api.signInSocial({
    body: {
      provider: 'google',
    },
    request,
  })

  if (res.redirect) return redirect(res.url ?? '/')

  return res
}

export async function loader() {
  return {}
}

export default function Login() {
  const isSignedIn = authClient.useSession().data?.session !== undefined

  return (
    <div>
      <h1>login Form</h1>
      {!isSignedIn && (
        <Form method="post">
          <button type="submit">login</button>
        </Form>
      )}
      {isSignedIn && (
        <Form method="post" action="/logout">
          <button type="submit">logout</button>
        </Form>
      )}
    </div>
  )
}
