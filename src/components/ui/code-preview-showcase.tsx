"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import {
  Copy,
  Check,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Terminal,
  Smartphone,
} from "lucide-react";

interface SnippetTab {
  id: string;
  filename: string;
  shortName: string;
  imageSrc: string;
  imageAlt: string;
  code: string;
}

const SNIPPETS: SnippetTab[] = [
  {
    id: "profile",
    filename: "ProfileCard.native.tsx",
    shortName: "ProfileCard.tsx",
    imageSrc: "/showcase/preview-profile.png",
    imageAlt: "Mobile Profile UI Design",
    code: `import { Card, Avatar, Badge, Button, Pill, Stat } from "@mintforge/native";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";

export function UserProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    <Card variant="glass" radius="2xl" style={styles.card}>
      {/* User Header with Neon Emerald Ring */}
      <View style={styles.header}>
        <Avatar
          src="/avatars/eva.jpg"
          size="xl"
          glow="#10b981"
          verified
        />
        <Text style={styles.name}>Eva Jensen</Text>
        <Text style={styles.handle}>@eva_jensen</Text>
        <Badge variant="mint" size="xs">Verified User</Badge>
      </View>

      {/* Bio & Location Tag */}
      <Text style={styles.bio}>
        Creative UI/UX Designer & Mobile Dev | Creating engaging
        experiences | React Native & Expo | SF/LA
      </Text>

      {/* Follower Stats Counters */}
      <View style={styles.statsRow}>
        <Stat label="Followers" value="12.8K" icon="users" />
        <Stat label="Following" value="4.3K" />
        <Stat label="Projects" value="96" />
      </View>

      {/* Touchable Action Buttons */}
      <View style={styles.actionRow}>
        <Button
          variant={following ? "outline" : "primary"}
          glow={!following}
          onPress={() => setFollowing(!following)}
        >
          {following ? "Connected" : "+ Connect"}
        </Button>
        <Button variant="ghost" icon="mail">Message</Button>
      </View>

      {/* Pill Tags */}
      <View style={styles.tagsRow}>
        <Pill variant="subtle">React Native</Pill>
        <Pill variant="subtle">Expo 52</Pill>
        <Pill variant="subtle">UI/UX Design</Pill>
      </View>
    </Card>
  );
}`,
  },
  {
    id: "payment",
    filename: "PaymentSheet.native.tsx",
    shortName: "PaymentSheet.tsx",
    imageSrc: "/showcase/preview-payment.png",
    imageAlt: "Mobile Checkout Payment UI Design",
    code: `import { BottomSheet, Chip, Button, Currency, Badge } from "@mintforge/native";
import { useState } from "react";
import { View, Text } from "react-native";

export function SecureCheckoutSheet() {
  const [method, setMethod] = useState<"apple" | "card">("apple");
  const [paid, setPaid] = useState(false);

  return (
    <BottomSheet snapPoints={["60%"]} rounded="3xl" blur>
      {/* Transaction Details */}
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Badge variant="mint">Secure 256-bit SSL</Badge>
          <Text style={styles.timeRemaining}>04:59</Text>
        </View>

        <Text style={styles.subtitle}>Transfer to Atlas Trading Co.</Text>
        <Currency amount={1250.00} currency="USD" size="2xl" />

        {/* Payment Method Switcher Chips */}
        <View style={styles.chipsRow}>
          <Chip
            selected={method === "apple"}
            icon="apple-pay"
            onPress={() => setMethod("apple")}
          >
            Apple Pay
          </Chip>
          <Chip
            selected={method === "card"}
            icon="credit-card"
            onPress={() => setMethod("card")}
          >
            •••• 7090
          </Chip>
        </View>

        {/* Biometric Slider / Slide to Pay */}
        <Button
          variant="primary"
          glow
          size="lg"
          loading={paid}
          onPress={() => setPaid(true)}
        >
          {paid ? "Processing..." : "Slide to Pay $1,250.00"}
        </Button>
      </View>
    </BottomSheet>
  );
}`,
  },
  {
    id: "activity",
    filename: "ActivityList.native.tsx",
    shortName: "ActivityList.tsx",
    imageSrc: "/showcase/preview-activity.png",
    imageAlt: "Mobile Activity List UI Design",
    code: `import { List, ListItem, Avatar, Badge, SearchBar } from "@mintforge/native";
import { View, Text } from "react-native";
import { useState } from "react";

export function TeamActivityFeed() {
  const [filter, setFilter] = useState("all");

  return (
    <View style={styles.feedContainer}>
      {/* Top Search & Filter Bar */}
      <SearchBar
        placeholder="Search commits, merges, releases..."
        value={filter}
        onChangeText={setFilter}
      />

      {/* Activity Timeline Items */}
      <List variant="separated">
        <ListItem
          avatar={<Avatar src="/team/alex.jpg" status="online" />}
          title="Alex Rivero merged #142"
          subtitle="Added dark mode tokens to @mintforge/core"
          time="2m ago"
          badge={<Badge variant="mint">+240</Badge>}
        />
        <ListItem
          avatar={<Avatar src="/team/sarah.jpg" status="busy" />}
          title="Sarah Chen published v0.1.0"
          subtitle="First public beta release on NPM"
          time="14m ago"
          badge={<Badge variant="cyan">Release</Badge>}
        />
        <ListItem
          avatar={<Avatar src="/team/marcus.jpg" status="away" />}
          title="Marcus Vance created pull request"
          subtitle="Support Expo 52 new architecture Fabric"
          time="1h ago"
        />
      </List>
    </View>
  );
}`,
  },
];

