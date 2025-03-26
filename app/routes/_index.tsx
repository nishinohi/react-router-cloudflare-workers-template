import { usersTable } from 'db/schema'
import { eq } from 'drizzle-orm'
import { Form } from 'react-router'
import { getOrCreateDBClient } from '~/model/d1client.server'
import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/_index'

export function meta({ params: _params }: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export const action = async (args: Route.ActionArgs) => {
  const random = Math.floor(Math.random() * 100)
  if (args.request.method === 'POST') {
    const result = await getOrCreateDBClient(args.context.cloudflare.env)
      .insert(usersTable)
      .values({
        name: `test${random}`,
        age: random,
        email: `email${random}`,
      })
      .returning()
    return { result }
  }
  if (args.request.method === 'DELETE') {
    const formData = await args.request.formData()
    const user = Object.fromEntries(formData)
    const db = getOrCreateDBClient(args.context.cloudflare.env)
    await db.delete(usersTable).where(eq(usersTable.id, parseInt(user.id as string)))
    return { id: user.id }
  }
  return {}
}

export const loader = async (args: Route.LoaderArgs) => {
  const extra = args.context.extra
  const cloudflare = args.context.cloudflare
  const isWaitUntilDefined = !!cloudflare.ctx.waitUntil
  const db = getOrCreateDBClient(cloudflare.env)
  const data = await db.select().from(usersTable)
  return { data, cloudflare, extra, isWaitUntilDefined }
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { data, cloudflare, extra, isWaitUntilDefined } = loaderData
  return (
    <div>
      <h1>React Router and Hono</h1>
      {data.map((user) => (
        <Form className="flex" key={user.id} method="delete">
          <label>{user.name}</label>
          <input name="id" type="number" defaultValue={user.id} hidden />
          <button className="rounded-sm bg-red-400 p-1 font-bold text-white" type="submit">
            delete
          </button>
        </Form>
      ))}
      <Form method="post">
        <button className="rounded-sm bg-white p-1 font-bold text-slate-800" type="submit">
          add user
        </button>
      </Form>
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
