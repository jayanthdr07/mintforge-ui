"use client";

import { useState } from "react";
import { Check, Copy, FileCode, Terminal } from "lucide-react";
import { highlightCodeLine } from "./code-highlighter";

type PackageManager = "pnpm" | "npm" | "yarn" | "bun";

export interface ComponentCodeProps {
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  packageManagerTabs?: boolean;
  commands?: {
    pnpm?: string;
    npm?: string;
    yarn?: string;
    bun?: string;
  };
}

export function ComponentCode({
  code = "",
  language = "tsx",
  filename,
  showLineNumbers = false,
  packageManagerTabs = false,
  commands,
}: ComponentCodeProps) {
  const [selectedPm, setSelectedPm] = useState<PackageManager>("pnpm");
  const [copied, setCopied] = useState(false);

  const activeCode = packageManagerTabs && commands
    ? commands[selectedPm] || code
    : code;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", activeCode);
    }
  };

  const lines = activeCode.trim().split("\n");
  const codeLang = packageManagerTabs ? "bash" : language;

  return (
    <div className="mf-docs-code-container">
      {/* Header Bar */}
      <div className="mf-docs-code-header">
        {packageManagerTabs ? (
          <div className="mf-docs-code-tabs">
            <span className="text-muted-foreground mr-1 flex items-center">
              <Terminal size={13} />
            </span>
            {(["pnpm", "npm", "yarn", "bun"] as PackageManager[]).map((pm) => (
              <button
                key={pm}
                type="button"
                onClick={() => setSelectedPm(pm)}
                className={`mf-docs-tab-btn ${selectedPm === pm ? "active" : ""}`}
              >
                {pm}
              </button>
            ))}
          </div>
        ) : filename ? (
          <div className="flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground">
            <FileCode size={13} className="text-muted-foreground" />
            <span>{filename}</span>
          </div>
        ) : (
          <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
            {language}
          </span>
        )}

        <button
          onClick={handleCopy}
          aria-label="Copy code to clipboard"
          className="mf-docs-copy-btn"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>

      {/* Body with Syntax Highlighting */}
      {showLineNumbers ? (
        <div className="mf-docs-code-numbered">
          <div className="mf-docs-line-gutter">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>
          <div className="mf-docs-line-content">
            <code>
              {lines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {highlightCodeLine(line, codeLang)}
                </div>
              ))}
            </code>
          </div>
        </div>
      ) : (
        <pre className="mf-docs-code-body">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {highlightCodeLine(line, codeLang)}
              </div>
            ))}
          </code>
        </pre>
      )}
    </div>
  );
}
