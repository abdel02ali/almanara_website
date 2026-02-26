/**
 * API Service for Manara Bakery
 * Connects React frontend to Django backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// ============================================
// Fast-fail: if the backend is unreachable,
// skip all API calls for 60s instead of hanging.
// ============================================
let _apiDown = false;
let _apiDownSince = 0;
const API_DOWN_TTL = 60000; // retry after 60s

function isApiDown() {
  if (!_apiDown) return false;
  if (Date.now() - _apiDownSince > API_DOWN_TTL) {
    _apiDown = false;
    return false;
  }
  return true;
}

function markApiDown() {
  _apiDown = true;
  _apiDownSince = Date.now();
}

/**
 * Generic fetch wrapper with timeout + error handling
 */
async function fetchAPI(endpoint, options = {}) {
  // Skip immediately if backend was recently unreachable
  if (isApiDown()) {
    throw new Error('API unavailable (cached)');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    // Mark API as down on network/timeout errors (not on 4xx/5xx)
    if (error.name === 'AbortError' || error.message === 'Failed to fetch') {
      markApiDown();
    }
    throw error;
  }
}

// ============================================
// PRODUCTS API
// ============================================

/**
 * Get all categories
 */
export async function getCategories() {
  return fetchAPI('/categories/');
}

/**
 * Get category by slug with its products
 */
export async function getCategoryBySlug(slug) {
  return fetchAPI(`/categories/${slug}/`);
}

/**
 * Get all products
 */
export async function getProducts(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.append('category__slug', params.category);
  if (params.featured) searchParams.append('is_featured', 'true');
  if (params.search) searchParams.append('search', params.search);
  if (params.ordering) searchParams.append('ordering', params.ordering);

  const queryString = searchParams.toString();
  return fetchAPI(`/products/${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug) {
  return fetchAPI(`/products/${slug}/`);
}

/**
 * Get featured products
 */
export async function getFeaturedProducts() {
  return fetchAPI('/products/featured/');
}

/**
 * Get products grouped by category
 */
export async function getProductsByCategory() {
  return fetchAPI('/products/by_category/');
}

// ============================================
// ARTICLES API
// ============================================

/**
 * Get all articles
 */
export async function getArticles(params = {}) {
  const searchParams = new URLSearchParams();

  if (params.category) searchParams.append('category__slug', params.category);
  if (params.featured) searchParams.append('is_featured', 'true');
  if (params.search) searchParams.append('search', params.search);

  const queryString = searchParams.toString();
  return fetchAPI(`/articles/${queryString ? `?${queryString}` : ''}`);
}

/**
 * Get article by slug
 */
export async function getArticleBySlug(slug) {
  return fetchAPI(`/articles/${slug}/`);
}

/**
 * Get featured articles
 */
export async function getFeaturedArticles() {
  return fetchAPI('/articles/featured/');
}

/**
 * Get latest articles
 */
export async function getLatestArticles() {
  return fetchAPI('/articles/latest/');
}

// ============================================
// ORDERS API
// ============================================

/**
 * Create a new order
 */
export async function createOrder(orderData) {
  return fetchAPI('/orders/', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

/**
 * Track order by order number
 */
export async function trackOrder(orderNumber) {
  return fetchAPI(`/orders/track/${orderNumber}/`);
}

// ============================================
// DEVIS (QUOTE) API
// ============================================

/**
 * Submit a quote request
 */
export async function submitDevisRequest(devisData) {
  return fetchAPI('/devis/', {
    method: 'POST',
    body: JSON.stringify(devisData),
  });
}

// ============================================
// GÂTEAUX SUR MESURE (Custom Cakes) API
// ============================================

/**
 * Get all custom cake types
 */
export async function getCustomCakeTypes() {
  return fetchAPI('/custom-cakes/');
}

/**
 * Get custom cake type detail by slug (with gallery and flavors)
 */
export async function getCustomCakeTypeBySlug(slug) {
  return fetchAPI(`/custom-cakes/${slug}/`);
}

/**
 * Get process steps for custom cakes
 */
export async function getProcessSteps() {
  return fetchAPI('/process-steps/');
}

// ============================================
// WEDDING TYPES API
// ============================================

/**
 * Get all wedding types
 */
export async function getWeddingTypes() {
  return fetchAPI('/wedding-types/');
}

/**
 * Get all wedding categories with their items
 */
export async function getWeddingCategories() {
  return fetchAPI('/wedding-categories/');
}

/**
 * Get global static content display settings
 */
export async function getSiteDisplaySettings() {
  // Deliberately bypass fetchAPI fast-fail cache:
  // these toggles must still be fetched even if another endpoint failed.
  const response = await fetch(`${API_BASE_URL}/display-settings/`, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json();
}

// ============================================
// CONTACT API
// ============================================

/**
 * Submit a contact form message
 */
export async function submitContactMessage(contactData) {
  return fetchAPI('/contact/', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
}

// ============================================
// UTILITY: Check if API is available
// ============================================

/**
 * Check if the backend API is reachable
 */
export async function checkAPIHealth() {
  if (isApiDown()) return false;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);
  try {
    await fetch(`${API_BASE_URL}/categories/`, { method: 'HEAD', signal: controller.signal });
    clearTimeout(timeoutId);
    return true;
  } catch {
    clearTimeout(timeoutId);
    markApiDown();
    return false;
  }
}

export default {
  getCategories,
  getCategoryBySlug,
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getProductsByCategory,
  getCustomCakeTypes,
  getCustomCakeTypeBySlug,
  getProcessSteps,
  getWeddingTypes,
  getWeddingCategories,
  getSiteDisplaySettings,
  getArticles,
  getArticleBySlug,
  getFeaturedArticles,
  getLatestArticles,
  createOrder,
  trackOrder,
  submitDevisRequest,
  submitContactMessage,
  checkAPIHealth,
};
