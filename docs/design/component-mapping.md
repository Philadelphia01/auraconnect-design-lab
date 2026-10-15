# Component mapping (Part 2C)

AuraConnect · Design System Convergence · for review, submission Friday 16 October 2026

For each core component in the converged design system: which ShadCN primitive in `src/components/ui` it corresponds to, and what (if anything) changes. This is a map for Cian's Claude to implement from, not an implementation.

**Repo access:** we (Samu, Phila, Zipho) don't have access to the repo, so this map uses ShadCN's standard file names and could not be checked against the real files, as the brief's §6.4 asks. The clients use style `base-nova`, so class names and existing variants may differ. **Cian (or Cian's Claude) should run the check below in one client before implementing, then tick the Verified column.** Where a row says "check", note what was found in that row.

### Repo check for Cian

Run these in `clients/current/admin`:

```
ls src/components/ui
grep -n "size:" -A6 src/components/ui/button.tsx          # default height
grep -n "destructive" src/components/ui/button.tsx         # solid or soft?
grep -n "isActive\|data-\[active" src/components/ui/sidebar.tsx   # active style
grep -n "variant" src/components/ui/tabs.tsx               # is there a line variant?
```

| Question | Found |
|---|---|
| Button default height (`h-8` / `h-9` / `h-10`) | |
| Button `destructive`: solid (`bg-destructive text-white`) or soft (`bg-destructive/10`) | |
| Sidebar active item: subtle (`bg-sidebar-accent`) or solid (`bg-sidebar-primary`) | |
| `input-otp.tsx` exists? | |
| `tabs.tsx` has a `line` variant? | |
| Clients actually use `sidebar.tsx` for the nav? | |

## Core components

