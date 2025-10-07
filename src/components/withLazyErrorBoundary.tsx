import React, { Component, ErrorInfo, ReactNode } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class LazyErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Lazy loading error:", error);
    console.error("Error info:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <LazyLoadError error={this.state.error} />;
    }

    return this.props.children;
  }
}

const LazyLoadError: React.FC<{ error?: Error }> = ({ error }) => {
  const { isDark } = useTheme();

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[400px] p-8">
      <div
        className={`p-6 rounded-lg border ${
          isDark
            ? "bg-red-900/20 border-red-800 text-red-200"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <h3 className="text-lg font-semibold mb-2">Error de carga</h3>
        <p className="text-sm mb-4">
          No se pudo cargar el componente. Esto podría ser debido a problemas de
          conexión.
        </p>
        {process.env.NODE_ENV === "development" && error && (
          <p className="text-xs mb-4 font-mono bg-black/20 p-2 rounded">
            {error.message}
          </p>
        )}
        <button
          onClick={handleRetry}
          className={`px-4 py-2 rounded font-medium transition-colors ${
            isDark
              ? "bg-red-800 hover:bg-red-700 text-red-200"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          Reintentar
        </button>
      </div>
    </div>
  );
};

export const withLazyErrorBoundary = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WithErrorBoundary = (props: P) => (
    <LazyErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </LazyErrorBoundary>
  );

  WithErrorBoundary.displayName = `withLazyErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name
  })`;

  return WithErrorBoundary;
};

export default LazyErrorBoundary;
