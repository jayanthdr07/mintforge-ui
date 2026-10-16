"use client";

import { useState } from "react";
import Link from "next/link";
import "@/styles/docs.css";
import MagicRings from "@/components/ui/magic-rings";
import { useTheme } from "@/components/layout/theme-provider";
import { ComponentCode } from "@/components/docs/component-code";
import { FaGithub } from "react-icons/fa";
import {
  Smartphone,
  Sparkles,
  Zap,
  Check,
  Copy,
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  Palette,
  Sliders,
  Eye,
  EyeOff,
  X,
  ChevronRight,
  Moon,
  Sun,
  Activity,
  CreditCard,
  Bell,
  RefreshCw,
} from "lucide-react";

type PhonePlatform = "ios" | "android";
type PhoneTab = "buttons" | "cards" | "forms" | "sheet";
type CodeTab = "button" | "card" | "badge";

const GITHUB_URL = "https://github.com/rakshithkumar608/mintforge-ui";
const installCommand = "npx mintforge add native/button";

export default function ReactNativePage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Simulator Controls
  const [platform, setPlatform] = useState<PhonePlatform>("ios");
  const [phoneDark, setPhoneDark] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<PhoneTab>("buttons");
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  // Interactive Button State inside Simulator
  const [clickCount, setClickCount] = useState<number>(0);
  const [isLoadingDemo, setIsLoadingDemo] = useState<boolean>(false);
  const [pressedBtn, setPressedBtn] = useState<string | null>(null);

  // Interactive Form State inside Simulator
  const [emailInput, setEmailInput] = useState<string>("alex@mintforge.dev");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [toggleHaptics, setToggleHaptics] = useState<boolean>(true);

  // Code Mirror comparison tab
  const [activeCodeTab, setActiveCodeTab] = useState<CodeTab>("button");
  const [copiedInstall, setCopiedInstall] = useState<boolean>(false);

  const handleSimButtonClick = (id: string) => {
    setPressedBtn(id);
    setTimeout(() => setPressedBtn(null), 150);
    setClickCount((prev) => prev + 1);
  };

  const toggleLoadingState = () => {
    setIsLoadingDemo(true);
    setTimeout(() => setIsLoadingDemo(false), 2000);
  };

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopiedInstall(true);
      setTimeout(() => setCopiedInstall(false), 2000);
    } catch {
      window.prompt("Copy install command:", installCommand);
    }
  };

  const CODE_SNIPPETS: Record<
    CodeTab,
    { web: string; native: string; description: string }
  > = {
    button: {
      description: "Identical variant, size, and loading contracts between Next.js and Expo.",
      web: `// 🌐 Next.js 16 Web (Tailwind v4)
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Action() {
  return (
    <Button 
      variant="default"
      size="md"
      isLoading={false}
      leftIcon={<Sparkles size={16} />}
      onClick={() => console.log("Pressed")}
    >
      Deploy Project
    </Button>
  );
}`,
      native: `// 📱 React Native Expo 52 (NativeWind v4)
import { NativeButton } from "@/components/native/button";
import { Sparkles } from "lucide-react-native";

export function Action() {
  return (
    <NativeButton
      variant="default"
      size="md"
      isLoading={false}
      leftIcon={<Sparkles size={16} />}
      onPress={() => console.log("Pressed")}
    >
      Deploy Project
    </NativeButton>
  );
}`,
    },
    card: {
      description: "Compound card architecture sharing the exact same --mf-surface token scale.",
      web: `// 🌐 Next.js 16 Web (Tailwind v4)
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function MetricTile() {
  return (
    <Card className="hover:border-brand">
      <CardHeader>
        <CardTitle>MRR Growth</CardTitle>
        <Badge variant="success" pulse>+18.4%</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">$42,850</p>
      </CardContent>
    </Card>
  );
}`,
      native: `// 📱 React Native Expo 52 (NativeWind v4)
import { NativeCard, NativeCardHeader, NativeCardTitle, NativeCardContent } from "@/components/native/card";
import { NativeBadge } from "@/components/native/badge";

export function MetricTile() {
  return (
    <NativeCard className="active:border-brand">
      <NativeCardHeader>
        <NativeCardTitle>MRR Growth</NativeCardTitle>
        <NativeBadge variant="success" pulse>+18.4%</NativeBadge>
      </NativeCardHeader>
      <NativeCardContent>
        <Text className="text-3xl font-bold text-foreground">$42,850</Text>
      </NativeCardContent>
    </NativeCard>
  );
}`,
    },
    badge: {
      description: "Semantic status indicators with animated pulse dots for live status.",
      web: `// 🌐 Next.js 16 Web (Tailwind v4)
import { Badge } from "@/components/ui/badge";

export function StatusPills() {
  return (
    <div className="flex gap-2">
      <Badge variant="success" pulse>Connected</Badge>
      <Badge variant="warning">Syncing</Badge>
    </div>
  );
}`,
      native: `// 📱 React Native Expo 52 (NativeWind v4)
import { NativeBadge } from "@/components/native/badge";
import { View } from "react-native";

export function StatusPills() {
  return (
    <View className="flex-row gap-2">
      <NativeBadge variant="success" pulse>Connected</NativeBadge>
      <NativeBadge variant="warning">Syncing</NativeBadge>
    </View>
  );
}`,
    },
  };

  return (
    <div className="mf-site">
      {/* Centered Hero Section with React Bits MagicRings Background */}
      <section className="mf-hero-centered">
        {/* MagicRings WebGL Ambient Canvas */}
        <div className="mf-hero-rings-wrap" aria-hidden="true">
          <MagicRings
            color={isDark ? "#10b981" : "#059669"}
            colorTwo={isDark ? "#6366f1" : "#4f46e5"}
            motion="pulse"
            ringCount={6}
            speed={0.9}
            lineThickness={2.2}
            glow={1.2}
            hoverScale={1.15}
            clickBurst={true}
            theme={isDark ? "dark" : "light"}
          />
        </div>

        <div className="mf-container mf-hero-centered-content">
          {/* Eyebrow Badge Pill */}
          <div className="mf-hero-badge-pill mf-fade-up">
            <span className="mf-status-dot" />
            <span>Universal React Native</span>
            <span className="mf-badge-divider" />
            <span className="mf-badge-tag">Expo 52 + NativeWind v4</span>
          </div>

          {/* Large Animated Headline */}
          <h1 className="mf-hero-title-large mf-fade-up">
            Native performance. <br />
            <span className="mf-hero-gradient-headline">Universal precision.</span>
          </h1>

          {/* Subtitle Description */}
          <p className="mf-hero-subtitle-large mf-fade-up">
            Mintforge Native brings copy-paste component ownership to React Native and Expo. The same <strong>--mf-*</strong> design tokens, symmetric prop APIs, and zero styling fragmentation between iOS, Android, and Web.
          </p>

          {/* CTA Buttons & Interactive Command Pill */}
          <div className="mf-hero-cta-group mf-fade-up">
            <a href="#simulator" className="mf-hero-primary-cta">
              <Smartphone size={16} />
              <span>Try Phone Simulator</span>
              <ArrowRight size={15} />
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-hero-secondary-cta"
            >
              <FaGithub size={17} />
              <span>Star on GitHub</span>
              <ArrowUpRight size={14} />
            </a>

            <button
              type="button"
              onClick={handleCopyInstall}
              className="mf-hero-cmd-pill"
              title="Click to copy install command"
            >
              <span className="mf-cmd-prompt">$</span>
              <span>{installCommand}</span>
              {copiedInstall ? (
                <Check size={14} style={{ color: "var(--site-accent)" }} />
              ) : (
                <Copy size={14} style={{ color: "var(--site-muted)" }} />
              )}
            </button>
          </div>

          {/* Value Highlights */}
          <div className="mf-hero-highlights mf-fade-up">
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> NativeWind v4 Engine
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> Reanimated 3 Spring Physics
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> Expo 52 Universal Parity
            </span>
            <span className="mf-highlight-item">
              <span className="mf-highlight-check">✓</span> WCAG AAA Touch Standards
            </span>
          </div>
        </div>
      </section>

      {/* Simulator Section */}
      <section id="simulator" className="max-w-6xl mx-auto px-4 py-12 scroll-mt-24">
        <div className="p-6 sm:p-10 rounded-3xl border border-border bg-card shadow-2xl">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-subtle text-brand text-[11px] font-bold border border-brand/20">
                  Interactive Preview
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  Running React Native NativeWind Primitives
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                Live Mobile Device Simulator
              </h2>
            </div>

            {/* Platform & Theme Controls Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Platform Switcher */}
              <div className="inline-flex p-1 bg-surface-secondary border border-border rounded-xl">
                <button
                  onClick={() => setPlatform("ios")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    platform === "ios"
                      ? "bg-card text-foreground shadow-sm border border-border font-extrabold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  iOS (iPhone)
                </button>
                <button
                  onClick={() => setPlatform("android")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    platform === "android"
                      ? "bg-card text-foreground shadow-sm border border-border font-extrabold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Android (Pixel)
                </button>
              </div>

              {/* Phone Theme Switcher */}
              <button
                onClick={() => setPhoneDark(!phoneDark)}
                className="p-2.5 rounded-xl border border-border bg-surface-secondary text-foreground hover:bg-card transition-all cursor-pointer shadow-sm"
                aria-label="Toggle Phone Dark/Light Mode"
                title="Toggle Phone Dark/Light Mode"
              >
                {phoneDark ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>

          {/* Simulator Body: Phone Frame + Explanations */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Phone Mockup Column */}
            <div className="lg:col-span-5 flex justify-center">
              {/* Outer Phone Mockup Frame */}
              <div
                className={`relative w-[320px] sm:w-[340px] h-[640px] rounded-[50px] p-3 shadow-2xl transition-all duration-300 border-[6px] ${
                  platform === "ios"
                    ? "border-[#2b2b2e] bg-[#141416]"
                    : "border-[#383a3f] bg-[#1f2024] rounded-[38px]"
                }`}
              >
                {/* Volume & Power Button Silhouettes on Frame */}
                {platform === "ios" && (
                  <>
                    <div className="absolute -left-[10px] top-[115px] w-[4px] h-[26px] bg-[#2b2b2e] rounded-l-sm" />
                    <div className="absolute -left-[10px] top-[155px] w-[4px] h-[48px] bg-[#2b2b2e] rounded-l-sm" />
                    <div className="absolute -left-[10px] top-[215px] w-[4px] h-[48px] bg-[#2b2b2e] rounded-l-sm" />
                    <div className="absolute -right-[10px] top-[160px] w-[4px] h-[65px] bg-[#2b2b2e] rounded-r-sm" />
                  </>
                )}

                {/* Inner Phone Screen */}
                <div
                  className={`relative w-full h-full rounded-[40px] overflow-hidden flex flex-col justify-between select-none transition-colors duration-200 ${
                    phoneDark
                      ? "bg-[#09100d] text-[#f2faf6]"
                      : "bg-[#fafcfb] text-[#0d1a16]"
                  }`}
                >
                  {/* Status Bar */}
                  <div className="h-9 px-6 pt-2 flex items-center justify-between text-[11px] font-semibold shrink-0 z-20">
                    <span className="font-mono">9:41</span>
                    {/* Dynamic Island / Camera Notch */}
                    {platform === "ios" ? (
                      <div className="w-24 h-5 rounded-full bg-black flex items-center justify-end px-2 gap-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      </div>
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-black shadow-inner" />
                    )}
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-mono">5G</span>
                      <div className="w-5 h-2.5 rounded-[3px] border border-current p-[1px] flex items-center">
                        <div className="w-full h-full bg-current rounded-[1px]" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile App Header */}
                  <div className="px-4 py-2 flex items-center justify-between border-b border-white/10 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                        M
                      </div>
                      <span className="text-xs font-bold tracking-tight">Mintforge Mobile</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setPhoneDark(!phoneDark)}
                        className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground transition-colors cursor-pointer"
                        aria-label="Toggle Phone Screen Theme"
                      >
                        {phoneDark ? <Sun size={12} /> : <Moon size={12} />}
                      </button>
                      <div className="relative">
                        <Bell size={13} className="text-muted-foreground" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Simulator Screen Content Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Simulator Segmented Tabs */}
                    <div className="flex p-1 rounded-xl bg-black/10 dark:bg-white/5 border border-white/10">
                      {(["buttons", "cards", "forms", "sheet"] as PhoneTab[]).map((t) => (
                        <button
                          key={t}
                          onClick={() => {
                            setActiveTab(t);
                            if (t === "sheet") setShowBottomSheet(true);
                          }}
                          className={`flex-1 py-1.5 text-[10px] font-bold rounded-lg capitalize transition-all cursor-pointer ${
                            activeTab === t
                              ? "bg-emerald-500 text-white shadow-sm"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>

                    {/* TAB 1: Buttons & Actions */}
                    {activeTab === "buttons" && (
                      <div className="space-y-3">
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          Native Button Primitives
                        </div>

                        {/* Primary Button */}
                        <button
                          onClick={() => handleSimButtonClick("primary")}
                          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-transform duration-100 shadow-md ${
                            pressedBtn === "primary" ? "scale-95" : "scale-100"
                          } ${
                            isLoadingDemo
                              ? "bg-emerald-600/70 text-white cursor-not-allowed"
                              : "bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer active:opacity-90"
                          }`}
                        >
                          {isLoadingDemo ? (
                            <RefreshCw size={14} className="animate-spin text-white" />
                          ) : (
                            <Sparkles size={14} />
                          )}
                          <span>
                            {isLoadingDemo
                              ? "Deploying..."
                              : `Deploy Mobile Build (${clickCount})`}
                          </span>
                        </button>

                        {/* Secondary Button */}
                        <button
                          onClick={() => handleSimButtonClick("secondary")}
                          className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs border border-white/20 flex items-center justify-center gap-2 transition-transform duration-100 cursor-pointer ${
                            pressedBtn === "secondary" ? "scale-95" : "scale-100"
                          } ${
                            phoneDark
                              ? "bg-[#14221c] text-white hover:bg-[#1b2d26]"
                              : "bg-[#f3f7f5] text-[#0d1a16] hover:bg-[#e7f0ec]"
                          }`}
                        >
                          <span>Sync Cloud Store</span>
                          <ArrowRight size={13} />
                        </button>

                        {/* Outline Button */}
                        <button
                          onClick={() => handleSimButtonClick("outline")}
                          className={`w-full py-2 px-4 rounded-xl font-semibold text-xs border border-white/20 bg-transparent flex items-center justify-center gap-2 transition-transform duration-100 cursor-pointer ${
                            pressedBtn === "outline" ? "scale-95" : "scale-100"
                          }`}
                        >
                          <span>View Logs</span>
                        </button>

                        {/* Test Loading State Button */}
                        <button
                          onClick={toggleLoadingState}
                          className="w-full py-2 px-3 rounded-xl text-[10px] font-bold border border-dashed border-emerald-500/40 text-emerald-500 hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Activity size={12} />
                          <span>Trigger Reanimated Spinner</span>
                        </button>
                      </div>
                    )}

                    {/* TAB 2: Cards & KPI */}
                    {activeTab === "cards" && (
                      <div className="space-y-3">
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          NativeCard Compound Primitives
                        </div>

                        {/* Metric Card */}
                        <div
                          className={`p-4 rounded-2xl border transition-all ${
                            phoneDark
                              ? "bg-[#14221c] border-white/10"
                              : "bg-white border-[#e3ebe7] shadow-sm"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[11px] text-muted-foreground">Monthly ARR</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center gap-1">
                              <TrendingUp size={10} /> +24.8%
                            </span>
                          </div>
                          <div className="text-2xl font-extrabold tracking-tight mb-2">
                            $128,400
                          </div>
                          <div className="text-[10px] text-muted-foreground">
                            1,482 active mobile subscribers
                          </div>
                        </div>

                        {/* Quick Activity Row */}
                        <div
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            phoneDark
                              ? "bg-[#14221c]/60 border-white/10"
                              : "bg-white border-[#e3ebe7]"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                              <CreditCard size={14} />
                            </div>
                            <div>
                              <div className="text-[11px] font-bold">Stripe Payment</div>
                              <div className="text-[9px] text-muted-foreground">Just now</div>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-500 font-mono">+$240</span>
                        </div>
                      </div>
                    )}

                    {/* TAB 3: Forms & Inputs */}
                    {activeTab === "forms" && (
                      <div className="space-y-3">
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          NativeInput & Controls
                        </div>

                        {/* Email Input */}
                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground mb-1">
                            Team Email
                          </label>
                          <div
                            className={`flex items-center px-3 py-2 rounded-xl border ${
                              phoneDark
                                ? "bg-[#14221c] border-white/10"
                                : "bg-white border-[#e3ebe7]"
                            }`}
                          >
                            <input
                              type="text"
                              value={emailInput}
                              onChange={(e) => setEmailInput(e.target.value)}
                              className="w-full bg-transparent text-xs outline-none text-current"
                            />
                            {emailInput && (
                              <button
                                onClick={() => setEmailInput("")}
                                className="text-muted-foreground hover:text-foreground cursor-pointer"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Password Input */}
                        <div>
                          <label className="block text-[10px] font-bold text-muted-foreground mb-1">
                            API Secret
                          </label>
                          <div
                            className={`flex items-center px-3 py-2 rounded-xl border ${
                              phoneDark
                                ? "bg-[#14221c] border-white/10"
                                : "bg-white border-[#e3ebe7]"
                            }`}
                          >
                            <input
                              type={showPassword ? "text" : "password"}
                              defaultValue="sk_live_mintforge_9981"
                              className="w-full bg-transparent text-xs outline-none font-mono text-current"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="text-muted-foreground hover:text-foreground cursor-pointer"
                            >
                              {showPassword ? <EyeOff size={12} /> : <Eye size={12} />}
                            </button>
                          </div>
                        </div>

                        {/* Native Switch Row */}
                        <div
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            phoneDark
                              ? "bg-[#14221c] border-white/10"
                              : "bg-white border-[#e3ebe7]"
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold">Native Haptics</div>
                            <div className="text-[10px] text-muted-foreground">
                              Trigger expo-haptics on touch
                            </div>
                          </div>

                          {/* Interactive Animated Toggle */}
                          <button
                            onClick={() => setToggleHaptics(!toggleHaptics)}
                            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                              toggleHaptics ? "bg-emerald-500" : "bg-gray-400 dark:bg-gray-700"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 absolute top-1 ${
                                toggleHaptics ? "left-6" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB 4: Bottom Sheet Demo */}
                    {activeTab === "sheet" && (
                      <div className="space-y-3 text-center py-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                          <Sliders size={18} />
                        </div>
                        <h4 className="text-xs font-bold">BottomSheet Gesture Drawer</h4>
                        <p className="text-[10px] text-muted-foreground max-w-[200px] mx-auto">
                          Built with Reanimated 3 pan gestures and spring physics.
                        </p>
                        <button
                          onClick={() => setShowBottomSheet(true)}
                          className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-bold text-xs shadow-sm cursor-pointer"
                        >
                          Slide Up Sheet
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Simulated Reanimated Bottom Sheet Overlay */}
                  {showBottomSheet && (
                    <div className="absolute inset-0 z-30 flex flex-col justify-end bg-black/60 backdrop-blur-xs">
                      <div
                        className={`p-4 rounded-t-3xl border-t shadow-2xl space-y-3 ${
                          phoneDark
                            ? "bg-[#14221c] border-white/10 text-white"
                            : "bg-white border-[#e3ebe7] text-[#0d1a16]"
                        }`}
                      >
                        {/* Drag Handle Pill */}
                        <div className="w-8 h-1 rounded-full bg-current opacity-30 mx-auto" />

                        <div className="flex justify-between items-center">
                          <h4 className="text-xs font-bold">Confirm Transaction</h4>
                          <button
                            onClick={() => setShowBottomSheet(false)}
                            className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            <X size={14} />
                          </button>
                        </div>

                        <p className="text-[10px] text-muted-foreground">
                          Swipe down gesture or tap confirm to finish action.
                        </p>

                        <div className="pt-2 flex gap-2">
                          <button
                            onClick={() => setShowBottomSheet(false)}
                            className="flex-1 py-2 rounded-xl font-bold text-xs bg-emerald-500 text-white cursor-pointer"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setShowBottomSheet(false)}
                            className="py-2 px-3 rounded-xl text-xs border border-white/20 cursor-pointer"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Home Bar / Gesture Indicator */}
                  <div className="h-6 flex items-center justify-center shrink-0">
                    <div
                      className={`h-1 rounded-full ${
                        platform === "ios" ? "w-28 bg-current opacity-30" : "w-16 bg-current opacity-20"
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Simulator Explanation Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                  Universal Design Language
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
                  One Token System. Zero Compromises.
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Mintforge components on mobile aren&apos;t just approximations—they use the exact same design tokens, font hierarchy, and color calculations defined in your web application.
                </p>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2.5">
                    <Zap size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">NativeWind v4</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Zero-runtime Tailwind CSS engine compiling directly to native StyleSheet objects.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2.5">
                    <Sliders size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">Reanimated Springs</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Smooth 60/120 FPS gesture interactions that feel completely native to iOS and Android.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-2.5">
                    <Palette size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">Unified Tokens</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Same --mf-brand, --mf-surface, and corner radii shared across all client platforms.
                  </p>
                </div>

                <div className="p-4 rounded-2xl border border-border bg-card shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2.5">
                    <ShieldCheck size={18} />
                  </div>
                  <h4 className="text-xs font-bold text-foreground mb-1">Accessible Touches</h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    WCAG touch target compliance (min 44x44px) and native screen reader accessibility labels.
                  </p>
                </div>
              </div>

              {/* Quick CLI Box */}
              <div className="p-4 rounded-2xl border border-brand/30 bg-brand-subtle/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="text-xs font-bold text-foreground">Add to Existing Expo Project</div>
                  <div className="text-[11px] text-muted-foreground">Scaffolds NativeButton directly into src/components/native</div>
                </div>
                <Link
                  href="/docs/installation"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-brand text-brand-foreground hover:bg-brand-hover transition-colors shrink-0 shadow-sm"
                >
                  <span>Expo Guide</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Code Mirror */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-brand uppercase tracking-wider">
            Symmetric Developer Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
            Side-by-Side Code Mirror
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Switch tabs below to see how identical the component APIs and props are between Next.js Web and React Native Expo:
          </p>
        </div>

        {/* Code Selector Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {(["button", "card", "badge"] as CodeTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCodeTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize border ${
                activeCodeTab === tab
                  ? "bg-brand text-brand-foreground border-brand shadow-sm"
                  : "bg-card border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab} Primitive
            </button>
          ))}
        </div>

        {/* Side-by-Side Code Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left: Next.js Web */}
          <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="p-3 bg-surface-secondary border-b border-border flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                Next.js 16 Web (Tailwind v4)
              </span>
              <span className="text-[10px] text-muted-foreground font-mono">React 19</span>
            </div>
            <div className="p-3 flex-1">
              <ComponentCode
                code={CODE_SNIPPETS[activeCodeTab].web}
                language="tsx"
                showLineNumbers
              />
            </div>
          </div>

          {/* Right: React Native Expo */}
          <div className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
            <div className="p-3 bg-surface-secondary border-b border-border flex items-center justify-between">
              <span className="text-xs font-bold text-brand flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                React Native (Expo 52 + NativeWind)
              </span>
              <span className="text-[10px] text-brand font-mono font-bold">Universal</span>
            </div>
            <div className="p-3 flex-1">
              <ComponentCode
                code={CODE_SNIPPETS[activeCodeTab].native}
                language="tsx"
                showLineNumbers
              />
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4 italic">
          {CODE_SNIPPETS[activeCodeTab].description}
        </p>
      </section>

      {/* 3-Step Expo Setup Guide */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="p-8 sm:p-10 rounded-3xl border border-border bg-card shadow-xl">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold text-brand uppercase tracking-wider">
              Quickstart
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-1">
              Set Up in Any Expo App in 3 Minutes
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Everything you need to configure NativeWind v4 and start adding universal components:
            </p>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-brand-subtle text-brand font-bold text-xs flex items-center justify-center border border-brand/20">
                  1
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  Install Expo Peer Dependencies
                </h4>
              </div>
              <ComponentCode
                packageManagerTabs
                commands={{
                  pnpm: "pnpm add react-native-reanimated expo-haptics nativewind@next",
                  npm: "npx expo install react-native-reanimated expo-haptics nativewind@next",
                  yarn: "yarn add react-native-reanimated expo-haptics nativewind@next",
                  bun: "bun add react-native-reanimated expo-haptics nativewind@next",
                }}
              />
            </div>

            {/* Step 2 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-brand-subtle text-brand font-bold text-xs flex items-center justify-center border border-brand/20">
                  2
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  Initialize Mintforge Native
                </h4>
              </div>
              <ComponentCode
                code="npx mintforge@latest init --platform expo"
                language="bash"
              />
            </div>

            {/* Step 3 */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-brand-subtle text-brand font-bold text-xs flex items-center justify-center border border-brand/20">
                  3
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-foreground">
                  Add Mobile Primitives to Your Project
                </h4>
              </div>
              <ComponentCode
                code="npx mintforge@latest add native/button native/card native/badge"
                language="bash"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="p-8 sm:p-12 rounded-3xl border border-brand/30 bg-brand-subtle/20 flex flex-col items-center shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-brand text-brand-foreground flex items-center justify-center mb-4 shadow-md">
            <Smartphone size={24} />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2 tracking-tight">
            Build Consistent. Ship Everywhere.
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
            Explore our comprehensive web and mobile components in the catalog or read our step-by-step guides.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/docs/components"
              className="px-6 py-3 rounded-xl bg-brand text-brand-foreground font-bold text-xs shadow-md hover:bg-brand-hover transition-colors"
            >
              Browse All Components &rarr;
            </Link>
            <Link
              href="/docs/installation"
              className="px-6 py-3 rounded-xl bg-card border border-border text-foreground font-semibold text-xs hover:bg-surface-secondary transition-colors"
            >
              Installation Docs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
