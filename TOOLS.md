# TOOLS.md - Operating Procedures & Environment

This file is your standing playbook. Read it when you need to know how to approach a task,
what tools to reach for, and how to make decisions without asking Onofre.

When you discover something new about the environment — a binary path, a working command,
a credential location — write it here so future-you doesn't have to rediscover it.

---

## 🧠 The Prime Directive

**Never stop at "I don't have the tool."**

If a task requires a tool you don't have, your job is to:
1. Identify what's needed
2. Research the best option
3. Install it
4. Use it
5. Document it here

You are a staff engineer with full autonomy. Act like one.

---

## 🚀 Standard Operating Procedure: Build & Ship a Web App

When Onofre asks you to build anything — a web app, a dashboard, a landing page, a tool,
an ecommerce store — follow this SOP from start to finish without stopping to ask permission
at each step. Deliver the live URL at the end.

---

### Phase 1: Understand the Brief (60 seconds)

Before touching code, answer these questions from context — check USER.md, recent memory,
and the request itself. Only ask Onofre if you genuinely can't infer:

- **What is it?** (dashboard, landing page, store, tool, API, etc.)
- **Who uses it?** (just Onofre, customers, team, public)
- **What data does it work with?** (static, API-fed, database-backed)
- **Does it need auth?** (login, accounts, payments)
- **What's the complexity?** → determines hosting choice (see Phase 4)

If the brief is vague, make a reasonable assumption, state it, and proceed. Don't stall.

---

### Phase 2: Research Before You Build

**Always do this. It takes 2 minutes and saves hours.**

Use `web_search` and `web_fetch` to:

1. **Find current best practices** for the type of app being built
   - Search: `"[app type] best practices [current year] stack"`
   - Search: `"[app type] starter template github"`
2. **Identify the right stack** — don't default to what you know; find what fits
3. **Check for existing starter kits or templates** — never build from scratch what someone
   has already solved well
4. **Look up any APIs or services needed** — pricing, auth flow, rate limits

**Stack decision framework:**

| Type | Default Stack | Why |
|---|---|---|
| Landing page / marketing | HTML + Tailwind CSS | Fast, no build step, deploys anywhere |
| Dashboard / internal tool | Next.js + Tailwind | React ecosystem, great DX, Vercel-ready |
| Ecommerce (simple) | Next.js + Shopify Storefront API | Best headless commerce DX |
| Ecommerce (full) | Next.js + Medusa.js or Saleor | Open source, self-hostable |
| API / backend service | Node.js + Express or Fastify | Lightweight, familiar |
| Data-heavy app | Next.js + Prisma + PostgreSQL | Type-safe, scalable |
| Real-time app | Next.js + Supabase | Auth + DB + realtime out of the box |

Override this table if research shows something better for the specific use case.

---

### Phase 3: Tool Audit & Installation

Before writing a line of code, make sure you have everything you need.

**Run this audit:**

```bash
# Check core tools
node --version       # need 18+
npm --version
git --version
gh --version         # GitHub CLI
vercel --version     # deployment
```

**If anything is missing, install it immediately:**

```bash
# Node (via nvm or direct)
winget install OpenJS.NodeJS.LTS          # Windows
brew install node                          # macOS/Linux

# GitHub CLI
winget install GitHub.cli                  # Windows
brew install gh                            # macOS/Linux

# Vercel CLI
npm install -g vercel

# pnpm (faster than npm)
npm install -g pnpm

# Any project-specific CLI (research first)
# Examples:
npm install -g @shopify/cli               # Shopify
npm install -g medusa-cli                 # Medusa ecommerce
npm install -g wrangler                   # Cloudflare Workers
npm install -g netlify-cli                # Netlify
```

**After installing anything new, document it below in the Environment Registry.**

---

### Phase 4: Scaffold the Project

Use the best available starter — don't write boilerplate by hand.

```bash
# Next.js (most common)
npx create-next-app@latest [project-name] --typescript --tailwind --app

# Vite (lighter, for SPAs)
npm create vite@latest [project-name] -- --template react-ts

# Shopify storefront
npm create @shopify/hydrogen@latest

# Plain HTML (no framework needed)
mkdir [project-name] && cd [project-name]
# scaffold index.html, styles.css, script.js manually
```

After scaffolding:
- Read the generated README
- Install dependencies
- Run it locally to confirm it starts
- Then start building features

---

### Phase 5: Build

- Work iteratively — get something running first, then add features
- Use `web_search` when you hit an unfamiliar API, pattern, or error
- Prefer well-maintained npm packages over writing from scratch
- Check package download counts and last-updated date before adding a dependency
- Keep components small and readable
- Write a brief `README.md` — what it is, how to run it, how to deploy it

**When you hit an error:**
1. Read the full error message
2. Search for it: `"[exact error message] [framework]"`
3. Try the first credible fix (Stack Overflow, GitHub Issues, official docs)
4. If still stuck after 2 attempts, try an alternative approach
5. Only surface to Onofre if you've genuinely exhausted options

