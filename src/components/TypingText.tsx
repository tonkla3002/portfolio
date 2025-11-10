import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type TypingTextHandle = {
  reset: () => void;
  start: (nextText?: string) => void;
  pause: () => void;
  resume: () => void;
};

type TypingTextProps = {
  text: string;
  speedMs?: number; // default 300ms per character
  blink?: boolean; // show blinking cursor
  className?: string;
  startOnMount?: boolean;
  onComplete?: () => void;
};

const TypingText = forwardRef<TypingTextHandle, TypingTextProps>(function TypingText(
  { text, speedMs = 300, blink = true, className, startOnMount = true, onComplete },
  ref
) {
  const [display, setDisplay] = useState<string>("");
  const [running, setRunning] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);
  const indexRef = useRef<number>(0);
  const textRef = useRef<string>(text);
  const reducedMotion = typeof window !== "undefined" && window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const step = () => {
    if (indexRef.current >= textRef.current.length) {
      setRunning(false);
      clearTimer();
      onComplete?.();
      return;
    }
    setDisplay((prev) => prev + textRef.current.charAt(indexRef.current));
    indexRef.current += 1;
    timerRef.current = window.setTimeout(step, speedMs);
  };

  const startInternal = () => {
    clearTimer();
    indexRef.current = 0;
    setDisplay("");
    setRunning(true);
    timerRef.current = window.setTimeout(step, speedMs);
  };

  useEffect(() => {
    textRef.current = text;
    if (reducedMotion) {
      // Respect reduced motion: render immediately
      clearTimer();
      setDisplay(textRef.current);
      setRunning(false);
      return;
    }
    if (startOnMount) {
      startInternal();
    } else {
      // keep empty until external start()
      setRunning(false);
      setDisplay("");
    }
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speedMs, startOnMount]);

  useImperativeHandle(ref, () => ({
    reset() {
      clearTimer();
      indexRef.current = 0;
      setDisplay("");
      setRunning(false);
    },
    start(nextText?: string) {
      if (typeof nextText === "string") {
        textRef.current = nextText;
      }
      startInternal();
    },
    pause() {
      clearTimer();
      setRunning(false);
    },
    resume() {
      if (!running && !reducedMotion) {
        setRunning(true);
        timerRef.current = window.setTimeout(step, speedMs);
      }
    },
  }), [running, speedMs, reducedMotion]);

  return (
    <span className={className} aria-live="polite">
      {display}
      {blink && !reducedMotion ? (
        <span className="typing-cursor" aria-hidden="true">|</span>
      ) : null}
    </span>
  );
});

export default TypingText;