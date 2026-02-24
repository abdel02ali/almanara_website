import { useState, useEffect } from 'react';
import * as api from '../services/api';
import { products as staticProducts, categories as staticCategories, getFeaturedProducts as getStaticFeatured } from '../data/products';

// ============================================
// Shared cache to avoid multiple API calls
// Cache expires after 30 seconds to pick up admin changes
// ============================================
let _apiCategoriesCache = null;
let _apiProductsCache = null;
let _cacheTime = 0;
const CACHE_TTL = 30000; // 30 seconds

function isCacheValid() {
  return Date.now() - _cacheTime < CACHE_TTL;
}

function resetCache() {
  _apiCategoriesCache = null;
  _apiProductsCache = null;
  _cacheTime = Date.now();
}

async function fetchAllApiCategories() {
  if (_apiCategoriesCache && isCacheValid()) return _apiCategoriesCache;
  try {
    const data = await api.getCategories();
    // Handle paginated response (DRF wraps in {count, results})
    const list = data.results || data;
    if (list && Array.isArray(list) && list.length > 0) {
      _apiCategoriesCache = list;
      _cacheTime = Date.now();
      return list;
    }
  } catch (err) {
    console.log('API categories unavailable');
  }
  return [];
}

async function fetchAllApiProducts() {
  if (_apiProductsCache && isCacheValid()) return _apiProductsCache;
  try {
    const data = await api.getProducts();
    const list = data.results || data;
    if (Array.isArray(list) && list.length > 0) {
      _apiProductsCache = list.map(p => ({
        ...p,
        category: p.category_slug || p.category,
        _fromApi: true
      }));
      _cacheTime = Date.now();
      return _apiProductsCache;
    }
  } catch (err) {
    console.log('API products unavailable');
  }
  return [];
}

/**
 * Merge API items with static items, API first, no duplicates
 */
function mergeItems(apiItems, staticItems) {
  const apiSlugs = new Set(apiItems.map(i => i.slug).filter(Boolean));
  const apiIds = new Set(apiItems.map(i => String(i.id)));
  
  const uniqueStatic = staticItems.filter(item => {
    const id = String(item.id);
    const slug = item.slug || '';
    return !apiSlugs.has(id) && !apiSlugs.has(slug) && !apiIds.has(id);
  });
  
  return [...apiItems, ...uniqueStatic];
}

// ============================================
// CATEGORIES
// ============================================

export function useCategories() {
  const [categories, setCategories] = useState(staticCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const apiCategories = await fetchAllApiCategories();
        if (apiCategories.length > 0) {
          setCategories(mergeItems(apiCategories, staticCategories));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { categories, loading, error };
}

// ============================================
// ALL PRODUCTS (for Boutique page)
// ============================================

export function useProducts(params = {}) {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const apiProducts = await fetchAllApiProducts();
        if (apiProducts.length > 0) {
          let merged = mergeItems(apiProducts, staticProducts);
          
          if (params.category) {
            merged = merged.filter(p => 
              p.category === params.category || 
              p.category_slug === params.category
            );
          }
          setProducts(merged);
        } else {
          let filtered = staticProducts;
          if (params.category) {
            filtered = staticProducts.filter(p => p.category === params.category);
          }
          setProducts(filtered);
        }
      } catch (err) {
        setError(err);
        let filtered = staticProducts;
        if (params.category) {
          filtered = staticProducts.filter(p => p.category === params.category);
        }
        setProducts(filtered);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.category, params.search, params.ordering]);

  return { products, loading, error };
}

// ============================================
// FEATURED PRODUCTS (for Home page)
// ============================================

export function useFeaturedProducts() {
  const [products, setProducts] = useState(getStaticFeatured());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getFeaturedProducts();
        if (data && Array.isArray(data) && data.length > 0) {
          const apiProducts = data.map(p => ({
            ...p,
            category: p.category_slug || p.category,
            _fromApi: true
          }));
          setProducts(mergeItems(apiProducts, getStaticFeatured()));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { products, loading, error };
}

// ============================================
// SINGLE PRODUCT
// ============================================

export function useProduct(slug) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      setLoading(true);
      try {
        const data = await api.getProductBySlug(slug);
        setProduct(data);
      } catch (err) {
        const staticProduct = staticProducts.find(p => p.id === slug || p.slug === slug);
        setProduct(staticProduct || null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  return { product, loading, error };
}

// ============================================
// CATEGORY PRODUCTS (for BoutiqueCategory page)
// Fetches ALL products + ALL categories, then matches locally
// ============================================

export function useCategoryProducts(categorySlug) {
  const normalizedCategorySlug = String(categorySlug);

  // Find static category and products
  const staticCategory = staticCategories.find(c =>
    String(c.id) === normalizedCategorySlug || String(c.slug) === normalizedCategorySlug
  );
  const staticCategoryProducts = staticProducts.filter(
    p => String(p.category) === normalizedCategorySlug
  );

  const [category, setCategory] = useState(staticCategory || null);
  const [products, setProducts] = useState(staticCategoryProducts);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!normalizedCategorySlug) return;

    async function load() {
      setLoading(true);
      setError(null);
      // Immediately sync UI to the newly selected category so header background updates
      setCategory(staticCategory || null);
      setProducts(staticCategoryProducts);
      try {
        // Fetch ALL API categories and ALL API products
        const [apiCategories, apiProducts] = await Promise.all([
          fetchAllApiCategories(),
          fetchAllApiProducts()
        ]);

        // Find the matching API category by slug, id, or name
        const apiCategory = apiCategories.find(c => 
          String(c.slug) === normalizedCategorySlug || 
          String(c.id) === normalizedCategorySlug ||
          c.name?.toLowerCase() === staticCategory?.name?.toLowerCase()
        );

        // Use API category info if found, otherwise keep static
        if (apiCategory) {
          setCategory(apiCategory);
        }

        // Filter API products that belong to this category
        // Match by: category_slug, category_name, or the API category's slug/id
        const matchingApiProducts = apiProducts.filter(p => {
          // Direct slug match
          if (
            String(p.category_slug) === normalizedCategorySlug ||
            String(p.category) === normalizedCategorySlug
          ) return true;
          // Match via API category
          if (apiCategory) {
            if (String(p.category_slug) === String(apiCategory.slug)) return true;
            if (String(p.category) === String(apiCategory.id)) return true;
            if (p.category_name === apiCategory.name) return true;
          }
          // Match via static category name
          if (staticCategory && p.category_name === staticCategory.name) return true;
          return false;
        });

        // Merge API products with static products for this category
        const merged = mergeItems(matchingApiProducts, staticCategoryProducts);
        setProducts(merged);

      } catch (err) {
        console.log(`Error fetching category ${normalizedCategorySlug}, using static data`);
        setError(err);
        // Keep static data (already set as initial state)
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [normalizedCategorySlug]);

  return { category, products, loading, error };
}
