# AuraConnect Design Lab

A sandbox for the **AuraConnect Design System Convergence** exercise. It holds the converged design documentation and a small Next.js + ShadCN app that previews the proposed tokens and components live, so the design can be checked in code without touching the AuraConnect codebase.

> **Confidential.** Prepared by VegaVision Software for the AuraConnect team. Keep this repository private.

**Status:** for review (submitted Friday 16 October 2026). Nothing here is wired into any AuraConnect client yet.
**Team:** Samu, Phila and Zipho.
**Reviewer / handover:** Cian.

---

## Why this repo exists

Last week's design exercise produced three separate sets of deliverables (one per person) instead of one shared result. This week's brief had two parts:

1. **Converge** the three submissions into one agreed set: one design system, one layout guide, one mockup set and one flow map, taking the best idea from each.
2. **Tokenize** that design system so it can be imported into AuraConnect's existing ShadCN setup, and write a design policy that another Claude session can read cold and apply correctly.

We don't have access to the AuraConnect repo, so (on Charles's suggestion) we built this lab: a fresh Next.js app configured exactly like the AuraConnect clients, with our tokens pasted into `globals.css` and preview pages for every component. It let us confirm that the tokens render as designed in Penpot, in light and dark mode, before handing over.

## What's in here
##Project Structure

auraconnect-design-lab/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page-level views
│   ├── assets/        # Images, icons, fonts
│   ├── styles/        # Global styles and design tokens
│   └── main.tsx       # Application entry point
├── index.html
├── package.json
└── README.md

### Design documentation: `docs/design/`

These files are written to land in the AuraConnect repo under `docs/design/` once approved.

| File | What it is | Read it when |
|---|---|---|
| [`design-policy.md`](docs/design/design-policy.md) | The rulebook: token usage, typography, spacing, radius, required states, component rules and a "don't" list. Written for an LLM styling AuraConnect unsupervised. | Before any styling or design task |
| [`tokens.css`](docs/design/tokens.css) | Paste-ready `oklch()` values for each client's `src/app/globals.css`, light and dark, plus the captive-portal override | Wiring the tokens in |
| [`token-export.md`](docs/design/token-export.md) | Where every token value comes from (hex, Penpot swatch, light/dark), radius, type and layout constants | Checking or changing a value |
| [`component-mapping.md`](docs/design/component-mapping.md) | Each design-system component mapped to its ShadCN primitive in `src/components/ui`, what changes, and what we saw in the lab | Implementing component changes |
| [`convergence-record.md`](docs/design/convergence-record.md) | Who owned each deliverable, what was folded in from the others, and why each decision was made | Understanding a decision |

### Design lab app

A fresh Next.js app with ShadCN set up like the AuraConnect clients (`clients/current/admin`, `captive-portal`, `monitor`):

- `components.json` with style `base-nova`, base colour `neutral`, CSS variables on
- `tokens.css` sections 1–5 pasted into `src/app/globals.css` (section 5 scoped to a `.guest` class so only the guest preview turns lime)
- Roboto and Roboto Mono loaded with `next/font/google` on the `<html>` tag
- Preview pages for the admin components, the guest portal, and colours and type

### Penpot file (exported as PDF)

The converged Penpot file is the single source of truth for the design; the three original individual files are kept unchanged as history. The exports are:

| Export | Contents |
|---|---|
| `01 Design System.pdf` | Convergence record, palette, type scale, spacing/radius, components and states |
| `02 Layout guide.pdf` | Wireframe templates B1–B5 (one per mockup page) |
| `03 Mockups.pdf` | The five pages at full fidelity, with modals and error states |
| `04 Flow map.pdf` | Admin and guest portals end to end, with branches and loop-backs |

## Running the lab

You need Node.js and npm.

```bash
git clone <repo-url> auraconect-design-lab
cd auraconect-design-lab
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and use the preview pages. Toggle your system theme to check dark mode, and use **Tab** to check keyboard focus.

## The converged system at a glance

**One shared palette** for admin and monitor. Captive-portal is the only per-client difference: it overrides five variables (`--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--ring`) for brand lime and navy.

| | Value |
|---|---|
| Primary | `#1447E6` (admin, monitor) · lime `#D6E600` with navy `#1E4F6B` (captive-portal) |
| Neutrals | Pure grey, matching ShadCN base colour `neutral` |
| Status | Error `#C10007`, success `#00753A`, warning `#A33F00`, info `#0069A8`; all pass 4.5:1 on white and on their 10% tints |
| Type | Roboto; Roboto Mono for technical values only (slugs, IPs, MACs, hosts) |
| Spacing | Tailwind's 4px scale; page margin 32px, 12 columns with a 24px gutter |
| Radius | `--radius: 0.625rem`, giving 6 / 8 / 14 / 18px (`rounded-sm`, `md`, `xl`, `2xl`) |
| Layout | Sidebar 240px (64px collapsed), top bar 64px, max content width 1280px, dialogs 512px |
| Controls | 40px in admin (`h-10`), 48px on guest pages (`h-12`) |
| States | Every interactive component supports normal, hover, focus, disabled and error |

The pages covered are the same five as last week:

| Template | Page | Route |
|---|---|---|
| B1 | Tenants list | `/admin/tenants` |
| B2 | Tenant detail | `/admin/tenants/[tenantId]` |
| B3 | Dashboard | `/admin` |
| B4 | Platform Settings | `/admin/settings` |
| B5 | Guest login | `/[ssid]/login` |

## Handover to AuraConnect (for Cian)

Wiring the tokens into the real clients is out of scope for this exercise; it is the handover step Cian runs with Claude after review. The short version:

1. Paste the values from `tokens.css` sections 1–4 into each client's `globals.css`; add section 5 in captive-portal only.
2. Apply the 12 component changes listed under "Summary of code changes" in `component-mapping.md` (button height and a `destructive-solid` variant, sidebar active fill, `line` tabs, status badges and alerts, card/dialog footers, table header, toast settings, OTP boxes).
3. Add `design-policy.md` and its companion files to `docs/design/` so future design work (by people or agents) follows the same rules.

### Open items that need repo access

| Item | Our value | Check |
|---|---|---|
| Baseline client | — | Which client's `globals.css` to compare against |
| Primary blue | `#1447E6` | `--primary` in the baseline `globals.css` (two submissions had `#1D4ED8`) |
| Brand lime | `#D6E600` | captive-portal `globals.css` (one submission had `#F4F419`) |
| Fonts | Roboto / Roboto Mono via `next/font` on `<html>` | Whether the clients load them the same way |
| Guest code length | 6 digits | OTP settings |
| Six new status variables | `--success`, `--warning`, `--info` + `-foreground` | **Approve or reject** (ShadCN has no status colours) |
| Component customisations | Checked against a fresh base-nova install | Run the "Repo check for Cian" in `component-mapping.md` |

If anything in the real code differs from our values, **the code wins** and we update Penpot to match.

## Deviations from the brief

- **§4:** we add six variables beyond ShadCN's existing vocabulary, because ShadCN has no success, warning or info colours.
- **§6.4:** the brief asks for components to be checked against the real `src/components/ui` files. Without repo access, we checked them against a fresh ShadCN base-nova install in this lab instead.

## Scope of this repo

This lab exists only to preview and verify the design. It does not modify the AuraConnect codebase, and its component tweaks are illustrations for review, not the implementation.


