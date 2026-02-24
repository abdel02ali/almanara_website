// Sample product data
export const products = [
  // Pains
  {
    id: 'pain-tradition',
    name: 'Baguette Tradition',
    description: 'Notre baguette tradition au levain naturel, croûte croustillante et mie alvéolée.',
    price: 1.40,
    category: 'pains',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400&h=300&fit=crop',
    badge: 'Signature'
  },
  {
    id: 'pain-campagne',
    name: 'Pain de Campagne',
    description: 'Pain rustique à la farine de seigle, parfait pour accompagner fromages et charcuteries.',
    price: 4.20,
    category: 'pains',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop'
  },
  {
    id: 'pain-cereales',
    name: 'Pain aux Céréales',
    description: 'Pain complet aux graines de tournesol, lin et sésame. Riche en fibres.',
    price: 4.80,
    category: 'pains',
    image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400&h=300&fit=crop'
  },
  {
    id: 'pain-noix',
    name: 'Pain aux Noix',
    description: 'Pain moelleux garni de noix du Périgord. Idéal avec le roquefort.',
    price: 5.50,
    category: 'pains',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop'
  },
  
  // Viennoiseries
  {
    id: 'croissant',
    name: 'Croissant Pur Beurre',
    description: 'Croissant feuilleté au beurre AOP Charentes-Poitou. Doré à souhait.',
    price: 1.30,
    category: 'viennoiseries',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
    badge: 'Best-seller'
  },
  {
    id: 'pain-chocolat',
    name: 'Pain au Chocolat',
    description: 'Viennoiserie feuilletée garnie de deux barres de chocolat noir 70%.',
    price: 1.50,
    category: 'viennoiseries',
    image: 'https://images.unsplash.com/photo-1530610476181-d83430b64dcd?w=400&h=300&fit=crop',
    badge: 'Best-seller'
  },
  {
    id: 'pain-raisins',
    name: 'Pain aux Raisins',
    description: 'Spirale de pâte feuilletée à la crème pâtissière et raisins secs.',
    price: 1.60,
    category: 'viennoiseries',
    image: 'https://images.unsplash.com/photo-1509365390695-33aee754301f?w=400&h=300&fit=crop'
  },
  {
    id: 'chausson-pommes',
    name: 'Chausson aux Pommes',
    description: 'Feuilletage croustillant garni de compote de pommes maison caramélisée.',
    price: 2.20,
    category: 'viennoiseries',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop'
  },
  {
    id: 'brioche',
    name: 'Brioche Parisienne',
    description: 'Brioche moelleuse et dorée, parfumée à la fleur d\'oranger.',
    price: 3.50,
    category: 'viennoiseries',
    image: 'https://images.unsplash.com/photo-1620921568790-c1cf8984624c?w=400&h=300&fit=crop'
  },
  
  // Pâtisseries
  {
    id: 'eclair-chocolat',
    name: 'Éclair au Chocolat',
    description: 'Pâte à choux garnie de crème pâtissière au chocolat Valrhona.',
    price: 4.50,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1525059337994-31ec387e475c?w=400&h=300&fit=crop'
  },
  {
    id: 'tarte-citron',
    name: 'Tarte au Citron',
    description: 'Pâte sablée, crème au citron de Menton et meringue italienne.',
    price: 5.80,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=300&fit=crop',
    badge: 'Signature'
  },
  {
    id: 'paris-brest',
    name: 'Paris-Brest',
    description: 'Couronne de pâte à choux, crème pralinée aux noisettes du Piémont.',
    price: 6.50,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1612809075925-230094524549?w=400&h=300&fit=crop'
  },
  {
    id: 'millefeuille',
    name: 'Millefeuille Vanille',
    description: 'Trois couches de feuilletage caramélisé, crème légère à la vanille Bourbon.',
    price: 6.20,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&h=300&fit=crop'
  },
  {
    id: 'fraisier',
    name: 'Fraisier',
    description: 'Génoise, crème mousseline et fraises fraîches de saison.',
    price: 5.90,
    category: 'patisseries',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    badge: 'Saison'
  },
  
  // Gâteaux & Entremets
  {
    id: 'opera',
    name: 'Opéra',
    description: 'Biscuit joconde, ganache chocolat et crème au café. Un classique revisité.',
    price: 7.50,
    category: 'gateaux',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
  },
  {
    id: 'foret-noire',
    name: 'Forêt Noire',
    description: 'Génoise chocolat, chantilly, cerises amarena et copeaux de chocolat.',
    price: 38.00,
    category: 'gateaux',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop'
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake New York',
    description: 'Base spéculoos, crème au fromage frais et coulis fruits rouges.',
    price: 35.00,
    category: 'gateaux',
    image: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400&h=300&fit=crop'
  },
  
  // Sandwiches & Salades
  {
    id: 'sandwich-jambon',
    name: 'Sandwich Jambon-Beurre',
    description: 'Baguette tradition, jambon blanc Label Rouge et beurre demi-sel.',
    price: 4.90,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-poulet',
    name: 'Sandwich Poulet César',
    description: 'Ciabatta, poulet rôti, parmesan, salade romaine et sauce césar.',
    price: 6.50,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop'
  },
  {
    id: 'salade-chevre',
    name: 'Salade Chèvre Chaud',
    description: 'Mesclun, chèvre gratiné, noix, miel et vinaigrette balsamique.',
    price: 9.80,
    category: 'salades',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
  },
  
  // Boissons
  {
    id: 'cafe-expresso',
    name: 'Expresso',
    description: 'Café torréfié artisanalement, intense et aromatique.',
    price: 1.80,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=400&h=300&fit=crop'
  },
  {
    id: 'chocolat-chaud',
    name: 'Chocolat Chaud',
    description: 'Chocolat Valrhona fondu dans du lait entier, chantilly maison.',
    price: 4.50,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?w=400&h=300&fit=crop'
  },
  {
    id: 'jus-orange',
    name: 'Jus d\'Orange Pressé',
    description: 'Oranges fraîchement pressées sur place.',
    price: 4.00,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop'
  },
  
  // Promotions
  {
    id: 'galette-rois',
    name: 'Galette des Rois',
    description: 'Feuilletage pur beurre et crème d\'amande. Fève et couronne incluses.',
    price: 25.00,
    oldPrice: 30.00,
    category: 'promotions',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop',
    badge: 'Promo'
  },
  {
    id: 'buche-noel',
    name: 'Bûche de Noël Chocolat',
    description: 'Biscuit roulé, mousse chocolat intense et glaçage miroir.',
    price: 35.00,
    oldPrice: 42.00,
    category: 'promotions',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop',
    badge: 'Saison'
  }
]

export const categories = [
  {
    id: 'pains',
    name: 'Pains',
    description: 'Pains artisanaux au levain naturel',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop',
    icon: '🥖'
  },
  {
    id: 'viennoiseries',
    name: 'Viennoiseries',
    description: 'Croissants, pains au chocolat et brioches',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=400&fit=crop',
    icon: '🥐'
  },
  {
    id: 'patisseries',
    name: 'Pâtisseries',
    description: 'Éclairs, tartes et créations sucrées',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&h=400&fit=crop',
    icon: '🍰'
  },
  {
    id: 'gateaux',
    name: 'Gâteaux & Entremets',
    description: 'Pour vos célébrations et moments spéciaux',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    icon: '🎂'
  },
  {
    id: 'salades',
    name: 'Sandwiches & Salades',
    description: 'Formules déjeuner fraîches et savoureuses',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&h=400&fit=crop',
    icon: '🥪'
  },
  {
    id: 'boissons',
    name: 'Boissons',
    description: 'Cafés, thés et boissons artisanales',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=400&fit=crop',
    icon: '☕'
  },
  {
    id: 'promotions',
    name: 'Saisonnier & Promotions',
    description: 'Offres spéciales et créations de saison',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=400&fit=crop',
    icon: '🎁'
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
