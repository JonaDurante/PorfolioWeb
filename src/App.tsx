import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Header from "./components/Header";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Footer from "./components/Footer";

import LoadingSpinner from "./components/LoadingSpinner";
import BackgroundLoader from "./components/BackgroundLoader";
import LazyErrorBoundary from "./components/withLazyErrorBoundary";
import { useLazyPreload, lazyComponentLoaders } from "./hooks/useLazyPreload";

const LetterGlitch = lazy(() => import("./components/effects/LetterGlitch"));
const AboutMe = lazy(() => import("./components/AboutMe"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));

function AppContent() {
  const { isDark, bgPalette } = useTheme();
  useLazyPreload(
    [
      lazyComponentLoaders.Experience,
      lazyComponentLoaders.Skills,
      lazyComponentLoaders.Contact,
    ],
    2000
  );

  return (
    <BrowserRouter>
      <Suspense fallback={<BackgroundLoader />}>
        <LetterGlitch
          key={bgPalette.join("-")}
          glitchColors={bgPalette}
          glitchSpeed={50}
          centerVignette={isDark}
          outerVignette={isDark}
          smooth={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
      </Suspense>
      <div className="flex flex-col min-h-screen relative z-10">
        <Header />
        <main className="flex flex-auto justify-center items-center w-full p-4 mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<AboutMe />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <LazyErrorBoundary>
          <AppContent />
        </LazyErrorBoundary>
      </ThemeProvider>
    </LanguageProvider>
  );
}
