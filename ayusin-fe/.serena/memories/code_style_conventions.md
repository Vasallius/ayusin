# Code Style and Conventions

## Prettier Configuration
- **Indentation**: Tabs (useTabs: true)
- **Quotes**: Single quotes (singleQuote: true)
- **Trailing Commas**: None (trailingComma: "none")
- **Print Width**: 100 characters
- **Plugins**: prettier-plugin-svelte, prettier-plugin-tailwindcss

## TypeScript Configuration
- **Strict Mode**: Enabled
- **Module Resolution**: bundler
- **allowJs/checkJs**: Both enabled
- **Source Maps**: Enabled
- **ESM Interop**: Enabled

## ESLint Configuration
- Based on recommended configs for JS, TypeScript, and Svelte
- Prettier integration to avoid conflicts
- `no-undef` rule disabled for TypeScript projects (as recommended by typescript-eslint)
- Supports both browser and Node.js globals

## File Structure Conventions
- **Source Code**: `src/` directory
- **Routes**: `src/routes/` (SvelteKit file-based routing)
- **Lib Code**: `src/lib/` (aliased as `$lib`)
- **Server Code**: `src/lib/server/`
- **Database**: `src/lib/server/db/`
- **Assets**: `src/lib/assets/`

## Naming Conventions
- Files: kebab-case for components and pages
- Svelte files: +page.svelte, +layout.svelte for special SvelteKit files
- Database schemas: camelCase for table definitions