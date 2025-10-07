# Lazy Loading

## Componentes Lazy Loaded

- `AboutMe` - Página de inicio
- `Experience` - Página de experiencia
- `Skills` - Página de habilidades
- `Contact` - Página de contacto
- `LetterGlitch` - Efecto de fondo animado

## Implementación

### Lazy Loading Básico

```typescript
const AboutMe = lazy(() => import("./components/AboutMe"));
const Experience = lazy(() => import("./components/Experience"));
const Skills = lazy(() => import("./components/Skills"));
const Contact = lazy(() => import("./components/Contact"));
```

### Suspense

```jsx
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<AboutMe />} />
  </Routes>
</Suspense>
```

### Precarga

- Automática después de 2 segundos
- Al hover sobre navegación
- Hooks: `useLazyPreload` y `useHoverPreload`
