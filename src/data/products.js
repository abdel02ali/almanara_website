import { publicAssetPath } from '../utils/publicAssetPath'

// Product data for Al Manara Bakery
export const products = [
  // ============================================
  // PAIN
  // ============================================
  {
    id: 'pain-tradition',
    name: 'Baguette Tradition',
    description: 'Notre baguette tradition au levain naturel, croûte croustillante et mie alvéolée.',
    price: 1.40,
    category: 'pain',
    image: publicAssetPath('pictures/bag.jpeg'),
    badge: 'Signature'
  },
  {
    id: 'pain-campagne',
    name: 'Pain de Campagne',
    description: 'Pain rustique à la farine de seigle, parfait pour accompagner fromages et charcuteries.',
    price: 4.20,
    category: 'pain',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'pain-cereales',
    name: 'Pain aux Céréales',
    description: 'Pain complet aux graines de tournesol, lin et sésame. Riche en fibres.',
    price: 4.80,
    category: 'pain',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'pain-noix',
    name: 'Pain aux Noix',
    description: 'Pain moelleux garni de noix du Périgord. Idéal avec le roquefort.',
    price: 5.50,
    category: 'pain',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'pain-olive',
    name: 'Pain aux Olives',
    description: 'Pain moelleux aux olives noires et herbes de Provence.',
    price: 5.00,
    category: 'pain',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop&q=75&auto=format'
  },

  // ============================================
  // TRADITIONNEL
  // ============================================
  {
    id: 'msemen',
    name: 'Msemen',
    description: 'Crêpe feuilletée marocaine, croustillante et fondante, idéale pour le petit-déjeuner.',
    price: 1.50,
    category: 'traditionnel',
    image: publicAssetPath('pictures/msemen.jpeg'),
    badge: 'Best-seller'
  },
  {
    id: 'baghrir',
    name: 'Baghrir',
    description: 'Crêpe aux mille trous, légère et spongieuse, servie avec du miel et du beurre.',
    price: 1.20,
    category: 'traditionnel',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'harcha',
    name: 'Harcha',
    description: 'Galette de semoule dorée et croustillante, parfaite avec du thé à la menthe.',
    price: 1.50,
    category: 'traditionnel',
    image: 'https://images.unsplash.com/photo-1620921568790-c1cf8984624c?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'cornes-gazelle',
    name: 'Cornes de Gazelle',
    description: 'Pâtisserie en forme de croissant garnie de pâte d\'amande parfumée à la fleur d\'oranger.',
    price: 2.50,
    category: 'traditionnel',
    image: publicAssetPath('pictures/ghzal.jpeg'),
    badge: 'Signature'
  },
  {
    id: 'chebakia',
    name: 'Chebakia',
    description: 'Pâtisserie marocaine au miel et graines de sésame, incontournable du Ramadan.',
    price: 2.00,
    category: 'traditionnel',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'briouates',
    name: 'Briouates aux Amandes',
    description: 'Triangles croustillants de feuille de brick garnis d\'amandes et parfumés au miel.',
    price: 2.20,
    category: 'traditionnel',
    image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=300&fit=crop&q=75&auto=format'
  },

  // ============================================
  // PÂTISSERIES
  // ============================================
  {
    id: 'eclair-chocolat',
    name: 'Éclair au Chocolat',
    description: 'Pâte à choux garnie de crème pâtissière au chocolat Valrhona.',
    price: 4.50,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'tarte-citron',
    name: 'Tarte au Citron',
    description: 'Pâte sablée, crème au citron de Menton et meringue italienne.',
    price: 5.80,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Signature'
  },
  {
    id: 'paris-brest',
    name: 'Paris-Brest',
    description: 'Couronne de pâte à choux, crème pralinée aux noisettes du Piémont.',
    price: 6.50,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'millefeuille',
    name: 'Millefeuille Vanille',
    description: 'Trois couches de feuilletage caramélisé, crème légère à la vanille Bourbon.',
    price: 6.20,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'fraisier',
    name: 'Fraisier',
    description: 'Génoise, crème mousseline et fraises fraîches de saison.',
    price: 5.90,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Saison'
  },
  {
    id: 'croissant',
    name: 'Croissant Pur Beurre',
    description: 'Croissant feuilleté au beurre AOP Charentes-Poitou. Doré à souhait.',
    price: 1.30,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Best-seller'
  },
  {
    id: 'pain-chocolat',
    name: 'Pain au Chocolat',
    description: 'Viennoiserie feuilletée garnie de deux barres de chocolat noir 70%.',
    price: 1.50,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Best-seller'
  },

  // ============================================
  // CHOCOLATS
  // ============================================
  {
    id: 'fondant-chocolat',
    name: 'Fondant au Chocolat',
    description: 'Gâteau au chocolat noir intense, cœur coulant, servi tiède.',
    price: 5.50,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Signature'
  },
  {
    id: 'mousse-chocolat',
    name: 'Mousse au Chocolat',
    description: 'Mousse aérienne au chocolat noir Valrhona 64%, légèrement amère.',
    price: 4.80,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'opera',
    name: 'Opéra',
    description: 'Biscuit joconde, ganache chocolat et crème au café. Un classique revisité.',
    price: 7.50,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'chocolat-chaud',
    name: 'Chocolat Chaud',
    description: 'Chocolat Valrhona fondu dans du lait entier, chantilly maison.',
    price: 4.50,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'brownie',
    name: 'Brownie Noix de Pécan',
    description: 'Brownie fondant aux pépites de chocolat et noix de pécan caramélisées.',
    price: 3.80,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'truffe-chocolat',
    name: 'Truffes Artisanales',
    description: 'Assortiment de truffes au chocolat noir, lait et praliné. Boîte de 6.',
    price: 8.90,
    category: 'chocolats',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400&h=300&fit=crop&q=75&auto=format'
  },

  // ============================================
  // JUS
  // ============================================
  {
    id: 'jus-orange',
    name: 'Jus d\'Orange Pressé',
    description: 'Oranges fraîchement pressées sur place, sans sucre ajouté.',
    price: 4.00,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop&q=75&auto=format',
    badge: 'Best-seller'
  },
  {
    id: 'jus-avocat',
    name: 'Jus d\'Avocat',
    description: 'Smoothie crémeux à l\'avocat frais, lait et une touche de miel.',
    price: 5.00,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'jus-banane',
    name: 'Jus de Banane',
    description: 'Smoothie onctueux à la banane, lait frais et cannelle.',
    price: 4.50,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'jus-fraise',
    name: 'Jus de Fraise',
    description: 'Fraises fraîches mixées avec une touche de citron. Rafraîchissant.',
    price: 4.50,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'jus-mangue',
    name: 'Jus de Mangue',
    description: 'Smoothie exotique à la mangue fraîche, doux et parfumé.',
    price: 5.50,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&h=300&fit=crop&q=75&auto=format'
  },
  {
    id: 'jus-panache',
    name: 'Panaché de Fruits',
    description: 'Mix de fruits de saison pressés à la commande. Le choix du jour.',
    price: 5.00,
    category: 'jus',
    image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop&q=75&auto=format'
  }
]