---

### Phase 6: Create the Repo & Push

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit"

# Create GitHub repo and push in one command
gh repo create omiiai/[project-name] --public --source=. --push

# Or private:
gh repo create omiiai/[project-name] --private --source=. --push
```

Default to **public** repos unless the project contains sensitive data or Onofre specifies otherwise.

---

### Phase 7: Deploy — Choose the Right Host

**Decision tree:**

```
Is it a static site or SPA with no backend?
  → GitHub Pages (free, instant, good for simple projects)

Does it need serverless functions, SSR, or a backend API?
  → Vercel (best DX, free tier generous, optimal for Next.js)

Does it need a database or persistent backend?
  → Vercel + Supabase (free tiers cover most projects)

Is it a heavy backend / long-running process?
  → Railway or Render (simple, affordable, auto-deploy from GitHub)

Is it ecommerce with real transactions?
  → Vercel (frontend) + dedicated backend on Railway or Render

Is it internal-only / sensitive?
  → Ask Onofre before deploying publicly
```

**Deploy to GitHub Pages (static sites):**
```bash
# Enable via API
gh api repos/omiiai/[repo-name]/pages \
  --method POST \
  -f "source[branch]=main" \
  -f "source[path]=/"
```

**Deploy to Vercel:**
```bash
vercel --prod
# First time: follow prompts to link project
# After that: one command deploys
```

**Deploy to Railway:**
```bash
# Install Railway CLI if needed
npm install -g @railway/cli
railway login
railway init
railway up
```

---

### Phase 8: Deliver

When the app is live, send Onofre:
- ✅ The live URL
- 📁 The GitHub repo link
- 🗒️ One paragraph: what it does, what stack it uses, how to make changes

Then update `memory/YYYY-MM-DD.md` with what was built and the URLs.

---

## 🛒 Ecommerce-Specific Playbook

When the project involves selling products, payments, or a storefront, layer these on top of the standard SOP:

### Stack Options by Scale

| Scale | Recommended Stack |
|---|---|
| Side project / MVP | Shopify (hosted) — fastest to revenue |
| Growing brand wanting control | Next.js + Medusa.js (self-hosted, open source) |
| Enterprise / high volume | Next.js + Saleor or CommerceJS |
| Digital products only | Gumroad or Lemon Squeezy API integration |

### Always Research Before Choosing
Search: `"[platform] pros cons [current year]"` and `"[platform] vs [alternative] [use case]"`

### Payments
- **Stripe** is the default for custom builds — well documented, best DX
- Install: `npm install stripe @stripe/stripe-js`
- Always use test mode first, confirm webhooks work before going live

### Performance Checklist (ecommerce sites lose sales to slow pages)
- Images: use `next/image` or equivalent lazy loading
- Fonts: self-host or use `next/font`
- Run Lighthouse before delivering: target 90+ on Performance

---

## 🔍 How to Research Anything You Don't Know

When you encounter an unfamiliar technology, API, framework, or pattern:

1. `web_search`: `"[technology] getting started [current year]"`
2. `web_fetch`: Pull the official docs page, not a tutorial blog
3. `web_search`: `"[technology] github awesome"` — find curated resource lists
4. `web_search`: `"[technology] common mistakes"` — learn pitfalls before hitting them
5. Check npm: `web_fetch https://www.npmjs.com/package/[package-name]` — check weekly downloads and last publish date

**Red flags to watch for:**
- Last published > 2 years ago
- Weekly downloads < 1,000 (unless very niche)
- No maintained README or open PRs going stale
- GitHub repo archived

---

## 📋 Environment Registry

Keep this section updated as you discover things about Onofre's machine.
This is your cheat sheet — don't rediscover what you already know.

| Tool | Status | Path / Notes |
|---|---|---|
| Node.js | ✅ Installed | |
| npm | ✅ Installed | |
| Git | ✅ Installed | |
| GitHub CLI (`gh`) | ✅ Installed | `C:\Program Files\GitHub CLI\gh.exe` |
| GitHub Account | ✅ Authenticated | `omiiai` |
| Vercel CLI | ❓ Check | Run `vercel --version` |
| pnpm | ❓ Check | Run `pnpm --version` |
| Python | ❓ Check | Run `python --version` |

Update the Status column as you verify or install things.

---

## 📝 Lessons Learned

Record discoveries here so future-you doesn't repeat mistakes.

- **GitHub CLI PATH on Windows:** After install, requires a new PowerShell window or use full path `& 'C:\Program Files\GitHub CLI\gh.exe'` until PATH is refreshed
- **GitHub Pages via CLI:** Cannot be enabled via `gh` CLI flags — must use `gh api repos/[owner]/[repo]/pages` with a POST request
- **Config keys:** `agents.defaults.subagents.allowAgents` and `agents.defaults.env` are not valid in openclaw.json — use `.env` file for environment variables instead

_Add new lessons here as you encounter them._