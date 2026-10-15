import { PropItem } from "@/types/docs";

export function ComponentPropsTable({ props }: { props: PropItem[] }) {
  if (!props || props.length === 0) return null;

  return (
    <div className="w-full my-6 overflow-x-auto border border-[var(--mf-border)] rounded-[var(--mf-radius-lg)]">
      <table className="w-full text-left text-xs">
        <thead className="bg-[var(--mf-surface-secondary)] border-b border-[var(--mf-border)] text-[var(--mf-foreground-muted)] uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--mf-border)] bg-[var(--mf-surface)]">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-[var(--mf-surface-secondary)]/50 transition-colors">
              <td className="px-4 py-3 font-mono font-semibold text-[var(--mf-brand)]">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-[var(--mf-foreground-secondary)]">
                {p.type}
              </td>
              <td className="px-4 py-3 font-mono text-[var(--mf-foreground-muted)]">
                {p.defaultValue || "—"}
              </td>
              <td className="px-4 py-3 text-[var(--mf-foreground)]">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
