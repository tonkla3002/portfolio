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
  /** Short instruction shown above expandable tables, e.g. "Click a row for details". */
  hint?: string;
};

// A ruled, Olivier-Larose-style index table. Rows with a body expand on click.
export default function RowTable({ columns, rows, template, mobileTemplate = "minmax(0,1fr) auto", hint }: RowTableProps) {
  const [open, setOpen] = useState<string | null>(null);
  const cellClass = (c: Column) =>
    (c.desktopOnly ? "hidden md:block " : "") + (c.align === "right" ? "text-right" : "");
  const gridVars = { ["--cols" as string]: template, ["--mcols" as string]: mobileTemplate };
  const expandable = rows.some((r) => r.body);

  return (
    <div>
      {expandable && hint && (
        <p className="reveal-item label mb-4 text-muted" style={{ ["--i" as string]: 1 }}>
          {hint} ↓
        </p>
      )}
      <div
        className={"reveal-item grid gap-x-6 px-3 pb-2 [grid-template-columns:var(--mcols)] md:[grid-template-columns:var(--cols)] " + (expandable ? "pr-14" : "")}
        style={{ ...gridVars, ["--i" as string]: 1 }}
        aria-hidden
      >
        {columns.map((c) => (
          <div key={c.label} className={"label text-muted " + cellClass(c)}>
            {c.label}
          </div>
        ))}
      </div>
      <ul className="border-t border-ink">
        {rows.map((r, rowIndex) => {
          const isOpen = open === r.id;
          const cells = r.cells.map((cell, i) => (
            <span
              key={i}
              className={
                "min-w-0 text-[0.98rem] leading-snug " +
                cellClass(columns[i]) +
                (i === 0 && r.body ? " underline-offset-4 decoration-1 group-hover:underline" : "")
              }
            >
              {cell}
            </span>
          ));

          if (!r.body) {
            return (
              <li key={r.id} className="reveal-item border-b border-line" style={{ ["--i" as string]: rowIndex + 2 }}>
                <div className="grid items-baseline gap-x-6 gap-y-1 px-3 py-3.5 [grid-template-columns:var(--mcols)] md:[grid-template-columns:var(--cols)]" style={gridVars}>
                  {cells}
                </div>
              </li>
            );
          }

          return (
            <li
              key={r.id}
              className={"reveal-item group border-b border-line transition-colors duration-200 hover:bg-ink/[0.05] " + (isOpen ? "row-open bg-ink/[0.05]" : "")}
              style={{ ["--i" as string]: rowIndex + 2 }}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : r.id)}
                className="flex w-full cursor-pointer items-center gap-4 px-3 py-3.5 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
              >
                <span
                  className="grid flex-1 items-baseline gap-x-6 gap-y-1 transition-transform duration-300 ease-out [grid-template-columns:var(--mcols)] group-hover:translate-x-1.5 md:[grid-template-columns:var(--cols)]"
                  style={gridVars}
                >
                  {cells}
                </span>
                {/* Visible expand control: outlined circle that fills on hover and turns into × when open. */}
                <span
                  aria-hidden
                  className={
                    "grid h-7 w-7 shrink-0 place-items-center rounded-full border text-base leading-none transition-all duration-300 " +
                    (isOpen
                      ? "rotate-45 border-ink bg-ink text-paper"
                      : "border-ink/40 group-hover:border-ink group-hover:bg-ink group-hover:text-paper")
                  }
                >
                  +
                </span>
              </button>
              <div className="row-body" style={{ ["--cols" as string]: template }}>
                <div>
                  <div className="px-3 pb-6 pt-1 md:pr-14">{r.body}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
