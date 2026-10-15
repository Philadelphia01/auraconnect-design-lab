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
* Controls are 40px (`h-10`), as in Penpot. ShadCN base-nova installs the button at 32px (`h-8`), so `button.tsx` changes; inputs and selects are already 40px.

## Design lab (checking Part 2 without repo access)

Charles suggested a small shared repo to see the tokens live. We built one: a fresh Next.js app with ShadCN set up exactly like the clients (style `base-nova`, base colour `neutral`, CSS variables on), `tokens.css` pasted into `globals.css`, and preview pages for every component (admin components, guest portal, colours and type). Nothing touches the AuraConnect codebase.

What it confirmed:

* The token values render as in Penpot, light and dark. The radius multipliers match, so `0.625rem` gives 6 / 8 / 14 / 18.
* Fonts: Roboto and Roboto Mono load with `next/font/google` on the `<html>` tag as `--font-roboto` / `--font-roboto-mono` (now in `tokens.css` section 4). A fresh install points `--font-sans` at itself and falls back to a serif font.
* 11 component changes for Cian, each seen in the lab (full list in `component-mapping.md`): button height and a solid destructive variant, sidebar active fill, line tabs, tinted destructive alert, success/warning/info badges and alerts, no grey band on card and dialog footers, toast styling, table header, interactive cards.
* Two fixes were tried and work: the 40px button sizes, and the sidebar's blue active item (`data-active:bg-sidebar-primary`).

## Brief assumptions (§5)

All four hold: still Penpot (new converged file, originals kept); the policy lands in `docs/design/` as plain markdown; the export is values, names and light/dark pairs; the policy is written for an LLM.

Two deviations from the brief:

* **§4:** we add six variables beyond the existing vocabulary (`--success`, `--warning`, `--info` and their `-foreground`) because ShadCN has no status colours.
* **§6.4:** the brief asks us to check the real files in `src/components/ui`. We have no repo access, so we checked every component against a fresh ShadCN base-nova install in our design lab instead (above). Cian only needs to confirm whether AuraConnect has customised any of them.

## Open items for Cian (need repo access)

|Item|Our value|Where to check|
|-|-|-|
|Baseline client|—|Which client's `globals.css` to compare against|
|Primary blue|`#1447E6` (Phila and Zipho had `#1D4ED8`)|`--primary` in the baseline `globals.css`|
|Brand lime|`#D6E600` (Samu's swatch had `#F4F419`)|captive-portal `globals.css`|
|Fonts|Roboto, Roboto Mono via `next/font` on `<html>` (works in our lab)|Whether the real clients load Roboto the same way; use their variable names if not|
|Guest code length|6 digits|OTP settings|
|Component check|All rows checked in our lab|"Repo check for Cian" in `component-mapping.md`: confirm AuraConnect hasn't customised the primitives|
|Six new status variables|proposed|Approve or reject|

If anything found differs from our values, the code wins and we update Penpot to match.

## Files

All in `docs/design/`:

* `design-policy.md`: the rules, for anyone (or any Claude) styling AuraConnect.
* `tokens.css`: paste-ready values for each client's `globals.css`.
* `token-export.md`: where each value comes from.
* `component-mapping.md`: each component mapped to its ShadCN primitive and what changes.
* `convergence-record.md`: this file.

The design lab (live preview of the tokens and components) is in our shared Git repo, with these docs under `docs/design/`.

## Wrap-up walkthrough (brief §6.6)

Together, before handing in: the converged system in Penpot, then `tokens.css` and `token-export.md` (shown live in the lab), then `component-mapping.md` (with the lab's preview pages), then `design-policy.md`.

