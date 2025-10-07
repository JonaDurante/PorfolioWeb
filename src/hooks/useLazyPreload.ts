import { useEffect, useState } from "react";

export interface LazyComponent {
  (): Promise<{ default: React.ComponentType<any> }>;
}

export const useLazyPreload = (
  components: LazyComponent[],
  delay: number = 2000
) => {
  const [preloadedComponents, setPreloadedComponents] = useState<
    Set<LazyComponent>
  >(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      components.forEach((component) => {
        if (!preloadedComponents.has(component)) {
          component()
            .then(() => {
              setPreloadedComponents((prev) => new Set([...prev, component]));
              if (process.env.NODE_ENV === "development") {
                console.log("Lazy component preloaded successfully");
              }
            })
            .catch((error) => {
              if (process.env.NODE_ENV === "development") {
                console.warn("Failed to preload lazy component:", error);
              }
            });
        }
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [components, delay, preloadedComponents]);

  return preloadedComponents;
};

export const useHoverPreload = (componentLoader: LazyComponent) => {
  const [isPreloaded, setIsPreloaded] = useState(false);

  const handleMouseEnter = () => {
    if (!isPreloaded) {
      componentLoader()
        .then(() => {
          setIsPreloaded(true);
          if (process.env.NODE_ENV === "development") {
            console.log("Component preloaded on hover");
          }
        })
        .catch((error) => {
          console.warn("Failed to preload component on hover:", error);
        });
    }
  };

  return { handleMouseEnter, isPreloaded };
};

export const lazyComponentLoaders = {
  AboutMe: () => import("../components/AboutMe"),
  Experience: () => import("../components/Experience"),
  Skills: () => import("../components/Skills"),
  Contact: () => import("../components/Contact"),
  LetterGlitch: () => import("../components/effects/LetterGlitch"),
} as const;
