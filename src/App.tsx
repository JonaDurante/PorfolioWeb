import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

export function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800">
            <Header />
            <main className="bg-white dark:bg-gray-800 flex-1 flex items-center justify-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
              <Routes>
                <Route path="/" element={<AboutMe />} />
                <Route path="/experience" element={<Experience />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <footer className="bg-white dark:bg-gray-800 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400 w-full">
              © {new Date().getFullYear()} Jonathan Durante - Portfolio
            </footer>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  );
}
