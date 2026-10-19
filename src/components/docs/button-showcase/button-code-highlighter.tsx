"use client";

import * as React from "react";

interface Token {
  type:
    | "bracket"
    | "tag"
    | "prop"
    | "string"
    | "keyword"
    | "operator"
    | "number"
    | "comment"
    | "space"
    | "text";
  text: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let remaining = line;

  while (remaining.length > 0) {
    // 1. Comments
    let m = remaining.match(/^(\/\/.*)$/);
    if (m) {
      tokens.push({ type: "comment", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 2. Keywords
    m = remaining.match(
      /^(import|export|function|return|const|let|var|from|if|else|default|interface|type)\b/
    );
    if (m) {
      tokens.push({ type: "keyword", text: m[1] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 3. Booleans and primitives
    m = remaining.match(/^(true|false|null|undefined)\b/);
    if (m) {
      tokens.push({ type: "number", text: m[1] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 4. Closing JSX tag
    m = remaining.match(/^<\/([A-Za-z0-9_.-]+)>/);
    if (m) {
      tokens.push({ type: "bracket", text: "</" });
      tokens.push({ type: "tag", text: m[1] });
      tokens.push({ type: "bracket", text: ">" });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 5. Self-closing or opening tag start
    m = remaining.match(/^<([A-Za-z0-9_.-]+)/);
    if (m) {
      tokens.push({ type: "bracket", text: "<" });
      tokens.push({ type: "tag", text: m[1] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 6. Tag close or self-close
    m = remaining.match(/^(\/?>)/);
    if (m) {
      tokens.push({ type: "bracket", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 7. JSX Prop attribute names
    m = remaining.match(/^([A-Za-z0-9_-]+)=/);
    if (m) {
      tokens.push({ type: "prop", text: m[1] });
      tokens.push({ type: "operator", text: "=" });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 8. Strings in double quotes
    m = remaining.match(/^"([^"\\]|\\.)*"/);
    if (m) {
      tokens.push({ type: "string", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 9. Strings in single quotes
    m = remaining.match(/^'([^'\\]|\\.)*'/);
    if (m) {
      tokens.push({ type: "string", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 10. Template literals
    m = remaining.match(/^`([^`\\]|\\.)*`/);
    if (m) {
      tokens.push({ type: "string", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 11. Curly braces
    m = remaining.match(/^([{}[\]()])/);
    if (m) {
      tokens.push({ type: "bracket", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 12. Whitespace
    m = remaining.match(/^(\s+)/);
    if (m) {
      tokens.push({ type: "space", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // 13. Plain text
    m = remaining.match(/^[^<>{}[\]()"'`=\s/;,]+/);
    if (m) {
      tokens.push({ type: "text", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    tokens.push({ type: "text", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

export function ButtonCodeHighlighter({ code }: { code: string }) {
  const lines = code.trim().split("\n");

  const renderToken = (token: Token, key: number) => {
    switch (token.type) {
      case "bracket":
        return <span key={key} className="text-[#94A3B8]">{token.text}</span>;
      case "tag":
        return <span key={key} className="text-[#F472B6] font-semibold">{token.text}</span>;
      case "prop":
        return <span key={key} className="text-[#38BDF8]">{token.text}</span>;
      case "keyword":
        return <span key={key} className="text-[#C084FC] font-semibold">{token.text}</span>;
      case "string":
        return <span key={key} className="text-[#34D399]">{token.text}</span>;
      case "number":
        return <span key={key} className="text-[#F59E0B]">{token.text}</span>;
      case "operator":
        return <span key={key} className="text-[#38BDF8]">{token.text}</span>;
      case "comment":
        return <span key={key} className="text-[#64748B] italic">{token.text}</span>;
      case "space":
        return <span key={key}>{token.text}</span>;
      case "text":
      default:
        return <span key={key} className="text-[#F8FAFC]">{token.text}</span>;
    }
  };

  return (
    <pre
      style={{
        fontFamily:
          '"Geist Mono", "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: "0.8125rem",
        lineHeight: 1.7,
        letterSpacing: "-0.01em",
        tabSize: 2,
      }}
      className="text-[#E2E8F0] overflow-x-auto select-text scrollbar-thin scrollbar-thumb-slate-700 m-0"
    >
      <code>
        {lines.map((line, lineIdx) => {
          const tokens = tokenizeLine(line);
          return (
            <div
              key={lineIdx}
              className="flex items-start hover:bg-white/[0.04] px-1 py-0.5 rounded transition-colors"
            >
              <span className="w-6 shrink-0 text-right pr-4 text-[#475569] select-none text-[12px] pt-0.5 font-mono">
                {lineIdx + 1}
              </span>
              <span className="whitespace-pre flex-1">
                {tokens.map((token, tokenIdx) => renderToken(token, tokenIdx))}
              </span>
            </div>
          );
        })}
      </code>
    </pre>
  );
}
