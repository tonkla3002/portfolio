import { useSyncExternalStore } from "react";
import { useI18n } from "@/context/i18n";

// The theme lives on <html class="dark">; read it as an external store so the
// button stays in sync without setState-in-effect.
function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribeTheme, isDark, () => false);

  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="label transition-opacity hover:opacity-60"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}

// TH / EN with the current language in ink and the other muted.
export function LangSwitch() {
  const { lang, setLang, clearLang } = useI18n();
  return (
    <div role="radiogroup" aria-label="Language" className="label flex items-center gap-2">
      {(["th", "en"] as const).map((code, i) => {
        const active = lang === code;
        return (
          <span key={code} className="flex items-center gap-2">
            {i > 0 && <span className="opacity-50" aria-hidden>/</span>}
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={code === "th" ? "ภาษาไทย" : "English"}
              onClick={(e) => {
                if (e.altKey || e.metaKey) { clearLang(); return; }
                if (!active) setLang(code);
              }}
              className={"uppercase " + (active ? "" : "opacity-50 transition-opacity hover:opacity-100")}
            >
              {code}
            </button>
          </span>
        );
      })}
    </div>
  );
}
