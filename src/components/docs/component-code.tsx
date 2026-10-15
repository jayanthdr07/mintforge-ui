"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export function ComponentCode({ code, language = "tsx" }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy code:", code);
    }
  };

  return (
    <div className="relative group w-full bg-[var(--site-code-bg,#10211e)] rounded-b-[var(--mf-radius-lg)] overflow-hidden">
      <button
        onClick={handleCopy}
        aria-label="Copy code to clipboard"
        className="absolute right-3 top-3 z-10 p-1.5 rounded-md text-emerald-400 bg-white/10 hover:bg-white/20 transition-all opacity-80 group-hover:opacity-100 cursor-pointer"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>

      <pre data-language={language} className="p-4 overflow-x-auto text-xs font-mono leading-relaxed text-[var(--site-code-text,#d8f7e9)]">
        <code>{code}</code>
      </pre>
    </div>
  );
}