export const categories = [
  {
    id: 'pain',
    slug: 'pain',
    name: 'Pain',
    name_ar: 'خبز',
    description: 'Pains artisanaux au levain naturel',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop&q=75&auto=format',
    icon: '◐'
  },
  {
    id: 'traditionnel',
    slug: 'traditionnel',
    name: 'Traditionnel',
    name_ar: 'تقليدي',
    description: 'Recettes marocaines transmises de génération en génération',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&h=400&fit=crop&q=75&auto=format',
    icon: '◆'
  },
  {
    id: 'patisseries',
    slug: 'patisseries',
    name: 'Pâtisseries',
    name_ar: 'حلويات',
    description: 'Éclairs, tartes, viennoiseries et créations sucrées',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop&q=75&auto=format',
    icon: '◇'
  },
  {
    id: 'chocolats',
    slug: 'chocolats',
    name: 'Chocolats',
    name_ar: 'شوكولاتة',
    description: 'Fondants, mousses, truffes et douceurs chocolatées',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop&q=75&auto=format',
    icon: '◈'
  },
  {
    id: 'jus',
    slug: 'jus',
    name: 'Jus',
    name_ar: 'عصائر',
    description: 'Jus frais pressés et smoothies de fruits',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&h=400&fit=crop&q=75&auto=format',
    icon: '○'
  }
]

export const getProductsByCategory = (categoryId) => {
  return products.filter(p => p.category === categoryId)
}

export const getProductById = (id) => {
  return products.find(p => p.id === id)
}

export const getFeaturedProducts = () => {
  return products.filter(p => p.badge === 'Signature' || p.badge === 'Best-seller')
}
