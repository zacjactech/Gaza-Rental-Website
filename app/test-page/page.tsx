"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function TestPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p className="mb-4">This is a simple test page to verify rendering works correctly.</p>
      
      <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 mb-4">
        <p className="mb-2">Counter: {count}</p>
        <Button onClick={() => setCount(count + 1)}>Increase Count</Button>
      </div>
      
      <p>If you can see this page and interact with the counter, basic rendering is working.</p>
    </div>
  );
} 