import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export function App() {
  const [bgImage, setBgImage] = useState("/bg-withe.png");

  useEffect(() => {
    const updateBg = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setBgImage(isDark ? "/bg-dark.png" : "/bg-white.png");
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
          <div
            className="flex flex-col min-h-screen relative"
            style={{
              backgroundImage: `url('${bgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="flex flex-col min-h-screen bg.transparent relative">
              <Header />
              <main className="bg-transparent flex-1 flex items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10">
                <Routes>
                  <Route path="/" element={<AboutMe />} />
                  <Route path="/experience" element={<Experience />} />
                  <Route path="/skills" element={<Skills />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <footer className="bg-transparent max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 text-center text-sm text-gray-100 dark:text-gray-100 w-full relative z-10">
                © {new Date().getFullYear()} Jonathan Durante - Portfolio
              </footer>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
