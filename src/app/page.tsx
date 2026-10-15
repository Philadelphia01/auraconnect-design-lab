"use client";

// AuraConnect design lab · Admin components preview
// Every component from component-mapping.md, in its states, using the converged tokens.
// success / warning / info badges and alerts use the PROPOSED variants (classes on top of
// ShadCN's outline/default).

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel,
  SidebarMenu, SidebarMenuItem, SidebarMenuButton,
} from "@/components/ui/sidebar";

// Proposed status styles (badge/alert success, warning, info): token + /10 tint + /30 border
const tone = {
  success: "border-success/30 bg-success/10 text-success",
  warning: "border-warning/30 bg-warning/10 text-warning",
  info: "border-info/30 bg-info/10 text-info",
  error: "border-destructive/30 bg-destructive/10 text-destructive",
};

const tenants = [
  { name: "Auraconnect", slug: "auraconnect", status: "Active", sites: 2, routing: "Tenant shared", data: "0.0 GB" },
  { name: "PluxNet Fibre", slug: "pluxnet", status: "Active", sites: 3, routing: "Per site", data: "18.4 GB" },
  { name: "Joburg Theatres", slug: "joburgtheatres", status: "Active", sites: 3, routing: "Per site", data: "6.1 GB" },
  { name: "Peet Load Test", slug: "peet-loadtest", status: "Suspended", sites: 1, routing: "Tenant shared", data: "6.2 GB" },
];

const routingModes = [
  { value: "tenant-shared", label: "Tenant shared" },
  { value: "per-site", label: "Per site" },
];

const sessions = [
  { day: "Wed", thisWeek: 1500, previous: 1300 },
  { day: "Thu", thisWeek: 1700, previous: 1550 },
  { day: "Fri", thisWeek: 1900, previous: 1600 },
  { day: "Sat", thisWeek: 1200, previous: 1350 },
  { day: "Sun", thisWeek: 900, previous: 1000 },
  { day: "Mon", thisWeek: 1600, previous: 1400 },
  { day: "Tue", thisWeek: 510, previous: 900 },
];
const chartConfig = {
  thisWeek: { label: "This week", color: "var(--chart-1)" },
  previous: { label: "Previous week", color: "var(--chart-2)" },
} satisfies ChartConfig;

// Proposed fix for the sidebar (component-mapping.md): solid blue active item
const activeFix =
  "data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground data-active:hover:bg-sidebar-primary/90 data-[active=true]:bg-sidebar-primary data-[active=true]:text-sidebar-primary-foreground";

const nav = ["Dashboard", "Tenants", "Analytics", "Reports", "Hotspot Users", "Gateway Sessions", "Settings"];

function Section({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        {note && <p className="text-sm text-muted-foreground">{note}</p>}
      </div>
      {children}
    </section>
  );
}

