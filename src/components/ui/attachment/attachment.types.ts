export type AttachmentState =
  | "idle"
  | "uploading"
  | "processing"
  | "error"
  | "done";

export type AttachmentSize = "default" | "sm" | "xs";

export type AttachmentOrientation = "horizontal" | "vertical";

export interface AttachmentFileItem {
  id: string;
  name: string;
  size: number;
  type?: string;
  progress?: number;
  state?: AttachmentState;
  error?: string;
  url?: string;
  thumbnailUrl?: string;
}

export function formatFileSize(bytes: number, decimals = 1): string {
  if (!bytes || bytes === 0) return "0 B";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export function getFileCategory(
  fileName: string,
  mimeType?: string
): "document" | "image" | "code" | "archive" | "audio" | "video" | "data" | "file" {
  const ext = fileName.split(".").pop()?.toLowerCase() || "";

  if (
    ["png", "jpg", "jpeg", "webp", "gif", "svg", "bmp", "avif"].includes(ext) ||
    mimeType?.startsWith("image/")
  ) {
    return "image";
  }

  if (["pdf", "doc", "docx", "txt", "rtf", "odt"].includes(ext) || mimeType?.includes("pdf") || mimeType?.includes("word")) {
    return "document";
  }

  if (
    ["ts", "tsx", "js", "jsx", "py", "rs", "go", "json", "yaml", "yml", "html", "css", "scss", "sql", "sh"].includes(ext)
  ) {
    return "code";
  }

  if (["csv", "xlsx", "xls", "tsv", "parquet"].includes(ext) || mimeType?.includes("csv") || mimeType?.includes("spreadsheet")) {
    return "data";
  }

  if (["zip", "tar", "gz", "rar", "7z", "tgz"].includes(ext) || mimeType?.includes("zip") || mimeType?.includes("tar")) {
    return "archive";
  }

  if (["mp4", "mov", "avi", "webm", "mkv"].includes(ext) || mimeType?.startsWith("video/")) {
    return "video";
  }

  if (["mp3", "wav", "ogg", "flac", "m4a"].includes(ext) || mimeType?.startsWith("audio/")) {
    return "audio";
  }

  return "file";
}
