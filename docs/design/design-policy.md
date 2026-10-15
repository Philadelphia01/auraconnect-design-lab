# AuraConnect design policy

Read this before styling or designing anything in AuraConnect (admin, monitor, captive-portal). It is the rulebook; the details live next to it in `docs/design/`: `token-export.md` (every token value, with `tokens.css`), `component-mapping.md` (which ShadCN primitive to use) and `convergence-record.md` (why each decision was made). The Penpot file uses the same values as code. If a rule here conflicts with an existing page, follow this document and mention the conflict.

Status: for review, October 2026. Owners: Samu (design system), Phila (layout and flows), Zipho.

## 1. Colour: use tokens, never raw colours

Only use ShadCN token classes. Never write a hex value, `oklch()`, or a Tailwind palette class (`bg-blue-600`, `text-red-500`, `bg-gray-100`) in a component.

| Need | Use |
|---|---|
| Page background | `bg-background` |
| Cards, tables, dialogs, popovers | `bg-card` / `bg-popover` |
| Main text | `text-foreground` |
| Secondary text, helper text, timestamps, table headers | `text-muted-foreground` |
| Hover background on rows, ghost buttons, menu items | `bg-accent` (or `hover:bg-muted/50` on table rows) |
| The one main action on a screen | `bg-primary text-primary-foreground` (Button `default`) |
| Selected item (filter card, nav item, segment) | `bg-primary/10 border-primary`, text `text-primary` |
| Borders and dividers | `border-border` |
| Input and select borders | `border-input` |
| Focus | `ring-ring` (always visible, see section 5) |
| Error text, error borders, destructive actions | `destructive` (`text-destructive`, `border-destructive`, Button `destructive`) |
| Success, warning, info | `success`, `warning`, `info` |
| Tinted backgrounds for status | `bg-success/10 border-success/30 text-success` (same pattern for every status) |
| Charts | `var(--chart-1)` … `var(--chart-5)` in order. This period = chart-1, previous period = chart-2 |
| Modal backdrop | Black at 50% (the Dialog default) |

Status always pairs colour with an icon and a word ("✓ Active", "⚠ Suspended", "— Not set"). Never rely on colour alone, and never show status as a bare coloured dot.

## 2. Captive portal is the only exception

Guest pages (`captive-portal`) override `--primary` to brand lime with dark text and `--secondary` to navy. So on guest pages:

- Primary actions are lime: Button `default` with size `guest` (48px, fully rounded).
- The page band below the header is navy (`bg-secondary text-secondary-foreground`).
- Text on lime is always `text-primary-foreground` (dark). Never white on lime.
- Text links on guest pages ("Change number", "Resend code") are navy: `text-secondary`. Never use Button `link` as is, because `text-primary` is lime there and unreadable on white.
- Lime never appears in admin or monitor. Admin blue never appears on guest pages.

## 3. Typography

Roboto for everything; Roboto Mono (`font-mono`) for technical values only: slugs, IDs, IPs, ports, MAC addresses, hostnames, references.

| Use | Classes |
|---|---|
| Page title | `text-2xl font-bold` |
| Section or dialog title | `text-lg font-semibold` |
| Card title | `text-base font-semibold` |
| Stat value | `text-3xl font-bold` |
| Body, table cells | `text-sm` |
| Labels, buttons, emphasis | `text-sm font-medium` |
| Helper text, errors, captions, pills, table headers | `text-xs` (`font-medium` for pills and headers) |
| Guest body and guest inputs | `text-base` (16px stops phones zooming) |

Sentence case everywhere. Uppercase only for the guest "GET STARTED" divider.

## 4. Spacing, layout, radius

- Spacing comes from the 4px scale only: `1 2 3 4 5 6 8 10 12` (4–48px). No arbitrary values like `p-[18px]` or `text-[13px]`.
- Common gaps: label to input `gap-2`; between fields `gap-4`; card padding `p-6`; between cards and page sections `gap-6`; page margin `p-8`.
- Admin page frame: sidebar 240px (collapsed 64px), top bar 64px, content on a 12-column grid with `gap-6`, max width 1280px.
- Control height: 40px in admin (`h-10`), 48px on guest pages (`h-12`). Small buttons 32px (`h-8`) only in dense tables and toolbars.
- Guest pages are designed at 390px wide: 16px side margin, 4-column grid.
- Radius: controls, nav items, alerts, toasts `rounded-md`; cards, tables, dialogs `rounded-xl`; guest cards `rounded-2xl`; pills, badges, toggles, guest buttons `rounded-full`. No other radii.
- Shadows only on things that float: toasts, menus, dialogs. Cards and tables are flat with a border.

