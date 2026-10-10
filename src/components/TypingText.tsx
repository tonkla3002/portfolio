import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

export type TypingTextHandle = {
  reset: () => void;
  start: (nextText?: string) => void;
  pause: () => void;
  resume: () => void;
};

type TypingTextProps = {
  text: string;
  speedMs?: number;
  blink?: boolean;
  className?: string;
  startOnMount?: boolean;
  onComplete?: () => void;
};

// The visible text is derived from `count`, so double-invoked effects or
// state updaters (React strict mode) can never drop or duplicate characters.
const TypingText = forwardRef<TypingTextHandle, TypingTextProps>(function TypingText(
  { text, speedMs = 80, blink = true, className, startOnMount = true, onComplete },
  ref
) {
  const [source, setSource] = useState(text);
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    setSource(text);
    setCount(0);
    setRunning(startOnMount);
  }, [text, startOnMount]);

  useEffect(() => {
    if (!running) return;
    if (reducedMotion || count >= source.length) {
      setCount(source.length);
      setRunning(false);
      onCompleteRef.current?.();
      return;
    }
    const id = window.setTimeout(() => setCount((c) => c + 1), speedMs);
    return () => window.clearTimeout(id);
  }, [running, count, source, speedMs, reducedMotion]);

  useImperativeHandle(ref, () => ({
    reset() {
      setCount(0);
      setRunning(false);
    },
    start(nextText?: string) {
      if (typeof nextText === "string") setSource(nextText);
      setCount(0);
      setRunning(true);
    },
    pause() {
      setRunning(false);
    },
    resume() {
      setRunning(true);
    },
  }), []);

  return (
    <span className={className}>
      <span className="sr-only">{source}</span>
      <span aria-hidden="true">{source.slice(0, count)}</span>
      {blink && !reducedMotion ? (
        <span className="typing-cursor" aria-hidden="true">|</span>
      ) : null}
    </span>
  );
});

export default TypingText;
