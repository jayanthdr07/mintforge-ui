import { PropItem } from "@/types/docs";

export function ComponentPropsTable({ props }: { props: PropItem[] }) {
  if (!props || props.length === 0) return null;

  return (
    <div className="w-full my-6 overflow-x-auto border border-border rounded-lg">
      <table className="w-full text-left text-xs">
        <thead className="bg-secondary border-b border-border text-muted-foreground uppercase tracking-wider font-semibold">
          <tr>
            <th className="px-4 py-3">Prop</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Default</th>
            <th className="px-4 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-card">
          {props.map((p) => (
            <tr key={p.name} className="hover:bg-secondary/50 transition-colors">
              <td className="px-4 py-3 font-mono font-semibold text-brand">
                {p.name}
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {p.type}
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {p.defaultValue || "—"}
              </td>
              <td className="px-4 py-3 text-foreground">
                {p.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
