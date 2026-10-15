import React from "react";

export function highlightCodeLine(line: string, language: string = "tsx"): React.ReactNode[] {
  if (!line) return [" "];

  const trimmed = line.trim();

  // Full line comment
  if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("*") || (language === "bash" && trimmed.startsWith("#"))) {
    return [
      <span key="c" className="text-[#7d938a] dark:text-[#6b857a] italic">
        {line}
      </span>,
    ];
  }

  // CLI / Bash special line highlighting
  if (language === "bash" || language === "sh" || language === "shell") {
    return highlightBashLine(line);
  }

  // JSON special line highlighting
  if (language === "json") {
    return highlightJsonLine(line);
  }

  // CSS special line highlighting
  if (language === "css") {
    return highlightCssLine(line);
  }

  // TSX / JSX / TypeScript default
  return highlightTsxLine(line);
}

function highlightBashLine(line: string): React.ReactNode[] {
  const parts = line.split(/(\s+)/);
  return parts.map((part, idx) => {
    if (!part) return null;
    if (/^(pnpm|npm|npx|yarn|bun|bunx|mintforge|git|cd|mkdir|touch)\b/.test(part)) {
      return (
        <span key={idx} className="text-[#34d399] font-bold">
          {part}
        </span>
      );
    }
    if (/^(add|init|create|diff|dev|run|build|install|dlx)\b/.test(part)) {
      return (
        <span key={idx} className="text-[#38bdf8] font-semibold">
          {part}
        </span>
      );
    }
    if (part.startsWith("--") || part.startsWith("-")) {
      return (
        <span key={idx} className="text-[#a78bfa]">
          {part}
        </span>
      );
    }
    if (part.startsWith("$")) {
      return (
        <span key={idx} className="text-[#64748b] select-none font-bold">
          {part}
        </span>
      );
    }
    return <span key={idx} className="text-[#e2e8f0]">{part}</span>;
  });
}

function highlightJsonLine(line: string): React.ReactNode[] {
  const regex = /("(?:[^"\\]|\\.)*")(\s*:)?|(:)|(\b(?:true|false|null)\b)|(-?\d+(?:\.\d+)?)|([{}[\],])/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const [, str, colon, standaloneColon, boolVal, numVal, punctuation] = match;

    if (str && colon) {
      // Key
      nodes.push(
        <span key={match.index} className="text-[#38bdf8] font-medium">
          {str}
        </span>
      );
      nodes.push(colon);
    } else if (str) {
      // String value
      nodes.push(
        <span key={match.index} className="text-[#6ee7b7]">
          {str}
        </span>
      );
    } else if (standaloneColon) {
      nodes.push(<span key={match.index} className="text-[#94a3b8]">{standaloneColon}</span>);
    } else if (boolVal) {
      nodes.push(
        <span key={match.index} className="text-[#fb923c] font-semibold">
          {boolVal}
        </span>
      );
    } else if (numVal) {
      nodes.push(
        <span key={match.index} className="text-[#f59e0b]">
          {numVal}
        </span>
      );
    } else if (punctuation) {
      nodes.push(
        <span key={match.index} className="text-[#94a3b8]">
          {punctuation}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }
  return nodes;
}

function highlightCssLine(line: string): React.ReactNode[] {
  const regex = /(--mf-[a-zA-Z0-9_-]+)|(@[a-zA-Z_-]+)|([a-zA-Z_-]+(?=\s*:))|(:root|\.dark|\.[\w-]+)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(#(?:[0-9a-fA-F]{3,8}))|(\b\d+(?:px|rem|em|%|ms|s)?\b)|([{}();:,])/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const [, mfToken, atRule, propName, selector, str, hexColor, numVal, punct] = match;

    if (mfToken) {
      nodes.push(
        <span key={match.index} className="text-[#10b981] font-bold font-mono">
          {mfToken}
        </span>
      );
    } else if (atRule) {
      nodes.push(
        <span key={match.index} className="text-[#c084fc] font-semibold">
          {atRule}
        </span>
      );
    } else if (propName) {
      nodes.push(
        <span key={match.index} className="text-[#38bdf8]">
          {propName}
        </span>
      );
    } else if (selector) {
      nodes.push(
        <span key={match.index} className="text-[#f472b6] font-semibold">
          {selector}
        </span>
      );
    } else if (str) {
      nodes.push(
        <span key={match.index} className="text-[#6ee7b7]">
          {str}
        </span>
      );
    } else if (hexColor) {
      nodes.push(
        <span key={match.index} className="text-[#fde047] font-mono">
          {hexColor}
        </span>
      );
    } else if (numVal) {
      nodes.push(
        <span key={match.index} className="text-[#fb923c]">
          {numVal}
        </span>
      );
    } else if (punct) {
      nodes.push(
        <span key={match.index} className="text-[#94a3b8]">
          {punct}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }
  return nodes;
}

function highlightTsxLine(line: string): React.ReactNode[] {
  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|(\/\/[^\n]*)|(<\/?[A-Z][a-zA-Z0-9_]*|<\/?[a-z0-9-]+)|(\b(?:import|export|default|from|const|let|var|function|return|type|interface|extends|implements|as|async|await|if|else|true|false|null|undefined|new|this|class|void|boolean|string|number|any|switch|case|break)\b)|(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[:=]))|(\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[(<]))|(\b\d+(?:\.\d+)?(?:px|rem|em|%|ms|s)?\b)|([{}()[\],;=><+*&|!?:~^/-]+)/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const [, strVal, commentVal, tagVal, keywordVal, propVal, funcVal, numVal, punctVal] = match;

    if (commentVal) {
      nodes.push(
        <span key={match.index} className="text-[#7d938a] dark:text-[#6b857a] italic">
          {commentVal}
        </span>
      );
    } else if (strVal) {
      nodes.push(
        <span key={match.index} className="text-[#6ee7b7] dark:text-[#34d399]">
          {strVal}
        </span>
      );
    } else if (tagVal) {
      nodes.push(
        <span key={match.index} className="text-[#38bdf8] font-semibold">
          {tagVal}
        </span>
      );
    } else if (keywordVal) {
      nodes.push(
        <span key={match.index} className="text-[#c084fc] font-semibold">
          {keywordVal}
        </span>
      );
    } else if (propVal) {
      nodes.push(
        <span key={match.index} className="text-[#93c5fd]">
          {propVal}
        </span>
      );
    } else if (funcVal) {
      nodes.push(
        <span key={match.index} className="text-[#fde047]">
          {funcVal}
        </span>
      );
    } else if (numVal) {
      nodes.push(
        <span key={match.index} className="text-[#fb923c]">
          {numVal}
        </span>
      );
    } else if (punctVal) {
      nodes.push(
        <span key={match.index} className="text-[#94a3b8]">
          {punctVal}
        </span>
      );
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }
  return nodes;
}
