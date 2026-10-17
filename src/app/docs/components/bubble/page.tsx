"use client";

import * as React from "react";
import { Bubble, BubbleThinking } from "@/components/ui/bubble";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function BubbleDocPage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "ai-conversation", title: "AI Agent Conversation" },
    { id: "reasoning-steps", title: "Reasoning & Thought Process" },
    { id: "streaming-state", title: "Streaming Response" },
    { id: "installation", title: "Installation" },
  ];

  const conversationCode = `<div className="space-y-4 w-full max-w-xl">
  <Bubble role="user">
    Can you check if our frontend interview submission payload matches our FastAPI backend?
  </Bubble>

  <Bubble role="assistant" seamVerified seamEndpoint="POST /v1/feedback">
    I analyzed your Next.js form against the FastAPI \`SubmitTeamFeedbackRequest\` model.
    All 5 fields match the expected casing and types with zero drift!
  </Bubble>
</div>`;

  const thinkingCode = `<Bubble role="assistant" seamVerified seamEndpoint="POST /v1/interviews/feedback">
  <BubbleThinking duration="1.2s" title="Contract Parity Analysis">
    Scanning AST:
    - Frontend field "scores" -> Backend "scores" (List[int]) -> MATCH
    - Frontend field "detailed_feedback" -> Backend "detailed_feedback" (str) -> MATCH
    - Zero camelCase drift detected. HTTP 200 guaranteed.
  </BubbleThinking>
  Your frontend form submission is fully verified and compliant with the FastAPI schema.
</Bubble>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Bubble"
          description="An AI-native chat bubble primitive supporting user and assistant roles, reasoning disclosures, streaming cursors, and Seam contract verification."
        />

        <div className="space-y-10 mt-6">
          {/* Conversation Example */}
          <section id="ai-conversation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              AI Agent Conversation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Standard user and assistant bubbles with built-in copy actions, role badges, and Seam contract verification chips.
            </p>
            <ComponentPreview code={conversationCode}>
              <div className="space-y-4 w-full max-w-xl">
                <Bubble role="user">
                  Can you check if our frontend interview submission payload matches our FastAPI backend?
                </Bubble>

                <Bubble role="assistant" seamVerified seamEndpoint="POST /v1/feedback">
                  I analyzed your Next.js form against the FastAPI <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs">SubmitTeamFeedbackRequest</code> model.
                  All 5 fields match the expected casing and types with zero drift!
                </Bubble>
              </div>
            </ComponentPreview>
          </section>

          {/* Reasoning / Thinking Example */}
          <section id="reasoning-steps" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Reasoning & Thought Process
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Display collapsible chain-of-thought blocks for reasoning models (DeepSeek R1, OpenAI o-series) with duration timers.
            </p>
            <ComponentPreview code={thinkingCode}>
              <div className="w-full max-w-xl">
                <Bubble role="assistant" seamVerified seamEndpoint="POST /v1/interviews/feedback">
                  <BubbleThinking duration="1.2s" title="Contract Parity Analysis" defaultOpen={true}>
{`Scanning AST:
- Frontend field "scores" -> Backend "scores" (List[int]) -> MATCH
- Frontend field "detailed_feedback" -> Backend "detailed_feedback" (str) -> MATCH
- Zero camelCase drift detected. HTTP 200 guaranteed.`}
                  </BubbleThinking>
                  Your frontend form submission is fully verified and compliant with the FastAPI schema.
                </Bubble>
              </div>
            </ComponentPreview>
          </section>

          {/* Streaming State */}
          <section id="streaming-state" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Streaming Response
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Real-time response token generation with an animated cursor.
            </p>
            <ComponentPreview code={`<Bubble role="assistant" isStreaming>\n  Synthesizing contract parity report across all FastAPI routers\n</Bubble>`}>
              <div className="w-full max-w-xl">
                <Bubble role="assistant" isStreaming>
                  Synthesizing contract parity report across all FastAPI routers
                </Bubble>
              </div>
            </ComponentPreview>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Installation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add the Bubble primitive to your project:
            </p>
            <ComponentCode code="npx mintforge add bubble" language="bash" />
          </section>
        </div>

        <div className="mt-16">
          <ComponentPagination currentHref="/docs/components/bubble" />
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