export default function Home() {
  const [dark, setDark] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogError, setDialogError] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [selectedCard, setSelectedCard] = useState("active");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [confirmName, setConfirmName] = useState("");

  function toggleDark() {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  }

  function fakeSave() {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings saved", { description: "Changes apply to every staff account." });
    }, 1200);
  }

  return (
    <main className="mx-auto max-w-7xl space-y-12 p-8">
      <Toaster position="top-right" />

      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">AuraConnect design lab</h1>
          <p className="text-sm text-muted-foreground">
            Converged tokens on a fresh ShadCN base-nova install. Press Tab to see focus rings.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/colors"><Button variant="outline">Colours &amp; type</Button></Link>
          <Link href="/guest"><Button variant="outline">Guest portal</Button></Link>
          <Button variant="outline" onClick={toggleDark}>{dark ? "Light mode" : "Dark mode"}</Button>
        </div>
      </header>

      {/* Buttons */}
      <Section title="Button" note="One primary per page. Destructive only for deleting. A failed action shows Retry, not a red button.">
        <div className="grid gap-3 sm:grid-cols-[160px_1fr] sm:items-center">
          <span className="text-sm text-muted-foreground">Default (primary)</span>
          <div className="flex flex-wrap gap-3">
            <Button>Save settings</Button>
            <Button disabled>Save settings</Button>
            <Button disabled={saving} onClick={fakeSave}>{saving ? "Saving…" : "Click to save"}</Button>
          </div>
          <span className="text-sm text-muted-foreground">Outline</span>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Cancel</Button>
            <Button variant="outline" disabled>Cancel</Button>
          </div>
          <span className="text-sm text-muted-foreground">Destructive</span>
          <div className="flex flex-wrap gap-3">
            <Button variant="destructive">Delete tenant</Button>
            <Button variant="destructive" disabled>Delete tenant</Button>
          </div>
          <span className="text-sm text-muted-foreground">Secondary / ghost / link</span>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Clear filters</Button>
            <Button variant="link">View all</Button>
          </div>
          <span className="text-sm text-muted-foreground">Sizes</span>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Status badges" note="Word + icon, never colour alone. Success / warning / info are the proposed new variants.">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={tone.success}>✓ Active</Badge>
          <Badge variant="outline" className={tone.success}>✓ Set</Badge>
          <Badge variant="outline" className={tone.warning}>! Suspended</Badge>
          <Badge variant="outline" className={tone.warning}>! Pending</Badge>
          <Badge variant="outline" className={tone.error}>✕ Failed</Badge>
          <Badge variant="outline" className={tone.info}>i Sandbox</Badge>
          <Badge variant="secondary">– Not set</Badge>
          <Badge>Super Admin</Badge>
          <Badge variant="destructive">ShadCN destructive (as installed)</Badge>
        </div>
      </Section>

      {/* Fields */}
      <Section title="Inputs, checkbox, switch" note="Error state uses aria-invalid. Technical values in mono.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="name">Tenant name</Label>
            <Input id="name" placeholder="e.g. Joburg Theatre" />
            <p className="text-xs text-muted-foreground">Shown to staff and guests.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" defaultValue="a" aria-invalid="true" className="font-mono" />
            <p className="text-xs text-destructive">✕ Use at least 2 characters (letters, numbers, dashes)</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="host">RADIUS host</Label>
            <Input id="host" defaultValue="102.213.201.130" className="font-mono" disabled />
            <p className="text-xs text-muted-foreground">Disabled</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-2"><Checkbox id="c1" defaultChecked /><Label htmlFor="c1">PNG</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="c2" /><Label htmlFor="c2">WebP</Label></div>
          <div className="flex items-center gap-2"><Checkbox id="c3" disabled /><Label htmlFor="c3">Disabled</Label></div>
          <div className="flex items-center gap-2"><Switch id="s1" /><Label htmlFor="s1">Require MFA for all staff</Label></div>
          <div className="flex items-center gap-2"><Switch id="s2" defaultChecked /><Label htmlFor="s2">Sandbox mode</Label></div>
        </div>
      </Section>

      {/* Alerts */}
      <Section title="Alerts" note="Inline messages. Success / warning / info are the proposed new variants.">
        <div className="grid gap-3 md:grid-cols-2">
          <Alert className={tone.success}><AlertTitle>✓ Tenant updated</AlertTitle><AlertDescription>auraconnect was saved.</AlertDescription></Alert>
          <Alert className={tone.warning}><AlertTitle>! Certificate expires in 6 days</AlertTitle><AlertDescription>Renew it before guests are affected.</AlertDescription></Alert>
          <Alert variant="destructive"><AlertTitle>✕ Couldn&apos;t save settings</AlertTitle><AlertDescription>Fix the highlighted fields and try again.</AlertDescription></Alert>
          <Alert className={tone.info}><AlertTitle>i Changes apply platform-wide</AlertTitle><AlertDescription>This setting affects every tenant and site.</AlertDescription></Alert>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => toast.success("Settings saved", { description: "Auto-dismisses after 5 s." })}>Show success toast</Button>
          <Button variant="outline" onClick={() => toast.error("Couldn't create tenant", { description: "That name is already in use.", duration: Infinity })}>Show error toast</Button>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards" note="Border, no hover shadow. Stat value is text-3xl (30/36).">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader><CardDescription>Active connections</CardDescription><CardTitle className="text-3xl font-bold">36</CardTitle></CardHeader>
            <CardContent><Badge variant="outline" className={tone.success}>▲ 9%</Badge> <span className="text-xs text-muted-foreground">vs last week</span></CardContent>
          </Card>
          <Card>
            <CardHeader><CardDescription>Data used today</CardDescription><CardTitle className="text-3xl font-bold">42.9 GB</CardTitle></CardHeader>
            <CardContent><Badge variant="secondary">– No change</Badge></CardContent>
          </Card>
          <Card>
            <CardHeader><CardDescription>New users today</CardDescription></CardHeader>
            <CardContent className="space-y-2"><Skeleton className="h-8 w-24" /><Skeleton className="h-3 w-32" /></CardContent>
          </Card>
          <Card className="border-destructive/30">
            <CardHeader><CardDescription>Active tenants</CardDescription><CardTitle className="text-destructive">Couldn&apos;t load</CardTitle></CardHeader>
            <CardContent><Button size="sm" variant="outline">Retry</Button></CardContent>
          </Card>
        </div>
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>RADIUS DB Integration</CardTitle>
            <CardDescription>Read-only credentials for the RadiusDesk MariaDB, used for usage metrics.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-[1fr_160px]">
            <div className="space-y-2"><Label htmlFor="h">Host</Label><Input id="h" defaultValue="102.213.201.130" className="font-mono" /></div>
            <div className="space-y-2"><Label htmlFor="p">Port</Label><Input id="p" defaultValue="3306" className="font-mono" /></div>
          </CardContent>
          <CardFooter className="justify-end"><Button>Save settings</Button></CardFooter>
        </Card>
      </Section>

      {/* Table */}
      <Section title="Table" note="Slugs in mono. Row 2 shows hover by mouse; suspended row is muted.">
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow><TableHead>Tenant</TableHead><TableHead>Status</TableHead><TableHead>Sites</TableHead><TableHead>Routing mode</TableHead><TableHead>Data today</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((t) => (
                <TableRow key={t.slug} className={t.status === "Suspended" ? "text-muted-foreground" : ""}>
                  <TableCell>
                    <div className="font-medium">{t.name}</div>
                    <div className="font-mono text-xs text-muted-foreground">{t.slug}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={t.status === "Active" ? tone.success : tone.warning}>
                      {t.status === "Active" ? "✓" : "!"} {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{t.sites}</TableCell>
                  <TableCell>{t.routing}</TableCell>
                  <TableCell>{t.data}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Section>

      {/* Sidebar + Tabs */}
      <Section title="Navigation" note="Left: ShadCN as installed (active item grey). Right: the proposed fix from the component mapping (active item solid blue, as in Penpot).">
        <div className="flex flex-wrap gap-8">
          {[{ label: "As installed", fix: "" }, { label: "With proposed fix", fix: activeFix }].map(({ label, fix }) => (
            <div key={label} className="space-y-2">
              <p className="text-sm font-medium">{label}</p>
              <SidebarProvider className="min-h-0 w-auto">
                <Sidebar collapsible="none" className="h-auto rounded-xl border">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>AuraConnect</SidebarGroupLabel>
                      <SidebarMenu>
                        {nav.map((item) => (
                          <SidebarMenuItem key={item}>
                            <SidebarMenuButton isActive={item === "Tenants"} className={fix}>{item}</SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroup>
                  </SidebarContent>
                </Sidebar>
              </SidebarProvider>
            </div>
          ))}
          <div className="space-y-2">
            <p className="text-sm font-medium">Tabs (as installed)</p>
            <Tabs defaultValue="overview" className="w-96">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="sites">Sites</TabsTrigger>
                <TabsTrigger value="radius">RADIUS</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="pt-4 text-sm text-muted-foreground">Overview content</TabsContent>
              <TabsContent value="sites" className="pt-4 text-sm text-muted-foreground">Sites content</TabsContent>
              <TabsContent value="radius" className="pt-4 text-sm text-muted-foreground">RADIUS content</TabsContent>
            </Tabs>
          </div>
        </div>
      </Section>

      {/* Select + password */}
      <Section title="Select and password input" note="Check: select trigger height matches inputs; the eye button shows and hides the key.">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Routing mode</Label>
            <Select items={routingModes} defaultValue="tenant-shared">
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {routingModes.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Normal</p>
          </div>
          <div className="space-y-2">
            <Label>Routing mode</Label>
            <Select items={routingModes}>
              <SelectTrigger className="w-full" aria-invalid="true"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {routingModes.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
                </SelectGroup>
              </SelectContent>
            </Select>
            <p className="text-xs text-destructive">✕ Choose a routing mode.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="key">SendGrid API key</Label>
            <div className="flex gap-2">
              <Input id="key" type={showKey ? "text" : "password"} defaultValue="SG.abc123secretkey" className="font-mono" />
              <Button variant="ghost" onClick={() => setShowKey(!showKey)}>{showKey ? "Hide" : "Show"}</Button>
            </div>
            <p className="text-xs text-muted-foreground">Leave blank to keep the current key.</p>
          </div>
        </div>
      </Section>

      {/* Table states */}
      <Section title="Table: empty and error" note="Never a blank table: say what is missing and offer the next action, or show the error with Retry.">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader><TableRow><TableHead>MAC</TableHead><TableHead>Site</TableHead><TableHead>Outcome</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={3} className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">No gateway sessions match these filters.</p>
                    <Button variant="outline" size="sm" className="mt-3">Clear filters</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="rounded-xl border bg-card">
            <Table>
              <TableHeader><TableRow><TableHead>MAC</TableHead><TableHead>Site</TableHead><TableHead>Outcome</TableHead></TableRow></TableHeader>
              <TableBody>
                <TableRow className="hover:bg-transparent">
                  <TableCell colSpan={3} className="p-4">
                    <Alert className={tone.error}>
                      <AlertTitle>✕ Couldn&apos;t load gateway sessions</AlertTitle>
                      <AlertDescription className="text-foreground">The server didn&apos;t respond. Try again.</AlertDescription>
                    </Alert>
                    <Button variant="outline" size="sm" className="mt-3">Retry</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Section>

      {/* Clickable cards */}
      <Section title="Clickable cards (filter cards)" note="Proposed interactive variant: hover tint, focus ring (press Tab), selected = primary border + tint, disabled muted.">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "all", n: 5, label: "All tenants" },
            { id: "active", n: 4, label: "Active" },
            { id: "suspended", n: 1, label: "Suspended" },
            { id: "deleted", n: 0, label: "Deleted", disabled: true },
          ].map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={c.disabled}
              onClick={() => setSelectedCard(c.id)}
              className={`rounded-xl border p-5 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${
                selectedCard === c.id ? "border-primary bg-primary/10" : "bg-card hover:border-primary/30 hover:bg-primary/5"
              }`}
            >
              <div className="text-3xl font-bold">{c.n}</div>
              <div className="text-sm text-muted-foreground">{c.label}{selectedCard === c.id ? " ✓" : ""}</div>
            </button>
          ))}
        </div>
      </Section>

      {/* Chart */}
      <Section title="Chart" note="This period is always --chart-1, the previous period --chart-2. Hover for the tooltip.">
        <Card className="max-w-3xl">
          <CardHeader>
            <CardDescription>Sessions · last 7 days</CardDescription>
            <CardTitle className="text-3xl font-bold">9 310</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <LineChart data={sessions} margin={{ left: 8, right: 8 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={40} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line dataKey="previous" stroke="var(--color-previous)" strokeWidth={2} dot={false} />
                <Line dataKey="thisWeek" stroke="var(--color-thisWeek)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Section>

      {/* Dialog */}
      <Section title="Dialog" note="Create tenant. Errors keep the dialog open with an alert at the top and field errors.">
        <div className="flex gap-3">
          <Button onClick={() => { setDialogError(false); setDialogOpen(true); }}>Open Create tenant</Button>
          <Button variant="outline" onClick={() => { setDialogError(true); setDialogOpen(true); }}>Open with error</Button>
        </div>
        <Dialog open={dialogOpen} onOpenChange={(open) => setDialogOpen(open)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create tenant</DialogTitle>
              <DialogDescription>A tenant owns its sites, users and settings.</DialogDescription>
            </DialogHeader>
            {dialogError && (
              <Alert variant="destructive"><AlertTitle>✕ Couldn&apos;t create tenant</AlertTitle><AlertDescription>Fix the problem below and try again.</AlertDescription></Alert>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dn">Name *</Label>
                <Input id="dn" defaultValue={dialogError ? "auraconnect" : ""} aria-invalid={dialogError || undefined} placeholder="e.g. Joburg Theatre" />
                {dialogError && <p className="text-xs text-destructive">✕ A tenant named &quot;auraconnect&quot; already exists.</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds">Slug *</Label>
                <Input id="ds" className="font-mono" placeholder="tenant-slug" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={() => setDialogOpen(false)}>Create tenant</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Section>

      {/* Delete confirm */}
      <Section title="Delete confirm" note="Alert dialog. The solid red button (proposed destructive-solid) stays disabled until the name matches.">
        <Button variant="destructive" onClick={() => { setConfirmName(""); setDeleteOpen(true); }}>Delete tenant</Button>
        <AlertDialog open={deleteOpen} onOpenChange={(open) => setDeleteOpen(open)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete tenant?</AlertDialogTitle>
              <AlertDialogDescription>This removes auraconnect and its 2 sites. This can&apos;t be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2">
              <Label htmlFor="confirm">Type the tenant name to confirm</Label>
              <Input id="confirm" placeholder="auraconnect" value={confirmName} onChange={(e) => setConfirmName(e.target.value)} />
            </div>
            <AlertDialogFooter>
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>Cancel</Button>
              <Button
                disabled={confirmName !== "auraconnect"}
                className="bg-destructive text-white hover:bg-destructive/90"
                onClick={() => { setDeleteOpen(false); toast.success("Tenant deleted"); }}
              >
                Delete tenant
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Section>
    </main>
  );
}
