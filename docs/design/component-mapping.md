# Component mapping (Part 2C)

AuraConnect · Design System Convergence · for review, submission Friday 16 October 2026

For each core component in the converged design system: which ShadCN primitive in `src/components/ui` it corresponds to, and what (if anything) changes. This is a map for Cian's Claude to implement from, not an implementation.

**How this was checked:** we (Samu, Phila, Zipho) don't have access to the AuraConnect repo, so we built our own lab: a fresh Next.js app with ShadCN set up exactly like the clients (style `base-nova`, base colour `neutral`, CSS variables on), our `tokens.css` pasted into `globals.css`, and preview pages for every component below. The **Lab** column says what we saw there. AuraConnect may have customised its components since installing them, so **Cian (or Cian's Claude) should still run the check below in one client and tick the Verified column.** If the real files differ from the lab, the real files win.

**Team decision from the lab:** buttons, inputs and selects are **40px** high (`h-10`), as in Penpot. ShadCN base-nova installs the button at 32px (`h-8`), so this is a code change in `button.tsx`; in our install `input.tsx` and the select trigger were already 40px (`h-10`), and Penpot stays as it is.

### Repo check for Cian

Run these in `clients/current/admin`:

```
ls src/components/ui
grep -n "size:" -A6 src/components/ui/button.tsx          # default height
grep -n "destructive" src/components/ui/button.tsx         # solid or soft?
grep -n "isActive\|data-\[active" src/components/ui/sidebar.tsx   # active style
grep -n "variant" src/components/ui/tabs.tsx               # is there a line variant?
```

| Question | Lab (fresh base-nova) | Found in AuraConnect (Cian) |
|---|---|---|
| Button default height (`h-8` / `h-9` / `h-10`) | 32px (`h-8`; we first measured ~36px). We decided 40px, so change to `h-10` | |
| Button `destructive`: solid (`bg-destructive text-white`) or soft (`bg-destructive/10`) | Soft (pale red background, red text) | |
| Sidebar active item: subtle (`bg-sidebar-accent`) or solid (`bg-sidebar-primary`) | Subtle grey. Needs the solid blue fill | |
| `input-otp.tsx` exists? | Not by default; added with `npx shadcn@latest add input-otp`, works | |
| `tabs.tsx` has a `line` variant? | Default renders as a grey pill/segmented bar, not an underline | |
| Clients actually use `sidebar.tsx` for the nav? | n/a (lab only) | |

## Core components

