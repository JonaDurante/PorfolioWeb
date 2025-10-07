import { useTheme } from "../contexts/ThemeContext";

const LoadingSpinner = () => {
  const { isDark } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] p-8">
      <div className="relative">
        <div
          className={`w-12 h-12 border-4 border-solid rounded-full animate-spin ${
            isDark
              ? "border-gray-700 border-t-blue-400"
              : "border-gray-300 border-t-blue-600"
          }`}
        />
      </div>

      <p
        className={`mt-4 text-sm font-medium ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Cargando...
      </p>

      <div className="flex space-x-1 mt-2">
        <div
          className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? "bg-blue-400" : "bg-blue-600"
          }`}
          style={{ animationDelay: "0ms" }}
        />
        <div
          className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? "bg-blue-400" : "bg-blue-600"
          }`}
          style={{ animationDelay: "150ms" }}
        />
        <div
          className={`w-2 h-2 rounded-full animate-bounce ${
            isDark ? "bg-blue-400" : "bg-blue-600"
          }`}
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
