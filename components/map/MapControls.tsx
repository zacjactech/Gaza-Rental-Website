"use client";

import { useEffect, useRef } from 'react';
import type L from 'leaflet';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Locate } from 'lucide-react';

interface MapControlsProps {
  map: L.Map | null;
}

export function MapControls({ map }: MapControlsProps) {
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!map || !controlsRef.current) return;

    const controls = controlsRef.current;
    const zoomIn = controls.querySelector('[data-action="zoom-in"]');
    const zoomOut = controls.querySelector('[data-action="zoom-out"]');
    const locate = controls.querySelector('[data-action="locate"]');

    const handleZoomIn = () => {
      map.zoomIn();
    };

    const handleZoomOut = () => {
      map.zoomOut();
    };

    const handleLocate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            map.setView(
              [position.coords.latitude, position.coords.longitude],
              map.getZoom()
            );
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      }
    };

    zoomIn?.addEventListener('click', handleZoomIn);
    zoomOut?.addEventListener('click', handleZoomOut);
    locate?.addEventListener('click', handleLocate);

    return () => {
      zoomIn?.removeEventListener('click', handleZoomIn);
      zoomOut?.removeEventListener('click', handleZoomOut);
      locate?.removeEventListener('click', handleLocate);
    };
  }, [map]);

  return (
    <div
      ref={controlsRef}
      className="absolute bottom-4 right-4 flex flex-col gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        data-action="zoom-in"
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        data-action="zoom-out"
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        data-action="locate"
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm"
      >
        <Locate className="h-4 w-4" />
      </Button>
    </div>
  );
} 