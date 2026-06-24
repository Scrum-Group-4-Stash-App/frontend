# STASH Web Application

STASH is a web-based platform for saving and organising resources, attaching notes and reminders, searching across saved content, and sharing collections with others.

## Tech Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Axios
- Lucide React

## Getting Started

### Prerequisites

- Node.js 18 or later recommended
- npm

### Setup

1. Clone the repository.

   ```sh
   git clone <repository-url>
   cd stash-app
   ```

2. Install dependencies.

   ```sh
   npm install
   ```

3. Run the development server.

   ```sh
   npm run dev
   ```

   The app will be available at `http://localhost:5173` by default.

4. Set up local environment values.

   A starter `.env.example` file is included in the repository. Copy it to `.env` and add any environment variables your app needs. Use `.env.example` to list the variable names only, without sensitive values. Any secrets, API keys, tokens, or other sensitive values should be stored in your local environment variables and never committed to the repository.

   ```sh
   cp .env.example .env
   ```

## Available Scripts

- `npm run dev`
  - Starts the Vite development server.

- `npm run build`
  - Runs the TypeScript build and creates a production bundle.

- `npm run lint`
  - Runs `oxlint`, a fast linter that checks for common code issues and style problems.

- `npm run preview`
  - Serves the production build locally for previewing.

- `npm run prepare`
  - Sets up Husky Git hooks.

- `npm run test`
  - Runs TypeScript type checking with `tsc --noEmit`.

## Commit Hooks

This repository uses Husky, so commit checks run automatically.

## Commit Format

Commit messages must follow the Conventional Commits style.

- Allowed types include `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, and `revert`
- Keep the subject in lower-case
- Keep the subject within 100 characters

Example:

```sh
feat: add authentication form
```

## Project Notes

- The project uses TypeScript for type safety.
- Code quality checks are enforced with linting and type checking.
- Husky is configured for repository hooks.
- The `@` import alias points to the `src/` directory, so imports like `@/components/Button` resolve from `src/components/Button`.
- The repository includes `.env.example` as a template for required environment variable names only, with no sensitive values.
