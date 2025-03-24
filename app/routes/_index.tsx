import { Welcome } from '../welcome/welcome'
import type { Route } from './+types/_index'

export function meta({ params: _params }: Route.MetaArgs) {
  return [{ title: 'New React Router App' }, { name: 'description', content: 'Welcome to React Router!' }]
}

export default function Home() {
  return <Welcome />
}
