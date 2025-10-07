import { useRef, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";

const LetterGlitch = ({
  glitchColors = ["#2b4539", "#61dca3", "#61b3dc"],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789",
}: {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
  characters: string;
}) => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const letters = useRef<
    {
      char: string;
      color: string;
      targetColor: string;
      colorProgress: number;
    }[]
  >([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => {
    return lettersAndSymbols[
      Math.floor(Math.random() * lettersAndSymbols.length)
    ];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = (hex: string) => {
    try {
      if (!hex || typeof hex !== "string") {
        return null;
      }

      const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, (_m, r, g, b) => {
        return r + r + g + g + b + b;
      });

      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    } catch (error) {
      console.warn("Error parsing hex color:", hex, error);
      return null;
    }
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns: number, rows: number) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("Canvas ref is null, cannot resize");
      return;
    }

    const parent = canvas.parentElement;
    if (!parent) {
      console.warn("Canvas parent element is null, cannot resize");
      return;
    }

    try {
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();

      if (rect.width <= 0 || rect.height <= 0) {
        console.warn("Invalid parent dimensions for canvas resize");
        return;
      }

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (context.current) {
        try {
          context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        } catch (error) {
          console.warn("Error setting canvas transform:", error);
        }
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    } catch (error) {
      console.error("Error in resizeCanvas:", error);
    }
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;

    const ctx = context.current;
    const canvas = canvasRef.current;

    if (!canvas) {
      console.warn("Canvas ref is null, cannot draw");
      return;
    }

    try {
      const { width, height } = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      letters.current.forEach((letter, index) => {
        try {
          const x = (index % grid.current.columns) * charWidth;
          const y = Math.floor(index / grid.current.columns) * charHeight;

          ctx.fillStyle = letter.color;
          ctx.fillText(letter.char, x, y);
        } catch (error) {
          if (process.env.NODE_ENV === "development" && index === 0) {
            console.warn("Error drawing letter:", error);
          }
        }
      });
    } catch (error) {
      console.error("Error in drawLetters:", error);
    }
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    try {
      let needsRedraw = false;
      letters.current.forEach((letter) => {
        if (letter.colorProgress < 1) {
          letter.colorProgress += 0.05;
          if (letter.colorProgress > 1) letter.colorProgress = 1;

          const startRgb = hexToRgb(letter.color);
          const endRgb = hexToRgb(letter.targetColor);
          if (startRgb && endRgb) {
            letter.color = interpolateColor(
              startRgb,
              endRgb,
              letter.colorProgress
            );
            needsRedraw = true;
          }
        }
      });

      if (needsRedraw) {
        drawLetters();
      }
    } catch (error) {
      console.error("Error in handleSmoothTransitions:", error);
    }
  };

  const animate = () => {
    try {
      const now = Date.now();
      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTime.current = now;
      }

      if (smooth) {
        handleSmoothTransitions();
      }

      animationRef.current = requestAnimationFrame(animate);
    } catch (error) {
      console.error("Error in animation frame:", error);

      // Intentar continuar la animación
      try {
        animationRef.current = requestAnimationFrame(animate);
      } catch (secondError) {
        console.error("Failed to recover animation:", secondError);
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn("Canvas ref is null during initialization");
      return;
    }

    try {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Failed to get 2D context from canvas");
        return;
      }

      context.current = ctx;
      resizeCanvas();
      animate();
    } catch (error) {
      console.error("Error initializing canvas:", error);
      return;
    }

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      try {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          try {
            if (animationRef.current) {
              cancelAnimationFrame(animationRef.current);
            }
            resizeCanvas();
            animate();
          } catch (error) {
            console.error("Error in resize handler:", error);
          }
        }, 100);
      } catch (error) {
        console.error("Error setting up resize handler:", error);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      try {
        // Cancelar animación
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }

        // Limpiar timeout
        clearTimeout(resizeTimeout);

        // Remover event listener
        window.removeEventListener("resize", handleResize);

        // Limpiar referencias para GC
        context.current = null;
        letters.current = [];
      } catch (error) {
        console.error("Error during cleanup:", error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  // Usar el tema del contexto
  const bgColor = isDark ? "bg-black" : "bg-gray-100";

  return (
    <div
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${bgColor} overflow-hidden`}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      {outerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"></div>
      )}
      {centerVignette && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"></div>
      )}
    </div>
  );
};

export default LetterGlitch;
