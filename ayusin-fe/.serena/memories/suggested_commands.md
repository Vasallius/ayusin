# Suggested Development Commands

## Package Management
- `pnpm install` - Install dependencies
- `pnpm update` - Update dependencies

## Development
- `pnpm run dev` - Start development server
- `pnpm run dev -- --open` - Start dev server and open in browser
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build

## Code Quality
- `pnpm run format` - Format code with Prettier
- `pnpm run lint` - Check linting and formatting
- `pnpm run check` - Type check with svelte-check
- `pnpm run check:watch` - Type check in watch mode

## Testing
- `pnpm run test:unit` - Run unit tests in watch mode
- `pnpm run test` - Run all tests once

## Database Operations
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:generate` - Generate migrations
- `pnpm run db:migrate` - Run migrations
- `pnpm run db:studio` - Open Drizzle Studio

## SvelteKit Specific
- `pnpm run prepare` - Sync SvelteKit types (runs automatically)

## System Commands (macOS/Darwin)
- `ls` - List directory contents
- `find` - Search for files
- `grep` / `rg` - Search file contents (ripgrep preferred)
- `git` - Version control operations