| Design system component | ShadCN primitive | Change | Lab | Verified (Cian) |
|---|---|---|---|---|
| Button: Primary | `button.tsx` · `variant="default"` | Tokens only | ✓ Blue, matches Penpot | ☐ |
| Button: Secondary (white, bordered) | `button.tsx` · `variant="outline"` | Tokens only | ✓ Matches | ☐ |
| Button: Ghost | `button.tsx` · `variant="ghost"` | Tokens only | ✓ Matches | ☐ |
| Button: Danger soft (page entry point, "Delete tenant") | `button.tsx` · `variant="destructive"` | Tokens only: the installed `destructive` is already the soft form | ✓ Installed `destructive` is soft (pale red, red text) | ☐ |
| Button: Danger (solid, inside a confirm dialog) | `button.tsx` | **New variant** `destructive-solid`: `bg-destructive text-white hover:bg-destructive/90`, focus ring in destructive | ✗ Not in base-nova; needs adding | ☐ |
| Button: Error / Retry state | `button.tsx` · `variant="destructive"` | Pattern: soft destructive + alert icon + label "Retry". No extra variant | ✓ | ☐ |
| Button: Loading | `button.tsx` · `disabled` | Pattern: disabled + label ending in "…" | ✓ "Saving…" works | ☐ |
| Button: height | `button.tsx` size `default` | **Adjust** default to 40px (`h-10`); small stays 32px (`h-8`). Team decision: 40, as in Penpot | ✗ Installed default is 32px (`h-8`). Change the `default` size to `h-10 px-4`, `sm` to `h-8`, `lg` to `h-12` (guest), icon sizes to match. ✓ Applied in lab; buttons, inputs and selects all 40px | ☐ |
| Text input | `input.tsx` | Height `h-10` (40px), already the base-nova default; only change it if AuraConnect's copy differs. Error state comes from `aria-invalid` and uses `--destructive` | ✓ Red error ring works; already 40px (`h-10`) in our install | ☐ |
| Technical-value input (IP, host, slug) | `input.tsx` | Pattern: add `font-mono` where used. No variant | ✓ Roboto Mono | ☐ |
| Password input with eye toggle | `input.tsx` + `button.tsx` (ghost, icon) | Pattern, unless a password input already exists | ✓ Show/Hide works (input + ghost button) | ☐ |
| Select | `select.tsx` (`SelectTrigger`) | Trigger height `h-10` (40px), already the base-nova default; only change it if AuraConnect's copy differs | ✓ Opens, error ring works (`aria-invalid`); trigger already 40px (`data-[size=default]:h-10`) | ☐ |
| Field label, helper, error text | `label.tsx` (and `field.tsx` if present) | Tokens only. Error text uses `text-destructive`, helper uses `text-muted-foreground` | ✓ Matches | ☐ |
| Checkbox | `checkbox.tsx` | Tokens only | ✓ Blue when ticked | ☐ |
| Toggle | `switch.tsx` | Tokens only | ✓ Blue when on | ☐ |
| Table | `table.tsx` | **Adjust**: header row background `bg-muted/50`, body row height 56px (cell `py-4`). Hover row should already use `hover:bg-muted/50` | ✗ Header has no background; rows ~52px. Adjust as described | ☐ |
| Table: empty and error states | `table.tsx` + `button.tsx` + `alert.tsx` | Pattern: empty = one full-width cell with message + "Clear filters"; error = destructive alert + "Retry". Never a blank table | ✓ Both work as a pattern, no component change | ☐ |
| Card (static) | `card.tsx` | Tokens only. **Adjust** `CardFooter`: base-nova gives it a grey band (`bg-muted/50`) and top border; Penpot has neither, so remove both | ✓ Border, radius 14. ✗ Footer has a grey band | ☐ |
| Card (clickable: filter cards, site cards) | `card.tsx` | **New variant** `interactive`: hover `bg-primary/5 border-primary/30`, focus ring, selected `bg-primary/10 border-primary`, disabled muted, error `bg-destructive/10 border-destructive/40` | ✓ Classes tested in lab: hover, selected and disabled look as in Penpot | ☐ |
| Stat card | `card.tsx` | Pattern: card + icon tile + value (`text-3xl font-bold`) + label | ✓ Matches | ☐ |
| Status pill / badge | `badge.tsx` | **New variants** `success`, `warning`, `info` (tint bg `/10`, border `/30`, text in the token colour). Always icon + word ("✓ Set", "— Not set"). Needs the semantic extension tokens | ✓ Tint + border + coloured text look right using the new tokens | ☐ |
| Trend chip | `badge.tsx` | Pattern: uses the new `success` / `destructive` / `secondary` badge variants with a trend icon | ✓ | ☐ |
| Primary navigation (sidebar) | `sidebar.tsx` (`SidebarMenuButton`) | **Adjust** the active state to a solid fill: `bg-sidebar-primary text-sidebar-primary-foreground` (ShadCN's default active is the subtle accent). Width `15rem`, collapsed `4rem`. Error state shows an alert icon (via `SidebarMenuBadge`), never a colour-only dot. If the clients do not use `sidebar.tsx`, note the actual nav component here | ✗ Active item is grey. Fix: add `data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground` to the active style (Base UI marks the active item with `data-active`). Fix applied in lab: ✓ active item now solid blue | ☐ |
| Top bar | none | Pattern: app shell, not a primitive | n/a | ☐ |
| Tabs (sub-pages of one record) | `tabs.tsx` | **New variant** `line` (underline, active text in primary) if not already present. The default pill style stays for segmented toggles | ✗ Renders as a grey pill bar, not an underline | ☐ |
| Segmented toggle (Cards / Table) | `tabs.tsx` default, or `toggle-group.tsx` | Tokens only | ✓ The default pill style suits this | ☐ |
| Alert (inline) | `alert.tsx` | **New variants** `success`, `warning`, `info`, and **restyle** `destructive` to match: all tinted (`bg-*/10`, `border-*/30`), coloured title, `text-foreground` body | ✗ Installed `destructive` alert has a white background with red title and red text; Penpot has a red tint and dark body text. Restyle `destructive` too | ☐ |
| Toast | `sonner.tsx` (`Toaster`) | **Adjust** `Toaster` props: `position="top-right"`, `duration={5000}`, `visibleToasts={1}` (one at a time, newest replaces oldest); errors call `toast.error(..., { duration: Infinity })`. Left accent stripe and icon colour per type via `toastOptions.classNames` | ✗ Position and auto-dismiss work, but icons are black, there is no coloured left stripe, and toasts stack instead of replacing each other | ☐ |
| Modal | `dialog.tsx` | Tokens only, plus one **Adjust**: remove the grey band from `DialogFooter` (base-nova gives it `bg-muted/50`; Penpot has a white footer with only a top border). Width is the default `sm:max-w-lg` (512px), same as Penpot. Cancel left of the primary action | ✓ Width, title, description, field error and button order match. ✗ Footer has a grey band; the error alert at the top shows the installed white `destructive` alert (fixed by the `alert.tsx` change) | ☐ |
| Destructive confirm ("Delete tenant?") | `alert-dialog.tsx` | Pattern: type-the-name input; the solid destructive action stays `disabled` until it matches | ✓ Opens; Delete stays disabled until the name matches | ☐ |

## Captive portal only

| Design system component | ShadCN primitive | Change | Lab | Verified (Cian) |
|---|---|---|---|---|
| Lime button | `button.tsx` · `variant="default"` | Tokens only for colour (captive-portal overrides `--primary`). **New size** `guest`: `h-12 rounded-full text-base font-semibold` | ✓ Lime with dark text | ☐ |
| Guest inputs | `input.tsx` | Pattern: `h-12 text-base` (16px text stops phones zooming in) | ✓ | ☐ |
| Phone input (flag + code) | `input.tsx` + `select.tsx` | Pattern | ✓ (+27 prefix) | ☐ |
| Verification code boxes | `input-otp.tsx` | **Adjust** (pattern): 6 slots, 44×56, as **separate boxes with a gap** (`gap-2` on `InputOTPGroup`, each slot fully bordered and `rounded-md`). Digits only: `pattern={REGEXP_ONLY_DIGITS}` (from `input-otp`) and `inputMode="numeric"` so phones show the number pad. If `input-otp.tsx` is missing, add it from ShadCN | ✓ 6 slots work, navy focus ring, red error state and message. ✗ Slots are joined into one strip (Penpot has separate boxes). ✗ Accepts letters and symbols by default | ☐ |
| Terms checkbox | `checkbox.tsx` | Tokens only, `size-5` | ✓ Lime when ticked | ☐ |
| Text links ("Change number", "Resend code") | `button.tsx` · `variant="link"` | **Adjust** (pattern): on guest pages use `text-secondary` (navy), not the default `text-primary`. Because captive-portal sets `--primary` to lime, the installed link variant renders lime text on white, which is unreadable | ✗ Lime text on white card, unreadable | ☐ |

## Charts

| Design system component | ShadCN primitive | Change | Lab | Verified (Cian) |
|---|---|---|---|---|
| Line chart, sparkline, legend, tooltip | `chart.tsx` (`ChartContainer`) | Tokens only: series use `var(--chart-1)` … `var(--chart-5)` in order; this period is always `chart-1`, previous period `chart-2` | ✓ Line chart with `--chart-1` (this week) and `--chart-2` (previous), tooltip and legend work | ☐ |

## Summary of code changes for Cian's Claude

1. Paste token values (`tokens.css` sections 1–4; section 5 in captive-portal only).
2. `button.tsx`: default height 40px (`h-10`, team decision); keep the installed soft `destructive`, add `destructive-solid`; captive-portal adds a `guest` size.
3. `input.tsx`, `select.tsx`: confirm they are 40px (`h-10`, the base-nova default); change only if AuraConnect's copies differ.
4. `table.tsx`: header background, 56px rows.
5. `card.tsx`: add `interactive` variant; remove the grey band and border from `CardFooter`.
6. `badge.tsx`: add `success`, `warning`, `info` variants.
7. `alert.tsx`: add `success`, `warning`, `info` variants and restyle `destructive` to the same tinted pattern.
8. `sidebar.tsx`: solid blue active state, widths.
9. `tabs.tsx`: add `line` variant (underline, active in primary).
10. `dialog.tsx`: remove the grey background from `DialogFooter` (keep the top border).
11. `input-otp.tsx` (captive-portal): separate slot boxes with a gap, digits only (`REGEXP_ONLY_DIGITS`, numeric keypad); guest text links use `text-secondary` (navy).
12. `sonner.tsx`: position, duration, one toast at a time (`visibleToasts={1}`), per-type icon colour and left accent stripe.

Every item was checked in our base-nova lab, in light and dark mode, including keyboard focus (Tab). Two fixes were also tried there and work: the button sizes in item 2 (the `destructive-solid` variant was only imitated, not added) and the sidebar active fill in item 8.

Everything else is tokens only.
