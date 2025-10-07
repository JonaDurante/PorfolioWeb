import { useTheme } from "../contexts/ThemeContext";

const BackgroundLoader = () => {
  const { isDark } = useTheme();
  const bgColor = isDark ? "bg-black" : "bg-gray-100";

  return (
    <div
      className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${bgColor} overflow-hidden flex items-center justify-center`}
    >
      {/* Loading discreto para fondo */}
      <div className="flex flex-col items-center">
        <div 
          className={`w-8 h-8 border-2 border-solid rounded-full animate-spin ${
            isDark 
              ? 'border-gray-800 border-t-gray-600' 
              : 'border-gray-200 border-t-gray-400'
          }`}
        />
        <p className={`mt-2 text-xs ${
          isDark ? 'text-gray-600' : 'text-gray-400'
        }`}>
          Cargando efectos...
        </p>
      </div>
    </div>
  );
};

export default BackgroundLoader;