import { translations } from '@/translations';

/**
 * Safely gets a translation string from the translations object
 * 
 * @param path - The dot-notation path to the translation (e.g. 'dashboard.landlord.billing.title')
 * @param defaultValue - The fallback value if the translation doesn't exist or isn't a string
 * @param language - The current language; if not provided, will need to pass translations object
 * @param translationsObj - Optional translations object if not using the imported one
 * @returns The translation string or the default value
 */
export function getTranslation(
  path: string, 
  defaultValue: string,
  language?: string,
  translationsObj: any = translations
): string {
  // If language is provided, use it to get the translations for that language
  const t = language ? translationsObj[language] : translationsObj;
  
  if (!t) return defaultValue;
  
  // Split the path into individual keys
  const keys = path.split('.');
  let value: any = t;
  
  // Traverse the object based on the path
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return defaultValue;
    }
  }
  
  // Ensure the final value is a string
  return typeof value === 'string' ? value : defaultValue;
} 