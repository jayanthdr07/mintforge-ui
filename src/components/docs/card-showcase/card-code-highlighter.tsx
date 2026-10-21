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

    // 3. String literals (double quote, single quote, template literal)
    m = remaining.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`)/);
    if (m) {
      tokens.push({ type: "string", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 4. Numbers
    m = remaining.match(/^\b(\d+)\b/);
    if (m) {
      tokens.push({ type: "number", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 5. JSX Closing or Self-closing Tag
    m = remaining.match(/^(<\/?[A-Z][A-Za-z0-9_]*)/);
    if (m) {
      tokens.push({ type: "tag", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 6. JSX Closing Bracket
    m = remaining.match(/^(\/?>)/);
    if (m) {
      tokens.push({ type: "tag", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 7. Props in JSX
    m = remaining.match(/^([a-zA-Z0-9_\-]+)(?==)/);
    if (m) {
      tokens.push({ type: "prop", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 8. Operators and Brackets
    m = remaining.match(/^([{}()=><+\-*\/&|!?:;,])/);
    if (m) {
      tokens.push({ type: "bracket", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 9. Whitespace
    m = remaining.match(/^(\s+)/);
    if (m) {
      tokens.push({ type: "space", text: m[1] });
      remaining = remaining.slice(m[1].length);
      continue;
    }

    // 10. Fallback plain text / identifier
    m = remaining.match(/^[^\s"'{}(),=><+\-*\/&|!?:;]+/);
    if (m) {
      tokens.push({ type: "text", text: m[0] });
      remaining = remaining.slice(m[0].length);
      continue;
    }

    // Single character advance
    tokens.push({ type: "text", text: remaining[0] });
    remaining = remaining.slice(1);
  }

  return tokens;
}

function renderToken(token: Token, key: number) {
  switch (token.type) {
    case "comment":
      return (
        <span key={key} className="text-[#64748B] italic">
          {token.text}
        </span>
      );
    case "keyword":
      return (
        <span key={key} className="text-[#818CF8] font-semibold">
          {token.text}
        </span>
      );
    case "string":
      return (
        <span key={key} className="text-[#34D399]">
          {token.text}
        </span>
      );
    case "tag":
      return (
        <span key={key} className="text-[#60A5FA] font-medium">
          {token.text}
        </span>
      );
    case "prop":
      return (
        <span key={key} className="text-[#FBBF24]">
          {token.text}
        </span>
      );
    case "number":
      return (
        <span key={key} className="text-[#F472B6]">
          {token.text}
        </span>
      );
    case "bracket":
      return (
        <span key={key} className="text-[#94A3B8]">
          {token.text}
        </span>
      );
    case "space":
      return <span key={key}>{token.text}</span>;
    case "text":
    default:
      return (
        <span key={key} className="text-[#E2E8F0]">
          {token.text}
        </span>
      );
  }
}

export function CardCodeHighlighter({
  code,
  className = "",
  showLineNumbers = true,
}: {
  code: string;
  className?: string;
  showLineNumbers?: boolean;
}) {
  const lines = React.useMemo(() => {
    return code.trim().split("\n");
  }, [code]);

  return (
    <pre
      tabIndex={0}
      className={`font-mono text-xs leading-relaxed overflow-x-auto select-text focus:outline-none ${className}`}
    >
      <code>
        {lines.map((line, lineIdx) => {
          const tokens = tokenizeLine(line);
          return (
            <div key={lineIdx} className="table-row">
              {showLineNumbers && (
                <span className="table-cell text-right pr-4 select-none text-[#475569] text-[11px] w-8">
                  {lineIdx + 1}
                </span>
              )}
              <span className="table-cell whitespace-pre">
                {tokens.map((t, tIdx) => renderToken(t, tIdx))}
              </span>
            </div>
          );
        })}
      </code>
    </pre>
  );
}
