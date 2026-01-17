declare module 'grained' {
  interface GrainedOptions {
    animate?: boolean;
    patternWidth?: number;
    patternHeight?: number;
    grainOpacity?: number;
    grainDensity?: number;
    grainWidth?: number;
    grainHeight?: number;
  }

  function grained(element: string | HTMLElement, options?: GrainedOptions): void;

  export = grained;
}
