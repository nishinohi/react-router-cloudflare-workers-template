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
