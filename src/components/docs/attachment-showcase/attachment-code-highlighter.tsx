"use client";

import * as React from "react";

export function AttachmentCodeHighlighter({ code }: { code: string }) {
  const lines = code.trim().split("\n");

  const tokenizeLine = (line: string): React.ReactNode => {
    // Comments
    if (line.trim().startsWith("//") || line.trim().startsWith("/*")) {
      return <span className="text-[#64748B] italic">{line}</span>;
    }

    // JSX or TS tokens
    const tokens = line.split(/([<>/={}"'`\s]+|[a-zA-Z0-9_-]+)/g).filter(Boolean);

    return tokens.map((token, i) => {
      if (
        [
          "import",
          "from",
          "export",
          "const",
          "function",
          "return",
          "default",
          "type",
          "interface",
          "true",
          "false",
          "null",
          "undefined",
          "as",
        ].includes(token)
      ) {
        return (
          <span key={i} className="text-[#C084FC] font-semibold">
            {token}
          </span>
        );
      }

      if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
        return (
          <span key={i} className="text-[#86EFAC]">
            {token}
          </span>
        );
      }

      if (
        [
          "Attachment",
          "AttachmentMedia",
          "AttachmentContent",
          "AttachmentTitle",
          "AttachmentDescription",
          "AttachmentProgress",
          "AttachmentActions",
          "AttachmentAction",
          "AttachmentTrigger",
          "AttachmentGroup",
          "AttachmentDropzone",
          "AttachmentItem",
          "AttachmentFileCard",
          "AttachmentImagePreview",
          "AttachmentUploadProgress",
          "AttachmentStatusErrorList",
          "AttachmentGroupShowcase",
          "Button",
        ].includes(token)
      ) {
        return (
          <span key={i} className="text-[#67E8F9] font-semibold">
            {token}
          </span>
        );
      }

      if (
        [
          "state",
          "size",
          "orientation",
          "category",
          "value",
          "progress",
          "onClick",
          "onRemove",
          "onPreview",
          "onDownload",
          "className",
          "src",
          "alt",
          "name",
          "id",
          "type",
          "variant",
          "accept",
          "maxSizeBytes",
        ].includes(token)
      ) {
        return (
          <span key={i} className="text-[#FDE047]">
            {token}
          </span>
        );
      }

      if (/^\d+$/.test(token)) {
        return (
          <span key={i} className="text-[#F97316]">
            {token}
          </span>
        );
      }

      return (
        <span key={i} className="text-[#E2E8F0]">
          {token}
        </span>
      );
    });
  };

  return (
    <pre className="font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-[#E2E8F0] selection:bg-[#5145FF]/30 p-4">
      <code>
        {lines.map((line, idx) => (
          <div key={idx} className="table-row">
            <span className="table-cell pr-4 text-right select-none text-[#475569] font-mono text-xs opacity-60">
              {idx + 1}
            </span>
            <span className="table-cell">{tokenizeLine(line)}</span>
          </div>
        ))}
      </code>
    </pre>
  );
}
