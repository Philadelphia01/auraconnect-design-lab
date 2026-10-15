"use client";

// AuraConnect design lab · Captive portal (guest) preview
// The .guest wrapper switches --primary to lime and --secondary to navy (globals.css).
// Click through: login -> code -> wrong code -> online.

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

type Step = "terms" | "login" | "code" | "online";

export default function GuestPage() {
  const [step, setStep] = useState<Step>("terms");
  const [agreed, setAgreed] = useState(false);
  const [code, setCode] = useState("");
  const [wrong, setWrong] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);

  function verify() {
    if (code === "123456") { setWrong(false); setStep("online"); }
    else setWrong(true);
  }

  return (
    <div className="guest min-h-screen bg-secondary text-secondary-foreground">
      {/* Brand header */}
      <header className="bg-primary px-4 pb-10 pt-4 text-primary-foreground">
        <div className="mx-auto max-w-md space-y-6">
          <div className="flex items-center justify-between rounded-full bg-white/70 px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground font-bold text-primary">A</span>
              <span className="text-sm font-semibold">AuraConnect</span>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">Free WiFi</span>
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-bold">Dev AuraConnect WiFi Platform</h1>
            <p className="text-sm">Fibre service provided by AuraConnect</p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-md space-y-4 px-4 py-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide opacity-80">
          {step === "online" ? "You're connected" : step === "code" ? "Verify your phone" : "Get started"}
        </p>

        {step === "terms" && (
          <div className="space-y-4 rounded-2xl bg-card p-4 text-card-foreground">
            <div className="flex items-start gap-3">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(v === true)} className="mt-1" />
              <Label htmlFor="terms" className="text-base font-normal">I agree to the terms and conditions for use of this service.</Label>
            </div>
            <Button size="lg" className="h-12 w-full rounded-full text-base" disabled={!agreed} onClick={() => setStep("login")}>
              Accept and connect
            </Button>
            <p className="text-xs text-muted-foreground">The button turns on once the box is ticked.</p>
          </div>
        )}

        {step === "login" && (
          <>
            <div className="space-y-3 rounded-2xl bg-card p-4 text-center text-card-foreground">
              <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">Promotion</span>
              <div>
                <p className="font-semibold">Connect for free</p>
                <p className="text-sm text-muted-foreground">24 hrs · 1.5 GB</p>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl bg-card p-4 text-card-foreground">
              <p className="font-semibold">Log in with your phone and name</p>
              {sendFailed && (
                <p className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  ✕ Couldn&apos;t send a code. Try again.
                </p>
              )}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="flex gap-2">
                  <span className="flex h-12 items-center rounded-md border border-input bg-background px-3 text-base">+27</span>
                  <Input id="phone" placeholder="76 123 4567" className="h-12 text-base" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="first">First name</Label>
                <Input id="first" placeholder="First name" className="h-12 text-base" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last">Last name</Label>
                <Input id="last" placeholder="Last name" className="h-12 text-base" />
              </div>
              <Button size="lg" className="h-12 w-full rounded-full text-base" onClick={() => { setSendFailed(false); setStep("code"); }}>
                Send verification code
              </Button>
              <Button variant="link" className="w-full" onClick={() => setSendFailed(true)}>
                (Preview: show send failure)
              </Button>
            </div>
          </>
        )}

        {step === "code" && (
          <div className="space-y-4 rounded-2xl bg-card p-4 text-center text-card-foreground">
            <div>
              <p className="text-lg font-semibold">Enter your code</p>
              <p className="text-sm text-muted-foreground">We sent a 6-digit code to +27 76 *** 6134</p>
              <Button variant="link" size="sm" onClick={() => setStep("login")}>Change number</Button>
            </div>
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={code} onChange={(v) => { setCode(v); setWrong(false); }}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} className={`h-14 w-12 text-xl ${wrong ? "border-destructive" : ""}`} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            {wrong && <p className="text-sm text-destructive">✕ That code didn&apos;t work. Check the SMS or resend.</p>}
            <Button size="lg" className="h-12 w-full rounded-full text-base" disabled={code.length < 6} onClick={verify}>
              Verify
            </Button>
            <p className="text-sm text-muted-foreground">Didn&apos;t get it? Resend in 0:30 · (Preview: 123456 is correct)</p>
          </div>
        )}

        {step === "online" && (
          <div className="space-y-4 rounded-2xl bg-card p-4 text-card-foreground">
            <div className="text-center">
              <span className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-success/10 text-xl text-success">✓</span>
              <p className="text-lg font-semibold">You&apos;re online</p>
              <p className="text-sm text-muted-foreground">Enjoy your free WiFi.</p>
            </div>
            {[["Time left", "23 h 59 min"], ["Data left", "1.5 GB of 1.5 GB"]].map(([label, value]) => (
              <div key={label} className="space-y-1">
                <div className="flex justify-between text-sm"><span className="text-muted-foreground">{label}</span><span className="font-semibold">{value}</span></div>
                <div className="h-1.5 rounded-full bg-secondary" />
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-full" onClick={() => { setStep("terms"); setAgreed(false); setCode(""); }}>
              Start again
            </Button>
          </div>
        )}

        <div className="rounded-2xl border border-white/25 bg-white/10 p-6 text-center">
          <p className="font-semibold">Video ad</p>
          <p className="text-xs opacity-80">Plays here after sign-in starts</p>
        </div>

        <p className="text-center text-sm"><Link href="/" className="underline">← Back to admin preview</Link></p>
      </main>
    </div>
  );
}
