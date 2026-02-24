# Manara Boulangerie & Pâtisserie

Site web moderne pour une boulangerie-pâtisserie artisanale.

## 🥐 Fonctionnalités

- **Boutique en ligne** : Parcourez nos pains, viennoiseries, pâtisseries et plus
- **Gâteaux sur mesure** : Demandez un devis pour anniversaires, mariages, événements
- **Panier & Commande** : Système de commande complet avec paiement
- **Espace client** : Gérez vos commandes, favoris et informations
- **Blog** : Actualités, recettes et conseils

## 🛠 Technologies

- **React 18** - Framework UI
- **React Router v6** - Navigation
- **Vite** - Build tool
- **CSS Variables** - Theming

## 🚀 Démarrage

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Layout.jsx
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   └── CartSidebar.jsx
├── context/            # État global
│   ├── CartContext.jsx
│   └── AuthContext.jsx
├── data/               # Données mock
│   └── products.js
├── pages/              # Pages de l'application
│   ├── Home.jsx
│   ├── Boutique.jsx
│   ├── BoutiqueCategory.jsx
│   ├── GateauxSurMesure.jsx
│   ├── GateauxCategory.jsx
│   ├── Devis.jsx
│   ├── Panier.jsx
│   ├── Validation.jsx
│   ├── Confirmation.jsx
│   ├── APropos.jsx
│   ├── Blog.jsx
│   ├── BlogArticle.jsx
│   ├── Contact.jsx
│   ├── Login.jsx
│   └── MonCompte.jsx
├── styles/             # Styles globaux
│   └── global.css
├── App.jsx
└── main.jsx
```

## 🎨 Design

Le site utilise une palette de couleurs chaude inspirée de la boulangerie :
- **Cream** : Fond principal
- **Chocolate** : Texte et accents
- **Gold** : Boutons et éléments interactifs
- **Caramel** : Liens et hover states

Typographies :
- **Cormorant Garamond** : Titres et éléments display
- **Outfit** : Corps de texte

## 📱 Responsive

Le site est entièrement responsive et optimisé pour :
- Desktop (1024px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🔗 Routes

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/boutique` | Catalogue produits |
| `/boutique/:category` | Catégorie de produits |
| `/gateaux-sur-mesure` | Gâteaux personnalisés |
| `/gateaux/:type` | Type de gâteau |
| `/gateaux/devis` | Formulaire de devis |
| `/panier` | Panier d'achat |
| `/commande/validation` | Processus de commande |
| `/commande/confirmation/:id` | Confirmation |
| `/a-propos` | À propos |
| `/blog` | Actualités |
| `/blog/:slug` | Article |
| `/contact` | Contact & FAQ |
| `/connexion` | Login/Register |
| `/mon-compte` | Espace client |

---

Créé avec ❤️ pour Manara Boulangerie



