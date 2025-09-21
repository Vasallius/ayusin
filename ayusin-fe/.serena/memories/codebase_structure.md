# Codebase Structure

## Root Directory
- `package.json` - Project dependencies and scripts
- `pnpm-lock.yaml` - Lockfile for reproducible installs
- `svelte.config.js` - SvelteKit configuration
- `vite.config.ts` - Vite build configuration with testing setup
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc` - Prettier code formatting rules
- `drizzle.config.ts` - Drizzle ORM configuration
- `Dockerfile` - Production deployment configuration
- `fly.toml` - Fly.io deployment settings

## Source Structure (`src/`)
```
src/
├── app.html              # HTML template
├── app.css               # Global styles
├── app.d.ts              # TypeScript declarations
├── demo.spec.ts          # Demo test file
├── lib/
│   ├── index.ts          # Library exports
│   ├── assets/           # Static assets (favicon, etc.)
│   └── server/           # Server-side code
│       └── db/           # Database layer
│           ├── index.ts  # Database connection
│           └── schema.ts # Database schema definitions
└── routes/               # SvelteKit file-based routing
    ├── +layout.svelte    # Root layout component
    ├── +page.svelte      # Home page component
    └── page.svelte.spec.ts # Page component tests
```

## Key Patterns
- **File-based Routing**: Routes defined by file structure in `src/routes/`
- **Library Alias**: `$lib` points to `src/lib/` for clean imports
- **Server Code**: Isolated in `src/lib/server/` (not bundled for client)
- **Database Layer**: Centralized in `src/lib/server/db/`
- **Component Tests**: Co-located with `.svelte.spec.ts` naming
- **Server Tests**: `.spec.ts` files for Node.js environment testing

## Special SvelteKit Files
- `+page.svelte` - Page components
- `+layout.svelte` - Layout components
- `+page.server.ts` - Server-side page logic (when needed)
- `+layout.server.ts` - Server-side layout logic (when needed)

## Testing Structure
- **Client Tests**: `*.svelte.{test,spec}.{js,ts}` - Run in browser with Playwright
- **Server Tests**: `*.{test,spec}.{js,ts}` - Run in Node.js environment
- **Test Setup**: `vitest-setup-client.ts` for browser test configuration