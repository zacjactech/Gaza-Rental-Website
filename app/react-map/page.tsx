"use client";

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import the ReactLeafletMap component with no SSR
const ReactLeafletMap = dynamic(
  () => import('@/components/MapComponent').then(mod => {
    // Return a wrapper component that adapts MapComponent to the ReactLeafletMap interface
    const Component = (props: any) => {
      // If MapComponent loaded, use it with our adapter
      const { properties, onStatusUpdate, onLogMessage } = props;
      
      // Effect to report status
      useEffect(() => {
        if (onStatusUpdate) onStatusUpdate('Ready');
        if (onLogMessage) onLogMessage('Map component loaded successfully');
      }, [onStatusUpdate, onLogMessage]);
      
      return (
        <div style={{ height: '500px', width: '100%' }}>
          <mod.default 
            properties={properties}
            onMarkerClick={(property: any) => {
              if (onLogMessage) onLogMessage(`Clicked on property: ${property.title}`);
            }}
          />
        </div>
      );
    };
    
    Component.displayName = 'ReactLeafletMapAdapter';
    return Component;
  }),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[500px] bg-gray-100 border border-gray-300 rounded-lg">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-gray-900 border-r-2 border-gray-900 border-b-2 border-gray-900 border-l-2 border-transparent mb-2"></div>
          <p>Loading map component...</p>
        </div>
      </div>
    )
  }
);

export default function ReactMapPage() {
  const [status, setStatus] = useState('Loading');
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  
  const handleMapStatus = (newStatus: string) => {
    setStatus(newStatus);
  };
  
  const handleLogMessage = (message: string) => {
    console.log(`[React Map] ${message}`);
    setDebugLogs(prev => [
      ...prev, 
      `${new Date().toISOString().split('T')[1].split('.')[0]}: ${message}`
    ]);
  };
  
  // Sample property data
  const properties = useMemo(() => [
    {
      id: 1,
      title: 'Modern Apartment in Mikocheni',
      price: 250000,
      currency: 'TZS',
      coordinates: [-6.7735, 39.2695] as [number, number],
    },
    {
      id: 2,
      title: 'Luxury Villa in Masaki',
      price: 450000,
      currency: 'TZS',
      coordinates: [-6.7449, 39.2795] as [number, number],
    },
    {
      id: 3,
      title: 'Cozy Studio in Upanga',
      price: 180000, 
      currency: 'TZS',
      coordinates: [-6.8122, 39.2892] as [number, number],
    },
  ], []);
  
  useEffect(() => {
    handleLogMessage('Page mounted');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">React-Leaflet Map Solution</h1>
      
      <p className="mb-4">This page uses the react-leaflet library instead of direct Leaflet integration.</p>
      
      <div className="flex space-x-4 mb-6">
        <Link href="/map-view" className="px-4 py-2 bg-blue-500 text-white rounded">
          Original Map
        </Link>
        <Link href="/map-fix" className="px-4 py-2 bg-green-500 text-white rounded">
          Map Fix
        </Link>
      </div>
      
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <p className="font-semibold">Status: <span className={
          status.includes('Error') 
            ? 'text-red-500' 
            : status === 'Ready' 
              ? 'text-green-500' 
              : 'text-yellow-500'
        }>{status}</span></p>
      </div>
      
      <div className="mb-6 bg-white shadow-md rounded overflow-hidden">
        <ReactLeafletMap 
          properties={properties}
          onStatusUpdate={handleMapStatus}
          onLogMessage={handleLogMessage}
        />
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Debug Logs</h2>
        <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
          {debugLogs.map((log, index) => (
            <div key={index} className="mb-1">{log}</div>
          ))}
          {debugLogs.length === 0 && <div className="text-gray-500">No logs yet...</div>}
        </div>
      </div>
    </div>
  );
} 