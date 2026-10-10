import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai, Instrument_Serif, Noto_Serif_Thai } from "next/font/google";
import Layout from "@/components/Layout";
import { I18nProvider } from "@/context/i18n";

const plexThai = IBM_Plex_Sans_Thai({
  variable: "--font-plex-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600"],
});
const plexMono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });
const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const notoSerifThai = Noto_Serif_Thai({ variable: "--font-noto-serif-thai", subsets: ["thai"], weight: ["400", "500"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div
      className={`${plexThai.variable} ${plexMono.variable} ${instrument.variable} ${notoSerifThai.variable} font-sans`}
    >
      <I18nProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </I18nProvider>
    </div>
  );
}
