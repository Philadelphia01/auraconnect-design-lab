"use client";

// AuraConnect design lab · Colours, type and radius
// Every swatch reads the live CSS variable from globals.css, so this page shows
// exactly what the code renders. Compare it side by side with Penpot DS 1.

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const groups: [string, [string, string][]][] = [
  ["Surface / text", [["--background", "Page"], ["--foreground", "Text"], ["--card", "Cards"], ["--popover", "Popovers"]]],
  ["Semantic / brand", [["--primary", "Main action"], ["--secondary", "Neutral fill"], ["--muted", "Muted fill"], ["--muted-foreground", "Secondary text"], ["--accent", "Hover"], ["--destructive", "Delete, errors"]]],
  ["Status (new, needs Cian's approval)", [["--success", "Success"], ["--warning", "Warning"], ["--info", "Info"]]],
  ["Structural", [["--border", "Dividers"], ["--input", "Control borders"], ["--ring", "Focus"]]],
  ["Sidebar", [["--sidebar", "Background"], ["--sidebar-foreground", "Nav text"], ["--sidebar-primary", "Active item"], ["--sidebar-accent", "Hover"]]],
  ["Charts", [["--chart-1", "This period"], ["--chart-2", "Previous period"], ["--chart-3", "Positive"], ["--chart-4", "Data volume"], ["--chart-5", "Fifth series"]]],
];

const type: [string, string, string][] = [
  ["h1 · Page title", "text-2xl font-bold", "Platform Settings"],
  ["h2 · Section / dialog title", "text-lg font-semibold", "Create tenant"],
  ["h3 · Card title", "text-base font-semibold", "RADIUS DB Integration"],
  ["Stat value", "text-3xl font-bold", "42.9 GB"],
  ["Body", "text-sm", "Live gateway and network health checks."],
  ["Label", "text-sm font-medium", "Staff session length (minutes)"],
  ["Caption", "text-xs text-muted-foreground", "Leave blank to use the system default."],
  ["Overline", "text-xs font-semibold uppercase tracking-wide", "Get started"],
  ["Mono", "font-mono text-sm", "102.213.201.130"],
  ["Mono small", "font-mono text-xs", "1A:61:0E:3D:99:0B"],
  ["Guest body / fields", "text-base", "+27 82 123 4567"],
];

const radii: [string, string][] = [
  ["rounded-sm", "Checkboxes · 6px"], ["rounded-md", "Buttons, inputs · 8px"],
  ["rounded-xl", "Cards, tables, dialogs · 14px"], ["rounded-2xl", "Guest cards · 18px"], ["rounded-full", "Pills"],
];

export default function ColorsPage() {
  const [dark, setDark] = useState(false);
  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  return (
    <main className="mx-auto max-w-7xl space-y-12 p-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Colours, type and radius</h1>
          <p className="text-sm text-muted-foreground">Read live from globals.css. Compare with Penpot DS 1.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/"><Button variant="outline">Components</Button></Link>
          <Link href="/guest"><Button variant="outline">Guest portal</Button></Link>
          <Button variant="outline" onClick={toggleDark}>{dark ? "Light mode" : "Dark mode"}</Button>
        </div>
      </header>

      {groups.map(([title, tokens]) => (
        <section key={title} className="space-y-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {tokens.map(([name, use]) => (
              <div key={name} className="space-y-2">
                <div className="h-16 rounded-md border" style={{ background: `var(${name})` }} />
                <p className="font-mono text-xs font-semibold">{name}</p>
                <p className="text-xs text-muted-foreground">{use}</p>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Captive portal overrides (.guest)</h2>
        <div className="guest grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[["--primary", "Lime"], ["--primary-foreground", "Text on lime"], ["--secondary", "Navy band"], ["--ring", "Focus"]].map(([name, use]) => (
            <div key={name} className="space-y-2">
              <div className="h-16 rounded-md border" style={{ background: `var(${name})` }} />
              <p className="font-mono text-xs font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{use}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Type scale</h2>
        <div className="divide-y rounded-xl border bg-card">
          {type.map(([role, cls, sample]) => (
            <div key={role} className="grid items-center gap-4 p-4 md:grid-cols-[220px_320px_1fr]">
              <span className="text-sm font-medium">{role}</span>
              <code className="font-mono text-xs text-primary">{cls}</code>
              <span className={cls}>{sample}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-6">
          {radii.map(([cls, use]) => (
            <div key={cls} className="space-y-2">
              <div className={`h-20 w-28 border bg-muted ${cls}`} />
              <p className="font-mono text-xs font-semibold">{cls}</p>
              <p className="text-xs text-muted-foreground">{use}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
