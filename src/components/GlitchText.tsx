import { useEffect, useRef, useState } from "react";
import "./styles/GlitchText.css";

const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#$%&01";

interface Props {
  text: string;
  className?: string;
}

const GlitchText = ({ text, className = "" }: Props) => {
  const [display, setDisplay] = useState(text);
  const [burst, setBurst] = useState(false);
  const scrambleTimer = useRef<number>();
  const burstTimer = useRef<number>();
  const scheduleTimer = useRef<number>();

  const runScramble = () => {
    let frame = 0;
    const totalFrames = 10;

    const step = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            const revealAt = (i / text.length) * totalFrames;
            if (frame >= revealAt) return char;
            return GLITCH_CHARS[
              Math.floor(Math.random() * GLITCH_CHARS.length)
            ];
          })
          .join("")
      );
      frame++;
      if (frame <= totalFrames) {
        scrambleTimer.current = window.setTimeout(step, 28);
      } else {
        setDisplay(text);
      }
    };
    step();
  };

  useEffect(() => {
    const scheduleNext = () => {
      const delay = 3000 + Math.random() * 5000;
      scheduleTimer.current = window.setTimeout(() => {
        setBurst(true);
        runScramble();
        burstTimer.current = window.setTimeout(() => {
          setBurst(false);
        }, 380);
        scheduleNext();
      }, delay);
    };
    scheduleNext();

    return () => {
      window.clearTimeout(scrambleTimer.current);
      window.clearTimeout(burstTimer.current);
      window.clearTimeout(scheduleTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <span
      className={`glitch-root ${burst ? "glitch-burst" : ""} ${className}`}
      data-text={display}
    >
      {display}
    </span>
  );
};

export default GlitchText;
