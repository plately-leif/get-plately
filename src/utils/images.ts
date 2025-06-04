/**
 * Safely extracts a URL from an image object or string
 * @param image The image which can be a string, an object with a url property, or undefined
 * @returns The image URL or an empty string if not available
 */
export function getImageUrl(image?: string | { url: string } | null): string {
  if (!image) return '';
  return typeof image === 'string' ? image : image.url || '';
}
