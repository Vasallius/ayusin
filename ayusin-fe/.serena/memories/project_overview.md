# Project Overview: ayusin-fe

## Purpose
This is a SvelteKit-based frontend application called "ayusin-fe". Currently appears to be a starter project with basic SvelteKit structure and database integration using Drizzle ORM.

## Tech Stack
- **Frontend Framework**: SvelteKit 2.22.0 with Svelte 5.0.0
- **Build Tool**: Vite 7.0.4
- **Language**: TypeScript 5.0.0
- **CSS Framework**: TailwindCSS 4.0.0
- **Database**: PostgreSQL with Drizzle ORM 0.40.0
- **Testing**: Vitest 3.2.3 with Playwright for browser testing
- **Package Manager**: pnpm (preferred)
- **Deployment**: Configured for Fly.io with Docker

## Key Dependencies
- `@sveltejs/adapter-node` for Node.js deployment
- `drizzle-orm` and `drizzle-kit` for database management
- `postgres` driver for PostgreSQL connection
- `@tailwindcss/vite` for TailwindCSS integration
- `vitest` and `@vitest/browser` for testing
- `playwright` for browser testing

## Environment Requirements
- Node.js 22.19.0
- pnpm 9.15.0
- PostgreSQL database (DATABASE_URL environment variable required)