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

### feature/auth

Version that implemented [better-auth](https://www.better-auth.com/), D1, and authentication with Google OAuth.

```sh
# local
# If the DB is not initialized.
mkdir migrations && npm run db:migrate-local
# Push schema to db.
npm run db:drizzle-push-local
# create secret
# Regarding the configuration of Google OAuth, please refer to the better-auth documentation.
# https://www.better-auth.com/docs/authentication/google
echo -e "CLIENT_SECRET=''\nCLIENT_ID=''\nSESSION_SECRET='$(openssl rand -base64 32)'" >> .dev.vars
npm run dev

# remote
# Since drizzle-kit push will fail, need to genarate migration file and migrate it.
# See below issue.
# https://github.com/drizzle-team/drizzle-orm/issues/3728
npm run db:generate
npm run db:drizzle-migrate-prod
# Set secret to your workers setting
npm run deploy
```
