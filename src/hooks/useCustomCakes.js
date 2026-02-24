import { useState, useEffect } from 'react';
import * as api from '../services/api';

// ============================================
// Static fallback data (used when API is unavailable)
// ============================================

const staticCakeTypes = [
  {
    id: 'anniversaire',
    slug: 'anniversaire',
    title: 'Anniversaires',
    description: 'Des gâteaux magiques pour célébrer chaque année de vie. Du plus classique au plus extravagant.',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop',
    price_from: 35,
    price_unit: ''
  },
  {
    id: 'mariage',
    slug: 'mariage',
    title: 'Mariages',
    description: 'Pièces montées et wedding cakes élégants pour le plus beau jour de votre vie.',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=400&fit=crop',
    price_from: 150,
    price_unit: ''
  },
  {
    id: 'entreprise',
    slug: 'entreprise',
    title: 'Événements d\'entreprise',
    description: 'Buffets sucrés, team building gourmand, célébrations corporate sur mesure.',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
    price_from: 80,
    price_unit: ''
  }
];

const staticProcessSteps = [
  { id: 1, step_number: 1, title: 'Consultation', description: 'Discutons de votre vision, du thème et du nombre d\'invités.', icon: '○' },
  { id: 2, step_number: 2, title: 'Création', description: 'Nous concevons ensemble le design et les saveurs de votre gâteau.', icon: '✎' },
  { id: 3, step_number: 3, title: 'Dégustation', description: 'Testez les saveurs et validez votre choix final.', icon: '◇' },
  { id: 4, step_number: 4, title: 'Livraison', description: 'Nous livrons votre création le jour J, prête à émerveiller.', icon: '★' }
];

const staticCakeDetails = {
  anniversaire: {
    title: 'Gâteaux d\'Anniversaire',
    description: 'Des créations uniques pour célébrer chaque année de vie avec gourmandise.',
    hero_image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=1920&h=800&fit=crop',
    price_unit: '',
    gallery_items: [
      { image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop', title: 'Number Cake', price: 45 },
      { image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop', title: 'Gâteau Licorne', price: 55 },
      { image: 'https://images.unsplash.com/photo-1562777717-dc6984f65a63?w=400&h=400&fit=crop', title: 'Layer Cake Chocolat', price: 48 },
      { image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=400&h=400&fit=crop', title: 'Drip Cake Fruits', price: 52 },
      { image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&h=400&fit=crop', title: 'Gâteau Photo', price: 60 },
      { image: 'https://images.unsplash.com/photo-1557979619-445218f326b9?w=400&h=400&fit=crop', title: 'Naked Cake', price: 42 }
    ],
    flavors: [
      { name: 'Vanille' }, { name: 'Chocolat' }, { name: 'Fraise' }, { name: 'Citron' },
      { name: 'Caramel' }, { name: 'Fruits rouges' }, { name: 'Praliné' }
    ]
  },
  mariage: {
    title: 'Wedding Cakes',
    description: 'Pièces montées et wedding cakes élégants pour le plus beau jour de votre vie.',
    hero_image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1920&h=800&fit=crop',
    price_unit: '',
    gallery_items: [
      { image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop', title: 'Wedding Cake Floral', price: 250 },
      { image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&h=400&fit=crop', title: 'Pièce Montée Classic', price: 180 },
      { image: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?w=400&h=400&fit=crop', title: 'Nude Cake Romantique', price: 200 },
      { image: 'https://images.unsplash.com/photo-1519654793190-2e8a4806f1f2?w=400&h=400&fit=crop', title: 'Gold & White', price: 350 }
    ],
    flavors: [
      { name: 'Vanille Bourbon' }, { name: 'Chocolat Grand Cru' }, { name: 'Fruits de la passion' },
      { name: 'Rose & Litchi' }, { name: 'Caramel beurre salé' }
    ]
  },
  entreprise: {
    title: 'Événements Corporate',
    description: 'Des prestations sucrées sur mesure pour vos événements professionnels.',
    hero_image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1920&h=800&fit=crop',
    price_unit: '/pers.',
    gallery_items: [
      { image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop', title: 'Buffet Mignardises', price: 15 },
      { image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=400&fit=crop', title: 'Cupcakes Logo', price: 5 },
      { image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=400&h=400&fit=crop', title: 'Macarons Assortis', price: 2.5 },
      { image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=400&fit=crop', title: 'Gâteau Corporate', price: 120 }
    ],
    flavors: [
      { name: 'Assortiment varié' }, { name: 'Thématique au choix' }, { name: 'Personnalisation logo' }
    ]
  }
};

// ============================================
// CUSTOM CAKE TYPES (for GateauxSurMesure page)
// ============================================

export function useCustomCakeTypes() {
  const [cakeTypes, setCakeTypes] = useState(staticCakeTypes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getCustomCakeTypes();
        const list = data.results || data;
        if (Array.isArray(list) && list.length > 0) {
          setCakeTypes(list);
        }
      } catch (err) {
        console.log('API custom cake types unavailable, using static data');
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { cakeTypes, loading, error };
}

// ============================================
// PROCESS STEPS (for GateauxSurMesure page)
// ============================================

export function useProcessSteps() {
  const [steps, setSteps] = useState(staticProcessSteps);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProcessSteps();
        const list = data.results || data;
        if (Array.isArray(list) && list.length > 0) {
          setSteps(list);
        }
      } catch (err) {
        console.log('API process steps unavailable, using static data');
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { steps, loading, error };
}

// ============================================
// CUSTOM CAKE TYPE DETAIL (for GateauxCategory page)
// ============================================

export function useCustomCakeDetail(slug) {
  const staticData = staticCakeDetails[slug] || null;
  const [cakeDetail, setCakeDetail] = useState(staticData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    async function load() {
      setLoading(true);
      try {
        const data = await api.getCustomCakeTypeBySlug(slug);
        if (data && data.title) {
          setCakeDetail(data);
        }
      } catch (err) {
        console.log(`API custom cake detail unavailable for ${slug}, using static data`);
        setError(err);
        // Keep static fallback (already set as initial state)
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  return { cakeDetail, loading, error };
}
