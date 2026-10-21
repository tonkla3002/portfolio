import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Bodoni_Moda, IBM_Plex_Mono, IBM_Plex_Sans_Thai, Pinyon_Script, Silkscreen } from "next/font/google";
import Layout from "@/components/Layout";
import { I18nProvider } from "@/context/i18n";

// Body text (Latin + Thai).
const plexThai = IBM_Plex_Sans_Thai({ variable: "--font-plex-thai", subsets: ["thai", "latin"], weight: ["400", "500", "600"] });
// Small uppercase labels.
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });
// The masthead: high-contrast serif caps, script initials and a pixel face.
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"], weight: ["500", "600"] });
const pinyon = Pinyon_Script({ variable: "--font-script", subsets: ["latin"], weight: "400" });
const silkscreen = Silkscreen({ variable: "--font-pixel", subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  const fonts = [plexThai, plexMono, bodoni, pinyon, silkscreen].map((f) => f.variable).join(" ");
  return (
    <div className={`${fonts} font-sans`}>
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </div>
  );
}
