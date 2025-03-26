# React Router v7 + Eslint v9 + Tailwind Css v4 + Cloudflare Workers

## Development

Run the dev server:

```sh
npm run dev
```

To run cloudflare workers in local:

```sh
npm start
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

A Cloudflare account is required for deployment.

```sh
npm run deploy
```

## Branches

### feature/lefthook

Add git hooks for linter and formatter.

```sh
npx lefthook install
```

### feature/vscode

Add `settings.json`, `launch.json` and `extensions.json` for VSCode development.

### feature/d1

Version that added Cloudflare D1.

```sh
# local develolp
# init local D1
npm run db:migrate-local
# create .env for local
echo "D1_LOCAL_URL='./.wrangler/state/v3/d1/miniflare-D1DatabaseObject/[your_local].sqlite'" >> .env.local
# migration by drizzle
npx drizzle-kit push --config drizzle-local.config.ts
npm run dev

# production
# init D1
npm run db:create
# generate migration file
npm run db:generate
# migration by wrangler
npm run db:migrate-prod
npm run deploy
```