export default function CodePreviewShowcase() {
  const [tabIndex, setTabIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [copied, setCopied] = useState(false);
  const [imageVisible, setImageVisible] = useState(true);

  const activeTab = SNIPPETS[tabIndex];
  const fullCode = activeTab.code;
  const codeBodyRef = useRef<HTMLDivElement>(null);

  // Auto scroll terminal upward as new lines are typed
  useEffect(() => {
    if (codeBodyRef.current) {
      codeBodyRef.current.scrollTop = codeBodyRef.current.scrollHeight;
    }
  }, [charIndex]);

  // Typing animation effect with speed control
  useEffect(() => {
    if (isPaused) return;

    if (charIndex >= fullCode.length) {
      const waitTimer = setTimeout(() => {
        setImageVisible(false);
        setTimeout(() => {
          setTabIndex((prev) => (prev + 1) % SNIPPETS.length);
          setCharIndex(0);
          setImageVisible(true);
        }, 220);
      }, 4200);

      return () => clearTimeout(waitTimer);
    }

    const baseDelay = 18;
    const delay = Math.max(8, baseDelay / speedMultiplier);

    const timer = setTimeout(() => {
      const step = charIndex < 60 ? 2 : 4;
      setCharIndex((prev) => Math.min(fullCode.length, prev + step));
    }, delay);

    return () => clearTimeout(timer);
  }, [charIndex, fullCode.length, isPaused, speedMultiplier]);

  const displayedCode = useMemo(() => {
    return fullCode.slice(0, charIndex);
  }, [fullCode, charIndex]);

  const displayedLines = useMemo(() => {
    return displayedCode.split("\n");
  }, [displayedCode]);

  const activeLineIndex = displayedLines.length - 1;
  const isTyping = charIndex < fullCode.length;
  const progressPercent = Math.round((charIndex / fullCode.length) * 100);

  const manualSelectTab = (idx: number) => {
    if (idx === tabIndex) {
      setCharIndex(0);
      return;
    }
    setImageVisible(false);
    setTimeout(() => {
      setTabIndex(idx);
      setCharIndex(0);
      setImageVisible(true);
    }, 180);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(fullCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", fullCode);
    }
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const tokenizeCode = (codeText: string, activeIdx: number, typing: boolean) => {
    const lines = codeText.split("\n");

    const TOKEN_REGEX =
      /(\/\*[\s\S]*?\*\/|\/\/.*$)|(".*?"|'.*?'|`.*?`)|(\b(?:import|export|from|function|return|const|let|var|useState|default|interface|type)\b)|(\b(?:Card|Avatar|Badge|Button|Pill|Stat|View|Text|StyleSheet|BottomSheet|Chip|Currency|List|ListItem|SearchBar)\b)|(\b(?:variant|size|glow|verified|src|label|value|icon|onPress|style|styles|snapPoints|rounded|blur|amount|currency|selected|placeholder|onChangeText|title|subtitle|time|status|loading)\b(?==))|([{}()[\];,<>&/])/g;

    return lines.map((line, lIdx) => {
      const isCurrentLine = lIdx === activeIdx && typing;

      const highlighted = line.replace(
        TOKEN_REGEX,
        (match, comment, str, kw, comp, prop, punct) => {
          if (comment) return `<span class="mf-syntax-comment">${escapeHtml(comment)}</span>`;
          if (str) return `<span class="mf-syntax-string">${escapeHtml(str)}</span>`;
          if (kw) return `<span class="mf-syntax-keyword">${kw}</span>`;
          if (comp) return `<span class="mf-syntax-component">${comp}</span>`;
          if (prop) return `<span class="mf-syntax-prop">${prop}</span>`;
          if (punct) return `<span class="mf-syntax-punct">${escapeHtml(punct)}</span>`;
          return escapeHtml(match);
        }
      );

      return (
        <span
          key={lIdx}
          className={`mf-code-line ${isCurrentLine ? "mf-active-line" : ""}`}
        >
          <span className="mf-line-number" aria-hidden="true">
            {lIdx + 1}
          </span>
          <span dangerouslySetInnerHTML={{ __html: highlighted || "&nbsp;" }} />
        </span>
      );
    });
  };

  return (
    <section className="mf-showcase-section">
      <div className="mf-container">
        {/* Section Header */}
        <div className="mf-showcase-header">
          <div className="mf-showcase-kicker">
            <Sparkles size={13} />
            <span>INTERACTIVE CODE IDE &amp; VISUAL STUDIO</span>
          </div>
          <h2 className="mf-showcase-title">
            Code streams in real time. <br />
            <span className="mf-hero-gradient-headline">Components build before your eyes.</span>
          </h2>
          <p className="mf-showcase-desc">
            Watch declarative primitives written continuously. Switch between components to see the
            code and the real mobile UI synchronized inside Mintforge Studio.
          </p>
        </div>

        {/* UNIFIED MINTFORGE STUDIO WORKBENCH */}
        <div className="mf-studio-window">
          {/* Top Master Studio Toolbar */}
          <div className="mf-studio-topbar">
            {/* Left: Mac Traffic Lights & Studio Breadcrumb */}
            <div className="mf-studio-topbar-left">
              <div className="mf-window-dots" aria-hidden="true">
                <span className="mf-dot-red" />
                <span className="mf-dot-yellow" />
                <span className="mf-dot-green" />
              </div>
              <div className="mf-studio-breadcrumb">
                <span className="mf-crumb-project">mintforge-studio</span>
                <span className="mf-crumb-slash">/</span>
                <span className="mf-crumb-folder">packages/native</span>
              </div>
            </div>

            {/* Center: File Tabs */}
            <div className="mf-studio-tabs">
              {SNIPPETS.map((snippet, idx) => (
                <button
                  key={snippet.id}
                  type="button"
                  onClick={() => manualSelectTab(idx)}
                  className={`mf-studio-tab ${tabIndex === idx ? "active" : ""}`}
                >
                  <span className="mf-tab-icon">⚛</span>
                  <span className="mf-tab-name">{snippet.shortName}</span>
                </button>
              ))}
            </div>

            {/* Right: Live Compiler Status & Actions */}
            <div className="mf-studio-topbar-right">
              <div className="mf-studio-compiler-pill" title="Next.js Turbopack HMR">
                <span className="mf-status-dot-pulse" />
                <span>HMR: 12ms</span>
              </div>

              <div className="mf-studio-actions">
                <button
                  type="button"
                  onClick={togglePause}
                  className="mf-studio-action-btn"
                  title={isPaused ? "Resume" : "Pause"}
                  aria-label={isPaused ? "Resume" : "Pause"}
                >
                  {isPaused ? <Play size={13} style={{ color: "#10b981" }} /> : <Pause size={13} />}
                </button>

                <button
                  type="button"
                  onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1))}
                  className="mf-studio-action-btn mf-speed-btn"
                  title="Toggle speed"
                  aria-label="Toggle speed"
                >
                  <span>{speedMultiplier}x</span>
                </button>

                <button
                  type="button"
                  onClick={() => manualSelectTab(tabIndex)}
                  className="mf-studio-action-btn"
                  title="Restart stream"
                  aria-label="Restart stream"
                >
                  <RotateCcw size={13} />
                </button>

                <button
                  type="button"
                  onClick={copyCode}
                  className="mf-studio-action-btn"
                  title="Copy code"
                  aria-label="Copy code"
                >
                  {copied ? <Check size={13} style={{ color: "#10b981" }} /> : <Copy size={13} />}
                </button>
              </div>
            </div>
          </div>

          {/* Master Progress Bar */}
          <div className="mf-studio-progress-track">
            <div className="mf-studio-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>

          {/* Studio Stage Body: Split Left Code Editor | Right Framed Simulator */}
          <div className="mf-studio-stage">
            {/* LEFT: Code Editor Pane */}
            <div className="mf-studio-editor-pane">
              <div className="mf-ide-body" ref={codeBodyRef}>
                <pre className="mf-code-pre">
                  <code>{tokenizeCode(displayedCode, activeLineIndex, isTyping)}</code>
                  {isTyping && <span className="mf-cursor-blink" aria-hidden="true">|</span>}
                </pre>
              </div>

              {/* IDE Statusbar */}
              <div className="mf-ide-statusbar">
                <div className="mf-status-left">
                  <span className="mf-status-dot-pulse" />
                  <span className="mf-status-lang">
                    {isTyping ? "Streaming code..." : "✓ Component ready"}
                  </span>
                  <span className="mf-status-sep">•</span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="mf-status-right">
                  <Terminal size={12} />
                  <span>Line {activeLineIndex + 1}</span>
                  <span className="mf-status-sep">•</span>
                  <span>Prettier</span>
                </div>
              </div>
            </div>

            {/* VERTICAL DIVIDER */}
            <div className="mf-studio-divider" aria-hidden="true">
              <div className="mf-divider-handle">⋮</div>
            </div>

            {/* RIGHT: Framed Device Simulator Canvas */}
            <div className="mf-studio-canvas-pane">
              {/* Canvas Header Sub-Bar */}
              <div className="mf-canvas-subbar">
                <div className="mf-canvas-device-info">
                  <Smartphone size={13} style={{ color: "var(--site-accent)" }} />
                  <span>iPhone 16 Pro Simulator</span>
                  <span className="mf-canvas-chip-version">Expo 52</span>
                </div>
                <div className="mf-canvas-scale-badge">
                  <span className="mf-badge-dot-live" />
                  <span>Live Sync</span>
                  <span className="mf-status-sep">•</span>
                  <span>393 × 852</span>
                </div>
              </div>

              {/* Canvas Body with Blueprint Grid & Phone Stage */}
              <div className="mf-canvas-viewport">
                {/* Ambient Radial Glow Behind Device */}
                <div className="mf-canvas-glow-aura" aria-hidden="true" />

                {/* Phone Device Mockup (Pure Image with 3D Elevation & Drop-Shadow) */}
                <div
                  className="mf-phone-stage"
                  onClick={() => manualSelectTab((tabIndex + 1) % SNIPPETS.length)}
                  role="button"
                  tabIndex={0}
                  title="Click phone to cycle next component preview"
                  aria-label="Click phone to cycle next component preview"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      manualSelectTab((tabIndex + 1) % SNIPPETS.length);
                    }
                  }}
                >
                  <div className="mf-phone-image-wrapper">
                    <Image
                      src={activeTab.imageSrc}
                      alt={activeTab.imageAlt}
                      width={310}
                      height={630}
                      style={{ width: "auto", height: "auto" }}
                      className={`mf-phone-mockup-img ${imageVisible ? "mf-phone-img-visible" : "mf-phone-img-hidden"}`}
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Canvas Footer Bar with Component Quick-Switcher Chips */}
              <div className="mf-canvas-footer">
                <div className="mf-canvas-chips">
                  {SNIPPETS.map((snippet, idx) => (
                    <button
                      key={snippet.id}
                      type="button"
                      onClick={() => manualSelectTab(idx)}
                      className={`mf-canvas-chip ${tabIndex === idx ? "active" : ""}`}
                    >
                      <span>{snippet.shortName.replace(".tsx", "")}</span>
                    </button>
                  ))}
                </div>
                <span className="mf-canvas-hint">Click phone to switch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
