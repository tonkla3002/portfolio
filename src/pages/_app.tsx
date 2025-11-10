import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import Router from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    let observer: IntersectionObserver | null = null;

    const initReveal = () => {
      // Clean up any previous observer
      if (observer) {
        observer.disconnect();
        observer = null;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              el.classList.add("is-visible");
              observer && observer.unobserve(el);
            }
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.12 }
      );

      document
        .querySelectorAll<HTMLElement>(".section-reveal")
        .forEach((el) => observer && observer.observe(el));
    };

    initReveal();

    const onRouteDone = () => {
      // Re-init reveal after route changes
      initReveal();
    };

    Router.events.on("routeChangeComplete", onRouteDone);

    return () => {
      Router.events.off("routeChangeComplete", onRouteDone);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
