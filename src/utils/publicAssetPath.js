export function publicAssetPath(path) {
  const base = import.meta.env.BASE_URL || '/'
  const normalizedPath = String(path).replace(/^\/+/, '')
  return `${base}${normalizedPath}`
}
