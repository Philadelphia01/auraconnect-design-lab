# Convergence record

AuraConnect · Design System Convergence · Samu, Phila, Zipho · for review, submission Friday 16 October 2026

Why the converged design looks the way it does. Same content as board "00 · Convergence record" in the converged Penpot file. The three original Penpot files are kept unchanged as history.

## Who owns what

One owner per deliverable and page. Ideas from the others were taken where they were better, and are credited.

|Deliverable / page|Owner|Why this one|Folded in from the others|
|-|-|-|-|
|Design system|Samu|Already built as Penpot tokens with a usage note per token, focus states, mono and guest sets. Closest to the ShadCN export.|Zipho: pure-grey neutrals matching ShadCN "neutral", status badge set. Phila: plain-language usage rule per component.|
|Layout guide|Phila|The only true wireframe set: grid overlay, spacing callouts, numbered notes, template index.|—|
|Mockup: Tenants list|Zipho|Filter cards, sort, card/table toggle, realistic data.|Samu: slugs in mono.|
|Mockup: Tenant detail|Zipho|Matches the live page; edit modal with its error state.|Zipho: Radius clients section (on the real page). Samu: delete confirmation.|
|Mockup: Dashboard|Phila|Trend chips, sparklines, week-over-week chart, ranked top sites.|Samu: tenant summary table.|
|Mockup: Platform Settings|Samu|Cleanest form layout; error toast plus field-level errors.|Phila: per-section status in the nav, as "Set" / "Not set" labels.|
|Mockup: Guest login|Phila|Six screens: terms, login, send failure, code, wrong code, online.|—|
|Flow map|Phila , Samu , Zipho|Both portals end to end, legend, every box tagged with its mockup.|Samu: delete branch, OTP attempt limit, resend loop.|

## Decisions, by deliverable

**Design system**

* One shared palette for admin and monitor. Captive-portal is the only per-client difference: it overrides five variables (`--primary`, `--primary-foreground`, `--secondary`, `--secondary-foreground`, `--ring`) for brand lime and navy.
* Neutrals are pure grey (ShadCN "neutral"), not the blue-tinted greys two of us used, so the export lands on the existing base colour.
* Where two of three agreed, that won: H2 18/28, label 14/20/500, top bar 64, page margin 32, sidebar 240, 12 columns with 24 gutter, Roboto (Roboto Mono for technical values).
* Every interactive component has normal, hover, focus, disabled and error states.
* Status is never colour alone: pills, nav errors and Settings section status all pair colour with an icon and a word.

**Layout guide**

* One template per mockup page, covering all four archetypes (list, detail/form, dashboard, guest).
* Lists default to a table; cards are an optional view behind a toggle (one submission used a card grid by default).

**Mockups**

* Same five pages as last week. The strongest mockup per page was the starting point, then brought in line with the converged system.
* Guest verification code is 6 digits.
* Error messages say what happened and what to do ("We couldn't send a code. Try again in a minute."), not "Login unsuccessful".

**Flow map**

* Both portals on one map, every box tagged with its mockup ID.
* Branches: login, email code, form validation, delete confirmation, settings save, terms, code sent, code correct, attempts left. Loop-backs in red, returns in grey.

## Decisions made in Part 2 (Penpot updated to match code)

So that the Penpot file stays the single source of truth, Penpot was changed to equal what code will render:

* Status colours darkened to pass 4.5:1 as text on white and on their own tints: error `#C10007`, success `#00753A`, warning `#A33F00`, info `#0069A8`. Tints and borders are exactly 10% and 30% of each.
* Radius: 6 / 8 / 14 / 18 (`rounded-sm`, `md`, `xl`, `2xl`), all derived from `--radius: 0.625rem`.
* Dialogs 512px (`sm:max-w-lg`).
* Type rounded to Tailwind sizes: stat 30/36, guest title 24/32, overline 12, mono 14.
* Six new variables for success, warning and info (ShadCN has none). **Needs Cian's approval.**

## Brief assumptions (§5)

All four hold: still Penpot (new converged file, originals kept); the policy lands in `docs/design/` as plain markdown; the export is values, names and light/dark pairs; the policy is written for an LLM.

Two deviations from the brief:

* **§4:** we add six variables beyond the existing vocabulary (`--success`, `--warning`, `--info` and their `-foreground`) because ShadCN has no status colours.
* **§6.4:** the brief asks us to check the real files in `src/components/ui`. We have no repo access, so the component mapping uses ShadCN's standard names, and the code-side checks are handed to Cian (below).

## Open items for Cian (need repo access)

|Item|Our value|Where to check|
|-|-|-|
|Baseline client|—|Which client's `globals.css` to compare against|
|Primary blue|`#1447E6` (Phila and Zipho had `#1D4ED8`)|`--primary` in the baseline `globals.css`|
|Brand lime|`#D6E600` (Samu's swatch had `#F4F419`)|captive-portal `globals.css`|
|Fonts|Roboto, Roboto Mono|How Roboto is loaded; fill `tokens.css` section 4|
|Guest code length|6 digits|OTP settings|
|Component check|—|"Repo check for Cian" in `component-mapping.md`|
|Six new status variables|proposed|Approve or reject|

If anything found differs from our values, the code wins and we update Penpot to match.

## Files

All in `docs/design/`:

* `design-policy.md`: the rules, for anyone (or any Claude) styling AuraConnect.
* `tokens.css`: paste-ready values for each client's `globals.css`.
* `token-export.md`: where each value comes from.
* `component-mapping.md`: each component mapped to its ShadCN primitive and what changes.
* `convergence-record.md`: this file.

## Wrap-up walkthrough (brief §6.6)

Together, before handing in: the converged system in Penpot, then `tokens.css` and `token-export.md`, then `component-mapping.md`, then `design-policy.md`.

