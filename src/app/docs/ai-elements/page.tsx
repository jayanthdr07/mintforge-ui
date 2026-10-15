"use client";

import { useState } from "react";
import { DocsHeader } from "@/components/docs/docs-header";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";
import { ComponentCode } from "@/components/docs/component-code";
import {
  Sparkles,
  Bot,
  BrainCircuit,
  Wrench,
  Paperclip,
  Mic,
  ArrowUp,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function DocsAiElementsPage() {
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet");
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [showReasoning, setShowReasoning] = useState(true);
  const [inputPrompt, setInputPrompt] = useState("");
  const [copiedResponse, setCopiedResponse] = useState(false);

  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "interactive-demo", title: "Interactive Demo" },
    { id: "prompt-input", title: "Prompt Input" },
    { id: "message-list", title: "Message Stream" },
    { id: "reasoning-trace", title: "Reasoning Trace" },
    { id: "tool-execution", title: "Tool Call Execution" },
    { id: "ai-sdk-integration", title: "Vercel AI SDK Setup" },
  ];

  const models = [
    { name: "Claude 3.5 Sonnet", provider: "Anthropic", tag: "Fast & Smart" },
    { name: "GPT-4o", provider: "OpenAI", tag: "Multimodal" },
    { name: "DeepSeek R1", provider: "DeepSeek", tag: "Reasoning" },
    { name: "Gemini 1.5 Pro", provider: "Google", tag: "2M Context" },
  ];

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <>
      <div className="mf-docs-main">
        <DocsHeader
          title="AI Elements"
          description="Pre-built, composable UI components engineered for conversational agents, LLM chat interfaces, streaming responses, and agentic workflows."
          badge="New"
          prevHref="/docs"
          nextHref="/docs/installation"
        />

        {/* Section 1: Overview */}
        <section id="overview" className="scroll-mt-24">
          <p className="mf-docs-paragraph">
            Building modern AI applications requires more than standard form inputs and static cards. Users expect <strong>auto-resizing textareas, multi-model selectors, file attachment drops, collapsible thought traces (reasoning), streaming markdown, and structured tool invocation previews</strong>.
          </p>
          <p className="mf-docs-paragraph">
            Mintforge AI Elements provide a comprehensive set of headless and styled primitives specifically tailored for LLM chat interfaces. They integrate seamlessly with the <strong>Vercel AI SDK (<span className="mf-inline-code">@ai-sdk/react</span>)</strong>, LangChain, or custom SSE backends.
          </p>
        </section>

        {/* Section 2: Interactive Demo */}
        <section id="interactive-demo" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Interactive Demo</h2>
          <p className="mf-docs-paragraph">
            Test the live Mintforge AI chat interface below. Toggle reasoning traces, switch active models, and test the prompt input:
          </p>

          <div className="mf-ai-chat-preview">
            {/* Header with Model Selector */}
            <div className="mf-ai-chat-header">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-semibold text-foreground">Agent Session</span>
                <span className="text-[10px] text-muted-foreground font-mono">ID: mf-agent-904</span>
              </div>

              {/* Model Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowModelMenu(!showModelMenu)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-card text-xs font-medium text-foreground hover:border-border-strong transition-all"
                >
                  <Sparkles size={13} className="text-emerald-500" />
                  <span>{selectedModel}</span>
                  <ChevronDown size={12} className="text-muted-foreground" />
                </button>

                {showModelMenu && (
                  <div
                    className="absolute right-0 mt-1 w-56 rounded-xl border border-border bg-card shadow-xl p-1 z-30"
                    onMouseLeave={() => setShowModelMenu(false)}
                  >
                    <div className="px-2 py-1 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                      Select Model
                    </div>
                    {models.map((m) => (
                      <button
                        key={m.name}
                        onClick={() => {
                          setSelectedModel(m.name);
                          setShowModelMenu(false);
                        }}
                        className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg text-xs transition-colors text-left ${
                          selectedModel === m.name
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "text-foreground hover:bg-secondary"
                        }`}
                      >
                        <div>
                          <div>{m.name}</div>
                          <div className="text-[10px] text-muted-foreground">{m.provider}</div>
                        </div>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary text-muted-foreground">
                          {m.tag}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Chat Body */}
            <div className="mf-ai-chat-body">
              {/* User Message */}
              <div className="mf-ai-user-bubble">
                Could you write a Next.js 16 Server Action that calculates monthly retention metrics and triggers our telemetry webhook?
              </div>

              {/* Assistant Message */}
              <div className="mf-ai-assistant-wrapper">
                <div className="mf-ai-avatar">
                  <Bot size={18} />
                </div>

                <div className="mf-ai-assistant-body">
                  {/* Reasoning Accordion */}
                  <div className="mf-ai-reasoning-box">
                    <button
                      type="button"
                      onClick={() => setShowReasoning(!showReasoning)}
                      className="w-full flex items-center justify-between text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <BrainCircuit size={13} className="text-emerald-500" />
                        <span>Reasoning trace (Thought for 2.8s)</span>
                      </div>
                      {showReasoning ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                    </button>

                    {showReasoning && (
                      <div className="mt-2.5 pt-2 border-t border-border text-xs font-mono text-muted-foreground leading-relaxed space-y-1">
                        <p>1. Analyzing user schema for retention cohort calculation...</p>
                        <p>2. Checking Next.js 16 App Router Server Action guidelines (use server)...</p>
                        <p>3. Preparing tool invocation: `generate_metric_report`...</p>
                      </div>
                    )}
                  </div>

                  {/* Tool Call Card */}
                  <div className="mf-ai-tool-card">
                    <div className="mf-ai-tool-header">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Wrench size={12} className="text-emerald-500" />
                        <span>Tool Invocation: generate_metric_report</span>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                        Executed
                      </span>
                    </div>
                    <div className="p-3 font-mono text-[11px] text-muted-foreground bg-card">
                      {`{ "cohort": "2026-Q3", "retentionRate": 84.6, "activeUsers": 142500 }`}
                    </div>
                  </div>

                  {/* Assistant Response Text */}
                  <div className="text-xs leading-relaxed text-foreground space-y-2">
                    <p>
                      Here is the complete Next.js 16 Server Action implementation with type-safe telemetry:
                    </p>
                    <div className="p-3 rounded-lg bg-secondary border border-border font-mono text-[11px] overflow-x-auto">
                      <code>{`"use server";\n\nexport async function computeRetention(cohortId: string) {\n  const metrics = await calculateMonthlyRetention(cohortId);\n  await fetch(process.env.TELEMETRY_WEBHOOK_URL!, {\n    method: "POST",\n    body: JSON.stringify({ cohortId, metrics }),\n  });\n  return { success: true, retentionRate: metrics.rate };\n}`}</code>
                    </div>
                  </div>

                  {/* Message Action Toolbar */}
                  <div className="flex items-center gap-1 pt-1 text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => handleCopyText(`"use server";...`)}
                      className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                      title="Copy code"
                    >
                      {copiedResponse ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                      title="Regenerate"
                    >
                      <RotateCcw size={13} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                      title="Helpful"
                    >
                      <ThumbsUp size={13} />
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                      title="Not helpful"
                    >
                      <ThumbsDown size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Prompt Input Box */}
            <div className="mf-ai-prompt-input-box">
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                placeholder="Ask Mintforge AI to scaffold components, refactor hooks, or debug state..."
                className="mf-ai-textarea"
                rows={2}
              />
              <div className="mf-ai-prompt-toolbar">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                    title="Attach file"
                  >
                    <Paperclip size={14} />
                  </button>
                  <button
                    type="button"
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                    title="Voice input"
                  >
                    <Mic size={14} />
                  </button>
                  <span className="text-[10px] text-muted-foreground font-mono ml-1">
                    Shift+Enter for newline
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!inputPrompt.trim()}
                  className="mf-ai-send-btn"
                  title="Send message"
                >
                  <ArrowUp size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Prompt Input */}
        <section id="prompt-input" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Prompt Input Component</h2>
          <p className="mf-docs-paragraph">
            The <span className="mf-inline-code">PromptInput</span> compound component wraps an auto-resizing textarea with accessory slots for model selectors, file upload triggers, and keyboard shortcut event listeners:
          </p>

          <ComponentCode
            language="tsx"
            code={`import {
  PromptInput,
  PromptTextarea,
  PromptActions,
  PromptAttach,
  PromptSubmit,
} from "@/components/ui/prompt-input";

export function ChatInput() {
  return (
    <PromptInput onSubmit={(val) => console.log(val)}>
      <PromptTextarea placeholder="Message your agent..." />
      <PromptActions>
        <PromptAttach onFileSelect={(files) => handleUpload(files)} />
        <PromptSubmit />
      </PromptActions>
    </PromptInput>
  );
}`}
          />
        </section>

        {/* Section 4: Message List */}
        <section id="message-list" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Message Stream & Markdown</h2>
          <p className="mf-docs-paragraph">
            The <span className="mf-inline-code">Message</span> component handles streaming chunks, user/assistant role differentiation, and syntax-highlighted markdown with zero hydration errors:
          </p>

          <ComponentCode
            language="tsx"
            code={`import { Message, MessageAvatar, MessageContent, MessageActions } from "@/components/ui/message";

export function MessageItem({ role, content, isStreaming }: MessageProps) {
  return (
    <Message role={role}>
      <MessageAvatar />
      <MessageContent streaming={isStreaming}>
        {content}
      </MessageContent>
      <MessageActions onCopy={() => copyText(content)} onRetry={() => regenerate()} />
    </Message>
  );
}`}
          />
        </section>

        {/* Section 5: Reasoning Trace */}
        <section id="reasoning-trace" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Reasoning & Thinking Trace</h2>
          <p className="mf-docs-paragraph">
            Modern reasoning models (such as DeepSeek-R1, OpenAI o1/o3, and Claude 3.7 Thinking) output a dedicated chain-of-thought stream. The <span className="mf-inline-code">Reasoning</span> component formats this output in an elegant, collapsible accordion:
          </p>

          <ComponentCode
            language="tsx"
            code={`import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ui/reasoning";

<Reasoning durationSeconds={3.4}>
  <ReasoningTrigger />
  <ReasoningContent>
    {thinkingStreamText}
  </ReasoningContent>
</Reasoning>`}
          />
        </section>

        {/* Section 6: Tool Execution */}
        <section id="tool-execution" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Tool Call Execution Cards</h2>
          <p className="mf-docs-paragraph">
            Display LLM agent function calls with live execution states (<span className="mf-inline-code">running</span>, <span className="mf-inline-code">completed</span>, or <span className="mf-inline-code">failed</span>) and collapsible JSON payloads:
          </p>

          <ComponentCode
            language="tsx"
            code={`import { ToolCall, ToolHeader, ToolBody } from "@/components/ui/tool-call";

<ToolCall name="fetch_stock_quote" status="completed">
  <ToolHeader />
  <ToolBody input={{ symbol: "NVDA" }} output={{ price: 138.25, change: "+2.4%" }} />
</ToolCall>`}
          />
        </section>

        {/* Section 7: Vercel AI SDK Integration */}
        <section id="ai-sdk-integration" className="scroll-mt-24">
          <h2 className="mf-docs-h2">Vercel AI SDK Integration</h2>
          <p className="mf-docs-paragraph">
            Mintforge AI Elements plug directly into the Vercel AI SDK (<span className="mf-inline-code">@ai-sdk/react</span>). Here is a complete working chat example:
          </p>

          <ComponentCode
            language="tsx"
            code={`"use client";

import { useChat } from "@ai-sdk/react";
import { PromptInput, PromptTextarea, PromptSubmit } from "@/components/ui/prompt-input";
import { Message, MessageContent } from "@/components/ui/message";

export function AgentChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

  return (
    <div className="flex flex-col h-[600px] border rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <Message key={m.id} role={m.role}>
            <MessageContent>{m.content}</MessageContent>
          </Message>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t">
        <PromptInput>
          <PromptTextarea value={input} onChange={handleInputChange} />
          <PromptSubmit disabled={isLoading} />
        </PromptInput>
      </form>
    </div>
  );
}`}
          />
        </section>

        {/* CLI Install */}
        <div className="my-10 p-6 rounded-xl border border-border bg-card">
          <h3 className="text-base font-bold text-foreground mb-2">
            Install AI Elements
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Add the AI Elements primitives directly into your Mintforge UI project via our CLI:
          </p>
          <ComponentCode
            packageManagerTabs
            commands={{
              pnpm: "pnpm dlx mintforge@latest add ai-elements",
              npm: "npx mintforge@latest add ai-elements",
              yarn: "yarn dlx mintforge@latest add ai-elements",
              bun: "bunx mintforge@latest add ai-elements",
            }}
          />
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
