"use client";

import * as React from "react";
import { AttachmentDropzone, AttachmentItem, AttachmentFile } from "@/components/ui/attachment";
import { DocsHeader } from "@/components/docs/docs-header";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentCode } from "@/components/docs/component-code";
import { ComponentPagination } from "@/components/docs/component-pagination";
import { DocsTableOfContents } from "@/components/docs/docs-table-of-contents";

export default function AttachmentDocPage() {
  const tocItems = [
    { id: "overview", title: "Overview" },
    { id: "dropzone-example", title: "File Dropzone" },
    { id: "file-items", title: "Attachment Cards & Progress" },
    { id: "installation", title: "Installation" },
  ];

  const [files, setFiles] = React.useState<AttachmentFile[]>([
    {
      id: "1",
      name: "fastapi-openapi-spec.json",
      size: 142000,
      progress: 100,
    },
    {
      id: "2",
      name: "contract-audit-report.pdf",
      size: 2840000,
      progress: 68,
    },
    {
      id: "3",
      name: "broken_model.py",
      size: 12400,
      error: "Syntax error on line 42",
    },
  ]);

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const dropzoneCode = `<AttachmentDropzone
  accept=".json,.yaml,.ts,.py"
  maxSizeBytes={10 * 1024 * 1024}
  onFilesSelected={(newFiles) => {
    console.log("Selected files:", newFiles);
  }}
/>`;

  const itemsCode = `<div className="space-y-2.5 max-w-md">
  <AttachmentItem
    file={{
      id: "1",
      name: "fastapi-openapi-spec.json",
      size: 142000,
      progress: 100,
    }}
    onRemove={(id) => handleRemove(id)}
  />
  <AttachmentItem
    file={{
      id: "2",
      name: "contract-audit-report.pdf",
      size: 2840000,
      progress: 68,
    }}
  />
</div>`;

  return (
    <>
      <div className="mf-docs-main max-w-4xl">
        <DocsHeader
          title="Attachment"
          description="A comprehensive file upload primitive with interactive drag-and-drop zones, file type iconography, upload progress, and error reporting."
        />

        <div className="space-y-10 mt-6">
          {/* Dropzone Example */}
          <section id="dropzone-example" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              File Dropzone
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Drag-and-drop zone with animated hover feedback, MIME-type filtering, and file size constraints.
            </p>
            <ComponentPreview code={dropzoneCode}>
              <div className="w-full max-w-md">
                <AttachmentDropzone
                  accept=".json,.yaml,.ts,.py"
                  onFilesSelected={(newFiles) => {
                    const mapped: AttachmentFile[] = newFiles.map((f, i) => ({
                      id: `${Date.now()}-${i}`,
                      name: f.name,
                      size: f.size,
                      progress: 100,
                    }));
                    setFiles((prev) => [...mapped, ...prev]);
                  }}
                />
              </div>
            </ComponentPreview>
          </section>

          {/* File Items & Progress */}
          <section id="file-items" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Attachment Cards & Progress
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Display uploaded or in-progress files with formatted byte sizes, animated progress bars, error callouts, and dismiss buttons.
            </p>
            <ComponentPreview code={itemsCode}>
              <div className="w-full max-w-md space-y-2.5">
                {files.map((f) => (
                  <AttachmentItem key={f.id} file={f} onRemove={handleRemove} />
                ))}
              </div>
            </ComponentPreview>
          </section>

          {/* Installation */}
          <section id="installation" className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Installation
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Add the Attachment primitive to your project:
            </p>
            <ComponentCode
              code="npx mintforge add attachment"
              language="bash"
            />
          </section>
        </div>

        <div className="mt-16">
          <ComponentPagination currentHref="/docs/components/attachment" />
        </div>
      </div>

      <DocsTableOfContents items={tocItems} />
    </>
  );
}
