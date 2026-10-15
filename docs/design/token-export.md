# Token export (Part 2B)

AuraConnect · Design System Convergence · for review, submission Friday 16 October 2026

The paste-ready values are in `tokens.css`, next to this file. This page explains where each value comes from. Source: the converged Penpot file, boards DS 1 (colour) and DS 3 (spacing, radius), design system owner Samu, neutrals from Zipho. **Penpot and `tokens.css` use identical values**; where tokenizing forced a change, Penpot was updated to match (see "Decisions made while tokenizing").

## The palette decision

One shared system for admin, monitor and captive-portal. The only per-client difference is captive-portal, which overrides **five** variables so guest pages use brand lime for primary actions and navy for the page band: `--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground` and `--ring` (`tokens.css` section 5). Admin and monitor use the file unchanged.

## Light and dark values

| Variable | Light | Dark | Penpot swatch |
|---|---|---|---|
| `--background` | `#FAFAFA` | `#0A0A0A` | page |
| `--foreground` | `#0A0A0A` | `#FAFAFA` | neutral-950 |
| `--card`, `--popover` | `#FFFFFF` | `#171717` | surface |
| `--card-foreground`, `--popover-foreground` | `#0A0A0A` | `#FAFAFA` | neutral-950 |
| `--primary` | `#1447E6` | `#155DFC` | primary |
| `--primary-foreground` | `#FFFFFF` | `#FFFFFF` | on-primary |
| `--secondary`, `--muted`, `--accent` | `#F5F5F5` | `#262626` | neutral-100 |
| `--secondary-foreground`, `--accent-foreground` | `#171717` | `#FAFAFA` | neutral-900 |
| `--muted-foreground` | `#525252` | `#A3A3A3` | neutral-600 |
| `--destructive` | `#C10007` | `#FF6467` | error |
| `--border` | `#E5E5E5` | white 10% | neutral-200 |
| `--input` | `#D4D4D4` | white 15% | neutral-300 |
| `--ring` | `#1447E6` | `#155DFC` | primary |
| `--sidebar` | `#FFFFFF` | `#171717` | surface |
| `--sidebar-foreground` | `#404040` | `#FAFAFA` | neutral-700 |
| `--sidebar-primary` / `-foreground` | `#1447E6` / `#FFFFFF` | `#155DFC` / `#FFFFFF` | primary / on-primary |
| `--sidebar-accent` / `-foreground` | `#F5F5F5` / `#171717` | `#262626` / `#FAFAFA` | neutral-100 / neutral-900 |
| `--sidebar-border` | `#E5E5E5` | white 10% | neutral-200 |
| `--sidebar-ring` | `#1447E6` | `#155DFC` | primary |
| `--chart-1` … `--chart-5` | `#1447E6` `#51A2FF` `#00A63E` `#E17100` `#1E4F6B` | `#2B7FFF` `#8EC5FF` `#05DF72` `#FF8904` `#74B9D9` | chart-1 … chart-5 |
| `--success` * | `#00753A` | `#05DF72` | success |
| `--warning` * | `#A33F00` | `#FFB900` | warning |
| `--info` * | `#0069A8` | `#00BCFF` | info |

\* Proposed extension, see below. The `oklch()` values are in `tokens.css`, converted from the hex above.

**Captive-portal override (5 variables):** `--primary` `#D6E600`, `--primary-foreground` `#1F2600`, `--secondary` `#1E4F6B`, `--secondary-foreground` `#FFFFFF`, `--ring` `#1E4F6B`.

## Decisions made while tokenizing (Penpot updated to match)

- **One colour per status.** Each status has one token. Its tint and border are opacity steps, `bg-success/10` and `border-success/30`, and Penpot's tint and border swatches are now exactly those blends. No extra variables.
- **Darker status colours.** The first Penpot draft (`#E7000B`, `#008236`, `#BB4D00`) measured 4.0–4.4:1 as text on its own tint, under the 4.5:1 minimum. The agreed values (`#C10007`, `#00753A`, `#A33F00`, `#0069A8`) pass on white and on their tints, and work as solid fills with white text. Penpot now uses them.
- **Semantic extension.** ShadCN has no success, warning or info. We add exactly six variables (`--success`, `--warning`, `--info` and their `-foreground`), registered in `@theme inline` (`tokens.css` section 4). Everything else uses the existing vocabulary. **Needs Cian's approval.**
- **Dark mode is derived, not designed.** Nobody designed dark mode in Penpot. Neutrals follow ShadCN "neutral" dark; brand hues are lifted for contrast. Review before release.