## 5. States every interactive component must support

Every button, input, select, checkbox, toggle, nav item, clickable card and table row must have all of these. If you add one, add all.

| State | How it looks |
|---|---|
| Normal | As specified |
| Hover | One step darker (`primary` hover) or `bg-accent` / `bg-muted/50` |
| Focus | Keep the ShadCN primitives' built-in focus ring (`ring-ring`, 3px, on `focus-visible`); destructive controls use the destructive ring. Never remove an outline without a ring |
| Disabled | Muted background, `text-muted-foreground`, no hover, `cursor-not-allowed`. Loading = disabled + label ending in "…" |
| Error | `border-destructive` plus a message below in `text-xs text-destructive` with an alert icon. For buttons, the failed action becomes a soft destructive "Retry" |

Tables and widgets also need: **loading** (skeleton), **empty** (say what is missing + the next action, e.g. "Clear filters"), and **error** (destructive alert + "Retry"). Never show a blank table.

## 6. Component rules

- **Buttons:** one primary per screen or dialog. Cancel sits left of the primary action. Labels say exactly what happens ("Save settings", "Create tenant"), never "Submit" or "OK".
- **Destructive actions:** pages use the soft destructive button (Button `destructive`) to open a confirm dialog (`alert-dialog`). Only the dialog has the solid destructive button (Button `destructive-solid`), and for deleting a record it stays disabled until the user types the record's name.
- **Forms:** label above every field (required fields end in " *"). Helper text below; an error replaces the helper text and says how to fix it ("Enter a whole number of minutes, or leave blank"). On a failed save, also show an error toast or an alert at the top of the form.
- **Lists:** default to a table. Cards are an optional view behind a Cards/Table toggle.
- **Alerts** sit inline and stay until resolved. **Toasts** confirm an action, top-right, dismiss after 5 seconds; error toasts stay until closed. One toast at a time.
- **Dialogs** are 512px wide (`sm:max-w-lg`), title + optional one-line description, white footer with a top border (no grey band).
- **Navigation:** active sidebar item is a solid primary fill with white text. Sub-pages of one record use underline tabs (`line` variant).
- **Guest verification codes** are 6 digits, one separate box per digit, digits only (numeric keypad on phones).

## 7. Don't

These are the places our three original designs disagreed. Each is settled; do not reintroduce the other option.

- Don't use blue-tinted greys (`gray-*`, `slate-*`, `zinc-*`). Neutrals are pure grey: use the tokens.
- Don't use any hex or Tailwind palette colour in a component, including "just this once" for an error red. Errors use `destructive`.
- Don't show the tenants list (or any list) as a card grid by default. Table first; cards behind the toggle.
- Don't use 36px or 44px controls, or a 56px top bar. 40px controls (48px on guest pages), 64px top bar.
- Don't mix radii (8px cards next to 12px cards). Use the four radius rules in section 4.
- Don't use a solid red button on a page. Solid destructive is for confirm dialogs only.
- Don't write vague errors ("Login unsuccessful. Retry", "Something went wrong"). Say what happened and what to do next.
- Don't use a 4-digit guest code. It is 6 digits.
- Don't show status as a coloured dot (settings sections, nav errors, online/offline). Use an icon and a word.
- Don't put lime in admin or blue on guest pages. Don't put white text on lime.
- Don't show technical values (slugs, IPs, MACs, hosts) in the sans font, and don't use mono for anything else.
- Don't add a new colour, radius, font size or spacing value. If something seems to need one, stop and flag it instead.
- Don't skip a state from section 5 because "it won't happen". If a component is interactive, it has all five.

## 8. When unsure

Find the closest existing pattern in `component-mapping.md` and reuse it. If nothing fits, choose the option that adds no new token, variant or value, and flag the gap in your summary rather than inventing a style.
