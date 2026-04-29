---
name: import-markdown-blog
description: Use when adding a plain Markdown article to this Astro personal website blog, especially when the article lacks frontmatter or needs publishing workflow with preview, user approval, commit, and push.
---

# Import Markdown Blog

## Overview

Import one pure Markdown article into `content/blogs/` without changing the author's content. The workflow is: preserve text, add valid frontmatter, render for user review, then commit and push only after explicit approval of the rendered page.

## Non-Negotiables

- Do not rewrite, polish, translate, summarize, delete, or add article body content.
- Formatting changes are limited to Markdown rendering compatibility: frontmatter block, blank lines, code fence language labels when obvious, heading spacing, and root-relative asset paths.
- If a title is vague or missing, ask instead of inventing a better title.
- User approval of a text summary is not enough. Approval must come after the user can review the rendered page.
- Commit and push only after explicit user confirmation.
- Stage only the new blog file and directly related assets.

## Repository Targets

- Blog posts live in `content/blogs/*.md`.
- Required schema is defined in `src/content.config.ts`.
- Frontmatter fields to generate:
  - `title`
  - `slug`
  - `description`
  - `longDescription`
  - `tags`
  - `readTime`
  - `featured: false`
  - `timestamp`

## Workflow

1. Get the source Markdown path or pasted content.
2. Inspect existing posts for frontmatter style and slug conventions.
3. Derive metadata conservatively:
   - `title`: existing first H1 or user-provided title.
   - `slug`: lowercase URL-safe form of title, or ask if ambiguous.
   - `description`: first meaningful paragraph, shortened without rewriting meaning.
   - `longDescription`: same as description unless the article already provides a longer summary.
   - `tags`: infer from explicit article terms; ask if uncertain.
   - `readTime`: estimate from body length.
   - `timestamp`: today's date unless user specifies another date.
4. Write `content/blogs/<slug>.md` with generated frontmatter followed by the original body.
5. Preserve body content. Only apply allowed Markdown compatibility formatting.
6. Run `pnpm build` and `pnpm lint`.
7. Start `pnpm dev` and give the user the rendered URL `/blog/<slug>` to review.
8. Wait for explicit confirmation that the rendered page is acceptable.
9. Check git status and diff. Stage only the blog file and directly related assets.
10. Commit with a focused message, then push to the tracked remote.

## Quick Reference

| Situation | Action |
|---|---|
| Missing title | Ask user or use first H1 if present |
| Awkward wording | Preserve exactly |
| Missing blank lines | Add blank lines only for Markdown rendering |
| Vague tags | Ask or use an empty/minimal tag list |
| User says summary looks fine | Still show rendered page before commit |
| Unrelated modified/untracked files exist | Do not stage them |
| Build/lint fails | Fix only import-related issues or report blocker |

## Commit and Push Gate

Before committing, confirm all are true:

- `pnpm build` completed successfully.
- `pnpm lint` completed successfully or only changed formatting in intended files.
- Dev server rendered `/blog/<slug>` and the user reviewed it.
- User explicitly approved the rendered page.
- `git diff --staged` contains only intended blog/import files.

If any item is false, do not commit or push.

## Common Mistakes

| Mistake | Correct behavior |
|---|---|
| Improving article prose while importing | Preserve body content exactly |
| Treating summary approval as publish approval | Require rendered page review |
| Auto-generating a catchy title | Use existing title or ask |
| Committing before preview | Preview first, wait for approval |
| Using `git add .` with unrelated files present | Stage specific files only |
| Pushing because commit succeeded | Push only after the user requested/approved push |