## Radius

`--radius: 0.625rem` (10px), ShadCN's default. Penpot uses the steps ShadCN derives from it, so there is no difference between design and code:

| Step | px | Use for |
|---|---|---|
| `rounded-sm` | 6 | Checkboxes, small tags |
| `rounded-md` | 8 | Buttons, inputs, selects, nav items, alerts, toasts |
| `rounded-xl` | 14 | Cards, tables, dialogs |
| `rounded-2xl` | 18 | Guest-portal cards |
| `rounded-full` | — | Pills, badges, toggles, guest buttons |

These are the multiplier form (`--radius-sm` = 0.6 × `--radius`, and so on). If the file uses the older subtraction form, `sm`, `md` and `xl` come out the same; only `2xl` differs.

## Typography

No CSS variables needed: every level is a Tailwind size, and Penpot was set to these exact sizes.

| Penpot token | Size / line height · weight | Tailwind |
|---|---|---|
| h1 | 24/32 · 700 | `text-2xl font-bold` |
| h2 | 18/28 · 600 | `text-lg font-semibold` |
| h3 | 16/24 · 600 | `text-base font-semibold` |
| stat | 30/36 · 700 | `text-3xl font-bold` |
| body | 14/20 · 400 | `text-sm` |
| body-strong, label | 14/20 · 500 | `text-sm font-medium` |
| body-lg, guest-field | 16/24 · 400 | `text-base` |
| caption, pill, th | 12/16 · 400–500 | `text-xs` (`font-medium` for pill, th) |
| overline | 12/16 · 600 | `text-xs font-semibold uppercase tracking-wider` |
| mono | 14/20 | `font-mono text-sm` |
| mono-sm | 12/16 | `font-mono text-xs` |
| guest-title | 24/32 · 700 | `text-2xl font-bold` |

Font: Roboto (`font-sans`), Roboto Mono (`font-mono`). Check how Roboto is loaded today and add Roboto Mono the same way.

## Spacing and layout

The Penpot scale is Tailwind's default 4px scale, so no tokens are needed: `space-1` = `1` (4px), `space-2` = `2`, `space-3` = `3`, `space-4` = `4`, `space-5` = `5`, `space-6` = `6`, `space-8` = `8`, `space-10` = `10`, `space-12` = `12`.

| Layout constant | Value | Tailwind |
|---|---|---|
| Sidebar | 240px | `w-60` (or `--sidebar-width: 15rem`) |
| Sidebar collapsed | 64px | `w-16` (or `--sidebar-width-icon: 4rem`) |
| Top bar | 64px | `h-16` |
| Page margin | 32px | `p-8` |
| Grid | 12 columns, 24px gutter | `grid grid-cols-12 gap-6` |
| Content max width | 1280px | `max-w-7xl` |
| Dialog width | 512px | `sm:max-w-lg` (Dialog default) |
| Control height | 40px admin, 48px guest | `h-10`, `h-12` |

## Open items for Cian

We don't have repo access, so these values come from our Penpot work, not from the code. Each is a quick look at a `globals.css` before pasting.

| Item | Value in this export | Check | Found |
|---|---|---|---|
| Baseline client | — | Which client's `src/app/globals.css` to compare against (the three set tokens separately) | |
| Primary blue | `#1447E6` | `--primary` in the baseline `globals.css` (Phila and Zipho had `#1D4ED8`) | |
| Brand lime | `#D6E600` | captive-portal `globals.css` (Samu's brand swatch had `#F4F419`) | |
| Fonts | Roboto, Roboto Mono | How Roboto is loaded (usually `layout.tsx`); fill the two font lines in `tokens.css` section 4 | |

If a found value differs from ours, use the code's value and tell us, so we can update Penpot to match.
