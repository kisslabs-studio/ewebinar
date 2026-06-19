"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import "./hero-globe.css";

const markerSize = 0.04;

const worldCities: [number, number][] = [
  [37.7749, -122.4194],
  [40.7128, -74.006],
  [19.4326, -99.1332],
  [-23.5505, -46.6333],
  [51.5072, -0.1276],
  [48.8566, 2.3522],
  [52.52, 13.405],
  [-33.9249, 18.4241],
  [25.2048, 55.2708],
  [1.3521, 103.8198],
  [35.6762, 139.6503],
  [-33.8688, 151.2093],
];

const markers = worldCities.map((location) => ({
  location,
  size: markerSize,
}));

const arcs = [
  { from: worldCities[0], to: worldCities[4] },
  { from: worldCities[1], to: worldCities[3] },
  { from: worldCities[4], to: worldCities[8] },
  { from: worldCities[8], to: worldCities[10] },
  { from: worldCities[9], to: worldCities[11] },
];

export function HeroGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let phi = 0.55;
    let frame = 0;
    let globe: ReturnType<typeof createGlobe> | undefined;

    const mount = () => {
      const size = Math.round(wrapper.getBoundingClientRect().width);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (!size) return;

      cancelAnimationFrame(frame);
      globe?.destroy();

      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: size * dpr,
        height: size * dpr,
        phi,
        theta: 0.2,
        dark: 0,
        diffuse: 3,
        mapSamples: 13000,
        mapBrightness: 6,
        scale: 1.08,
        baseColor: [1, 1, 1],
        markerColor: [0.03, 0.2, 0.82],
        glowColor: [0.93, 0.95, 1],
        markers,
        arcs,
        arcColor: [0.03, 0.2, 0.82],
        arcHeight: 0.25,
        arcWidth: 0.4,
        markerElevation: 0.01,
      });

      canvas.style.opacity = "1";

      const animate = () => {
        if (!reduceMotion.matches && globe) {
          phi += 0.0025;
          globe.update({ phi });
        }
        frame = requestAnimationFrame(animate);
      };

      animate();
    };

    const observer = new ResizeObserver(mount);
    observer.observe(wrapper);
    mount();

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      globe?.destroy();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hero-globe" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
