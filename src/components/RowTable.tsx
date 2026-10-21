import { useState } from "react";

export type Column = {
  label: string;
  /** Hide this column below the md breakpoint (its value moves into the expanded body). */
  desktopOnly?: boolean;
  align?: "right";
};

export type Row = {
  id: string;
  cells: React.ReactNode[];
  /** Shown when the row is expanded. */
  body?: React.ReactNode;
};

type RowTableProps = {
  columns: Column[];
  rows: Row[];
  /** CSS grid-template-columns used at md and up. */
  template: string;
  /** grid-template-columns below md (default: first column + an auto-width last column). */
  mobileTemplate?: string;
};

// A ruled, Olivier-Larose-style index table. Rows with a body expand on click.
export default function RowTable({ columns, rows, template, mobileTemplate = "minmax(0,1fr) auto" }: RowTableProps) {
  const [open, setOpen] = useState<string | null>(null);
  const cellClass = (c: Column) =>
    (c.desktopOnly ? "hidden md:block " : "") + (c.align === "right" ? "text-right" : "");

  return (
    <div>
      <div
        className="grid gap-x-6 pb-2 [grid-template-columns:var(--mcols)] md:[grid-template-columns:var(--cols)]"
        style={{ ["--cols" as string]: template, ["--mcols" as string]: mobileTemplate }}
        aria-hidden
      >
        {columns.map((c) => (
          <div key={c.label} className={"label text-muted " + cellClass(c)}>
            {c.label}
          </div>
        ))}
      </div>
      <ul className="border-t border-ink">
        {rows.map((r) => {
          const isOpen = open === r.id;
          const Tag = r.body ? "button" : "div";
          return (
            <li key={r.id} className={"group border-b border-line " + (isOpen ? "row-open" : "")}>
              <Tag
                {...(r.body ? { type: "button" as const, "aria-expanded": isOpen, onClick: () => setOpen(isOpen ? null : r.id) } : {})}
                className="grid w-full items-baseline gap-x-6 gap-y-1 py-3.5 text-left transition-[padding] duration-300 [grid-template-columns:var(--mcols)] md:[grid-template-columns:var(--cols)] md:hover:pl-3"
                style={{ ["--cols" as string]: template, ["--mcols" as string]: mobileTemplate }}
              >
                {r.cells.map((cell, i) => (
                  <span key={i} className={"min-w-0 text-[0.98rem] leading-snug " + cellClass(columns[i])}>
                    {i === r.cells.length - 1 && r.body ? (
                      <span className="inline-flex items-baseline gap-3">
                        {cell}
                        <span
                          className={"label inline-block w-3 text-center transition-transform duration-300 " + (isOpen ? "rotate-45" : "")}
                          aria-hidden
                        >
                          +
                        </span>
                      </span>
                    ) : (
                      cell
                    )}
                  </span>
                ))}
              </Tag>
              {r.body && (
                <div className="row-body" style={{ ["--cols" as string]: template }}>
                  <div>
                    <div className="pb-6 pt-1 md:[padding-left:var(--indent,0)]">{r.body}</div>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