| Design system component | ShadCN primitive | Change | Verified (Cian) |
|---|---|---|---|
| Button: Primary | `button.tsx` · `variant="default"` | Tokens only | ☐ |
| Button: Secondary (white, bordered) | `button.tsx` · `variant="outline"` | Tokens only | ☐ |
| Button: Ghost | `button.tsx` · `variant="ghost"` | Tokens only | ☐ |
| Button: Danger (solid, inside a confirm dialog) | `button.tsx` · `variant="destructive"` | Check: some ShadCN styles render `destructive` as a soft tint. We need **both** a solid and a soft form. Keep whichever exists, add the other as a new variant (`destructive-soft` or `destructive-solid`) | ☐ |
| Button: Danger soft (page entry point, "Delete tenant") | `button.tsx` | See above | ☐ |
| Button: Error / Retry state | `button.tsx` · the soft destructive variant | Pattern: soft destructive + alert icon + label "Retry". No extra variant | ☐ |
| Button: Loading | `button.tsx` · `disabled` | Pattern: disabled + label ending in "…" | ☐ |
| Button: height | `button.tsx` size `default` | **Adjust**: design default is 40px (`h-10`), small 32px (`h-8`). Check current default height and change it if it is 36px or 32px | ☐ |
| Text input | `input.tsx` | **Adjust** height to `h-10`. Error state should already come from `aria-invalid` styling; confirm it uses `--destructive` | ☐ |
| Technical-value input (IP, host, slug) | `input.tsx` | Pattern: add `font-mono` where used. No variant | ☐ |
| Password input with eye toggle | `input.tsx` + `button.tsx` (ghost, icon) | Pattern, unless a password input already exists | ☐ |
| Select | `select.tsx` (`SelectTrigger`) | **Adjust** trigger height to `h-10` to match inputs | ☐ |
| Field label, helper, error text | `label.tsx` (and `field.tsx` if present) | Tokens only. Error text uses `text-destructive`, helper uses `text-muted-foreground` | ☐ |
| Checkbox | `checkbox.tsx` | Tokens only | ☐ |
| Toggle | `switch.tsx` | Tokens only | ☐ |
| Table | `table.tsx` | **Adjust**: header row background `bg-muted/50`, body row height 56px (cell `py-4`). Hover row should already use `hover:bg-muted/50` | ☐ |
| Table: empty and error states | `table.tsx` + `button.tsx` + `alert.tsx` | Pattern: empty = one full-width cell with message + "Clear filters"; error = destructive alert + "Retry". Never a blank table | ☐ |
| Card (static) | `card.tsx` | Tokens only | ☐ |
| Card (clickable: filter cards, site cards) | `card.tsx` | **New variant** `interactive`: hover `bg-primary/5 border-primary/30`, focus ring, selected `bg-primary/10 border-primary`, disabled muted, error `bg-destructive/10 border-destructive/40` | ☐ |
| Stat card | `card.tsx` | Pattern: card + icon tile + value (`text-3xl font-bold`) + label | ☐ |
| Status pill / badge | `badge.tsx` | **New variants** `success`, `warning`, `info` (tint bg `/10`, border `/30`, text in the token colour). Always icon + word ("✓ Set", "— Not set"). Needs the semantic extension tokens | ☐ |
| Trend chip | `badge.tsx` | Pattern: uses the new `success` / `destructive` / `secondary` badge variants with a trend icon | ☐ |
| Primary navigation (sidebar) | `sidebar.tsx` (`SidebarMenuButton`) | **Adjust** the active state to a solid fill: `bg-sidebar-primary text-sidebar-primary-foreground` (ShadCN's default active is the subtle accent). Width `15rem`, collapsed `4rem`. Error state shows an alert icon (via `SidebarMenuBadge`), never a colour-only dot. If the clients do not use `sidebar.tsx`, note the actual nav component here | ☐ |
| Top bar | none | Pattern: app shell, not a primitive | ☐ |
| Tabs (sub-pages of one record) | `tabs.tsx` | **New variant** `line` (underline, active text in primary) if not already present. The default pill style stays for segmented toggles | ☐ |
| Segmented toggle (Cards / Table) | `tabs.tsx` default, or `toggle-group.tsx` | Tokens only | ☐ |
| Alert (inline) | `alert.tsx` | **New variants** `success`, `warning`, `info` alongside `destructive`, all tinted (`bg-*/10`, `border-*/30`) | ☐ |
| Toast | `sonner.tsx` (`Toaster`) | **Adjust** `Toaster` props: `position="top-right"`, `duration={5000}`; errors call `toast.error(..., { duration: Infinity })`. Left accent stripe and icon colour per type via `toastOptions.classNames` | ☐ |
| Modal | `dialog.tsx` | Tokens only. Width is the default `sm:max-w-lg` (512px), same as Penpot. Footer has a top border, Cancel left of the primary action | ☐ |
| Destructive confirm ("Delete tenant?") | `alert-dialog.tsx` | Pattern: type-the-name input; the solid destructive action stays `disabled` until it matches | ☐ |

## Captive portal only

| Design system component | ShadCN primitive | Change | Verified (Cian) |
|---|---|---|---|
| Lime button | `button.tsx` · `variant="default"` | Tokens only for colour (captive-portal overrides `--primary`). **New size** `guest`: `h-12 rounded-full text-base font-semibold` | ☐ |
| Guest inputs | `input.tsx` | Pattern: `h-12 text-base` (16px text stops phones zooming in) | ☐ |
| Phone input (flag + code) | `input.tsx` + `select.tsx` | Pattern | ☐ |
| Verification code boxes | `input-otp.tsx` if present | Tokens only; 6 slots, 44×56. If `input-otp.tsx` is missing, it can be added from ShadCN | ☐ |
| Terms checkbox | `checkbox.tsx` | Tokens only, `size-5` | ☐ |

## Charts

| Design system component | ShadCN primitive | Change | Verified (Cian) |
|---|---|---|---|
| Line chart, sparkline, legend, tooltip | `chart.tsx` (`ChartContainer`) | Tokens only: series use `var(--chart-1)` … `var(--chart-5)` in order; this period is always `chart-1`, previous period `chart-2` | ☐ |

## Summary of code changes for Cian's Claude

1. Paste token values (`tokens.css` sections 1–4; section 5 in captive-portal only).
2. `button.tsx`: default height 40px; make sure both a solid and a soft destructive exist; captive-portal adds a `guest` size.
3. `input.tsx`, `select.tsx`: height 40px.
4. `table.tsx`: header background, 56px rows.
5. `card.tsx`: add `interactive` variant.
6. `badge.tsx`, `alert.tsx`: add `success`, `warning`, `info` variants.
7. `sidebar.tsx`: solid active state, widths.
8. `tabs.tsx`: add `line` variant if missing.
9. `sonner.tsx`: position, duration, per-type accent.

Everything else is tokens only.
