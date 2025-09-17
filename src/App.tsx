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
        <div className="min-h-screen w-full transition-colors duration-200 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <Header />
          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <AboutMe />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <footer className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Jonathan Durante - Portfolio
          </footer>
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}
