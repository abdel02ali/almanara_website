import { useState, useEffect } from 'react';
import * as api from '../services/api';

// ============================================
// Static fallback data (used when API is unavailable)
// ============================================

const staticWeddingTypes = [
  {
    id: 1,
    name: 'Wedding / Birth Party',
    description: 'Celebrate the joy of new life with beautifully crafted cakes and pastries.',
    icon: '🎂',
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&h=400&fit=crop',
    order: 1
  },
  {
    id: 2,
    name: 'Marriage Contract Party',
    description: 'Mark the official union with elegant and memorable sweet creations.',
    icon: '💍',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=400&fit=crop',
    order: 2
  },
  {
    id: 3,
    name: 'Anniversary',
    description: 'Celebrate milestones with personalized pastries that capture your love story.',
    icon: '🥂',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
    order: 3
  },
  {
    id: 4,
    name: 'Engagement Party',
    description: 'Set the tone for your journey together with stunning bespoke desserts.',
    icon: '✨',
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&h=400&fit=crop',
    order: 4
  },
  {
    id: 5,
    name: 'Henna Night',
    description: 'Complement the magic of your henna celebration with artful sweets.',
    icon: '🌙',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop',
    order: 5
  },
  {
    id: 6,
    name: 'And More...',
    description: 'Whatever your celebration, we craft the perfect sweet experience for you.',
    icon: '🎉',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    order: 6
  }
];

// ============================================
// WEDDING TYPES HOOK
// ============================================

export function useWeddingTypes() {
  const [weddingTypes, setWeddingTypes] = useState(staticWeddingTypes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getWeddingTypes();
        const list = data.results || data;
        if (Array.isArray(list) && list.length > 0) {
          setWeddingTypes(list.map(type => ({ ...type, _fromApi: true })));
        }
      } catch (err) {
        console.log('API wedding types unavailable, using static data');
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { weddingTypes, loading, error };
}

// ============================================
// WEDDING CATEGORIES WITH ITEMS HOOK
// ============================================

export function useWeddingCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getWeddingCategories();
        const list = data.results || data;
        if (Array.isArray(list) && list.length > 0) {
          setCategories(list);
        }
      } catch (err) {
        console.log('API wedding categories unavailable');
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { categories, loading, error };
}

