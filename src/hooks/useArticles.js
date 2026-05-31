import { useState, useEffect } from 'react';
import * as api from '../services/api';

// Static fallback articles data
const markStaticContent = item => ({ ...item, __isStaticFallback: true });

const staticArticles = [
  {
    id: 1,
    title: 'Les secrets du pain au levain',
    slug: 'secrets-pain-levain',
    excerpt: 'Découvrez les techniques ancestrales pour un pain parfait.',
    content: 'Le pain au levain est un art qui demande patience et savoir-faire...',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=500&fit=crop',
    category: { name: 'Recettes', slug: 'recettes' },
    author_name: 'Chef Marie',
    reading_time: 5,
    published_at: '2024-01-15'
  },
  {
    id: 2,
    title: 'Pâtisserie de saison : les fruits d\'été',
    slug: 'patisserie-fruits-ete',
    excerpt: 'Nos créations estivales mettent à l\'honneur les fruits frais.',
    content: 'L\'été est la saison idéale pour les pâtisseries aux fruits...',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=500&fit=crop',
    category: { name: 'Actualités', slug: 'actualites' },
    author_name: 'Chef Pierre',
    reading_time: 4,
    published_at: '2024-02-01'
  },
  {
    id: 3,
    title: 'Notre engagement bio et local',
    slug: 'engagement-bio-local',
    excerpt: 'Comment nous sélectionnons nos ingrédients pour une qualité optimale.',
    content: 'Chez Manara, nous croyons en une alimentation responsable...',
    image: 'https://images.unsplash.com/photo-1556217477-d325251ece38?w=800&h=500&fit=crop',
    category: { name: 'Notre Maison', slug: 'notre-maison' },
    author_name: 'Équipe Manara',
    reading_time: 3,
    published_at: '2024-02-10'
  }
].map(markStaticContent);

/**
 * Hook to fetch articles from API with fallback to static data
 */
export function useArticles(params = {}) {
  const [articles, setArticles] = useState(staticArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingApi, setUsingApi] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const data = await api.getArticles(params);
        const articleList = data.results || data;
        // Only use API data if it has actual content
        if (articleList && Array.isArray(articleList) && articleList.length > 0) {
          setArticles(articleList);
          setUsingApi(true);
        } else {
          console.log('API returned empty articles, using static data');
          setArticles(staticArticles);
        }
      } catch (err) {
        console.log('Using static articles (API unavailable)');
        setArticles(staticArticles);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [params.category, params.search]);

  return { articles, loading, error, usingApi };
}

/**
 * Hook to fetch a single article by slug
 */
export function useArticle(slug) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function fetchArticle() {
      setLoading(true);
      try {
        const data = await api.getArticleBySlug(slug);
        setArticle(data);
      } catch (err) {
        // Fallback to static data
        const staticArticle = staticArticles.find(a => a.slug === slug);
        setArticle(staticArticle || null);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  return { article, loading, error };
}

/**
 * Hook to fetch featured articles
 */
export function useFeaturedArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await api.getFeaturedArticles();
        if (data && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(staticArticles.slice(0, 3));
        }
      } catch (err) {
        console.log('Using static featured articles (API unavailable)');
        setArticles(staticArticles.slice(0, 3));
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return { articles, loading, error };
}

/**
 * Hook to fetch latest articles
 */
export function useLatestArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const data = await api.getLatestArticles();
        if (data && data.length > 0) {
          setArticles(data);
        } else {
          setArticles(staticArticles);
        }
      } catch (err) {
        console.log('Using static latest articles (API unavailable)');
        setArticles(staticArticles);
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchLatest();
  }, []);

  return { articles, loading, error };
}
