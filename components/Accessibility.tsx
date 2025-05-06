"use client";

import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { accessibilityTranslations } from '@/translations/accessibility';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { 
  Eye, 
  Volume2, 
  Text, 
  Contrast, 
  Keyboard, 
  Ear 
} from 'lucide-react';

interface AccessibilityProps {
  onFontSizeChange?: (size: number) => void;
  onContrastChange?: (highContrast: boolean) => void;
  onKeyboardNavigation?: (enabled: boolean) => void;
  onScreenReader?: (enabled: boolean) => void;
}

export function Accessibility({
  onFontSizeChange,
  onContrastChange,
  onKeyboardNavigation,
  onScreenReader,
}: AccessibilityProps) {
  const { language } = useLanguage();
  const t = accessibilityTranslations[language];
  const [fontSize, setFontSize] = useState(16);
  const [highContrast, setHighContrast] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  useEffect(() => {
    if (onFontSizeChange) {
      onFontSizeChange(fontSize);
    }
  }, [fontSize, onFontSizeChange]);

  useEffect(() => {
    if (onContrastChange) {
      onContrastChange(highContrast);
    }
  }, [highContrast, onContrastChange]);

  useEffect(() => {
    if (onKeyboardNavigation) {
      onKeyboardNavigation(keyboardNav);
    }
  }, [keyboardNav, onKeyboardNavigation]);

  useEffect(() => {
    if (onScreenReader) {
      onScreenReader(screenReader);
    }
  }, [screenReader, onScreenReader]);

  const handleFontSizeChange = (delta: number) => {
    setFontSize(prev => Math.max(12, Math.min(24, prev + delta)));
  };

  return (
    <div className="fixed bottom-4 left-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFontSizeChange(-1)}
          aria-label={t.decreaseFont}
        >
          <Text className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleFontSizeChange(1)}
          aria-label={t.increaseFont}
        >
          <Text className="h-4 w-4" />
        </Button>
      </div>

      <Toggle
        pressed={highContrast}
        onPressedChange={setHighContrast}
        aria-label={t.highContrast}
      >
        <Contrast className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={keyboardNav}
        onPressedChange={setKeyboardNav}
        aria-label={t.keyboardNav}
      >
        <Keyboard className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={screenReader}
        onPressedChange={setScreenReader}
        aria-label={t.screenReader}
      >
        <Ear className="h-4 w-4" />
      </Toggle>
    </div>
  );
} 