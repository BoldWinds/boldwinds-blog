# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is a Chinese personal website built with Astro 6, Tailwind CSS 4, and the Zaggonaut theme structure. It is a static site for technical blog posts, project showcases, publications, and an about page.

The site uses pnpm and requires Node 22.x (`package.json` declares `engines.node`).

## Common commands

- Install dependencies: `pnpm install`
- Start development server: `pnpm dev`
- Build static site: `pnpm build`
- Preview built site: `pnpm preview`
- Run Astro CLI commands: `pnpm astro <command>`
- Format files with Biome: `pnpm format`
- Lint and auto-fix with Biome: `pnpm lint`

There is currently no test script or test framework configured. Use `pnpm build` plus `pnpm lint` as the main verification commands.

## Architecture

- `astro.config.mjs` configures Astro with the Tailwind Vite plugin.
- `src/content.config.ts` defines all Astro content collections:
  - `configuration`: TOML config loaded from `content/configuration.toml`.
  - `blog`: Markdown files from `content/blogs/*.md`.
  - `project`: Markdown files from `content/projects/*.md`.
  - `publication`: Markdown files from `content/publications/*.md`.
- `content/configuration.toml` is the central editable site configuration for metadata, nav URLs, homepage hero text, owner profile links, and common labels. Because of the existing loader/schema shape, top-level config keys are nested under `[_.<section>]`.
- Route pages live in `src/pages/`:
  - `index.astro` renders the homepage and pulls the latest 3 blog/project entries for featured sections.
  - `blog/index.astro` and `projects/index.astro` render collection list pages.
  - `blog/[id].astro` and `projects/[id].astro` generate detail pages from collection slugs and render Markdown content.
  - `publications/index.astro` renders a publications list only; there are no publication detail pages.
  - `about.astro` renders fixed page content plus game sections from `src/data/aboutGames.ts`.
- Layouts in `src/layouts/` provide shared page shells and content metadata:
  - `Layout.astro` imports global CSS, renders the shared header/footer, and runs the initial theme detection script.
  - `BlogLayout.astro` and `ProjectLayout.astro` wrap Markdown detail pages and set SEO/Open Graph metadata.
- Reusable UI components live in `src/components/`. `src/components/common/Anchor.astro` and `Section.astro` are used across most pages; list items use `ArticleSnippet.astro`, `ProjectSnippet.astro`, and `PublicationSnippet.astro`.
- Styling is centralized in `src/styles/global.css`, using Tailwind 4 directives plus custom `zag-*` utility classes and dark-mode variables. Prefer palette/theme changes here rather than scattering custom CSS through components.
- Static assets are served from `public/`. Markdown/frontmatter and config paths use root-relative URLs such as `/images/profile.png`.

## Content conventions

- Blog and project slugs come from frontmatter `slug` when provided; otherwise `src/content.config.ts` derives them from the title. Existing content provides explicit slugs.
- Blog/project list ordering is by descending `timestamp`.
- Homepage featured blog/project sections currently use the latest 3 entries by timestamp, not the `featured` flag.
- Blog frontmatter supports `title`, `slug`, `description`, `longDescription`, `cardImage`, `tags`, `readTime`, `featured`, and `timestamp`.
- Project frontmatter supports `title`, `slug`, `description`, `longDescription`, `cardImage`, `tags`, `githubUrl`, `liveDemoUrl`, `timestamp`, and `featured`.
- Publication frontmatter supports `title`, `slug`, `authors`, `venue`, `status`, `year`, `paperUrl`, `codeUrl`, `abstract`, and `timestamp`.

## Formatting and tooling

- Biome is configured in `biome.json` with space indentation, double quotes for JavaScript, recommended lint rules, Tailwind CSS directive parsing, and experimental HTML support.
- TypeScript extends Astro's strict config and allows JS plus TypeScript extension imports.
- VS Code launch config starts `./node_modules/.bin/astro dev`; the Astro extension is recommended.
