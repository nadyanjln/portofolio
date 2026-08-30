/**
 * Default fallback images for projects and avatars
 */
export const DEFAULT_PROJECT_IMAGE = 
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80'

export const DEFAULT_AVATAR_IMAGE = 
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'

/**
 * Handle image error and fallback smoothly
 * @param {Event} event 
 * @param {string} fallbackUrl 
 */
export function handleImageError(event, fallbackUrl = DEFAULT_PROJECT_IMAGE) {
  if (event?.target && event.target.src !== fallbackUrl) {
    event.target.src = fallbackUrl
  }
}

/**
 * Get safe image URL or fallback
 * @param {string} url 
 * @param {string} fallback 
 */
export function getSafeImageUrl(url, fallback = DEFAULT_PROJECT_IMAGE) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback
  }
  return url
}
