/**
 * Utility functions for handling WebP images and optimization
 */

export interface ImageSource {
  webp?: string
  fallback: string
  alt: string
}

/**
 * Generate optimized image sources with WebP and fallback
 */
export function createImageSource(basePath: string, alt: string): ImageSource {
  const webpPath = basePath.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  
  return {
    webp: webpPath,
    fallback: basePath,
    alt
  }
}

/**
 * Check if WebP is supported by the browser
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image()
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2)
    }
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA'
  })
}

/**
 * Get optimized image URL with Next.js Image Optimization API
 */
export function getOptimizedImageUrl(src: string, width: number, quality = 75): string {
  if (src.startsWith('http')) {
    // External image - use Next.js optimization
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`
  }
  
  // Local image - return as is (Next.js will optimize automatically)
  return src
}

/**
 * Generate responsive image sizes for different breakpoints
 */
export function generateResponsiveSizes(sizes: { [key: string]: string }): string {
  return Object.entries(sizes)
    .map(([breakpoint, size]) => `(${breakpoint}) ${size}`)
    .join(', ')
}

/**
 * Common responsive sizes for gallery images
 */
export const GALLERY_SIZES = generateResponsiveSizes({
  'max-width: 768px': '100vw',
  'max-width: 1200px': '50vw',
  'default': '33vw'
})

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string, priority = false): void {
  if (typeof window === 'undefined') return
  
  const link = document.createElement('link')
  link.rel = priority ? 'preload' : 'prefetch'
  link.as = 'image'
  link.href = src
  
  // Add WebP support check
  supportsWebP().then((supported) => {
    if (supported && src.includes('.webp')) {
      link.type = 'image/webp'
    }
    document.head.appendChild(link)
  })
}