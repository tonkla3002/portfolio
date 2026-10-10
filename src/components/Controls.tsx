import { useEffect, useState } from "react";
import { useI18n } from "@/context/i18n";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="label label-tightr text-muted transition-colors hover:text-ink"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

// TH / EN with the current language in ink and the other muted.
export function LangSwitch() {
  const { lang, setLang, clearLang } = useI18n();
  return (
    <div role="radiogroup" aria-label="Language" className="flex items-center gap-2 label label-tightr">
      {(["th", "en"] as const).map((code, i) => {
        const active = lang === code;
        return (
          <span key={code} className="flex items-center gap-2">
            {i > 0 && <span className="text-line" aria-hidden>/</span>}
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={code === "th" ? "ภาษาไทย" : "English"}
              onClick={(e) => {
                if (e.altKey || e.metaKey) { clearLang(); return; }
                if (!active) setLang(code);
              }}
              className={"uppercase " + (active ? "text-ink" : "text-muted transition-colors hover:text-ink")}
            >
              {code}
            </button>
          </span>
        );
      })}
    </div>
  );
}
