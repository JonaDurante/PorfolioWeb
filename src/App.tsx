import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import LetterGlitch from "./components/effects/LetterGlitch";
import Footer from "./components/Footer";

export function App() {
  const [bgPalette, setBgPalette] = useState(["#2b4539", "#61dca3", "#61b3dc"]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const updateBg = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
      setBgPalette(
        dark
          ? ["#2b4539", "#61dca3", "#61b3dc"]
          : ["#f0f0f0", "#1a202c", "#166534"]
      );
    };

    updateBg();

    const observer = new MutationObserver(updateBg);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <LetterGlitch
            key={bgPalette.join("-")}
            glitchColors={bgPalette}
            glitchSpeed={50}
            centerVignette={isDark}
            outerVignette={isDark}
            smooth={true}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
          />
          <div className="flex flex-col min-h-screen relative z-10">
            <Header />
            <main className="flex-1 w-full px-4 py-8 mx-auto">
              <Routes>
                <Route path="/" element={<AboutMe />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
