import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/_index'

export function meta({ params: _params }: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export const loader = (args: Route.LoaderArgs) => {
  const extra = args.context.extra
  const cloudflare = args.context.cloudflare
  const isWaitUntilDefined = !!cloudflare.ctx.waitUntil
  return { cloudflare, extra, isWaitUntilDefined }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { cloudflare, extra, isWaitUntilDefined } = loaderData
  return (
    <div>
      <h1>React Router and Hono</h1>
      <h2>Var is {cloudflare.env.MY_VAR}</h2>
      <h3>
        {cloudflare.cf ? 'cf,' : ''}
        {cloudflare.ctx ? 'ctx,' : ''}
        {cloudflare.caches ? 'caches are available' : ''}
      </h3>
      <h4>Extra is {extra}</h4>
      <h6>waitUntil is {isWaitUntilDefined ? 'defined' : 'not defined'}</h6>
      <Welcome />
    </div>
  )
}
