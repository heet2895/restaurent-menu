import type { Dish } from '../../modules/customer/store/customerStore';

export const mockCategories = [
  'All',
  'Starters',
  'Mains',
  'Desserts',
  'Beverages'
];

export const mockDishes: Dish[] = [
  {
    id: 'd1',
    name: 'Truffle Mushroom Risotto',
    price: 34.00,
    image: 'https://images.unsplash.com/photo-1626084661073-45c115da7b5a?auto=format&fit=crop&q=80&w=800',
    category: 'Mains',
    description: 'Arborio rice slowly cooked in rich vegetable broth with wild mushrooms, finished with truffle oil and parmesan.',
    rating: 4.8
  },
  {
    id: 'd2',
    name: 'Wagyu Beef Filet',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1544025162-817ab5519ab1?auto=format&fit=crop&q=80&w=800',
    category: 'Mains',
    description: 'A-5 grade filet cooked to perfection, accompanied by heavily roasted asparagus and a mild red reduction sauce.',
    rating: 4.9
  },
  {
    id: 'd3',
    name: 'Edible Gold Leaf Foie Gras',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1517441589139-4ab52a2ff800?auto=format&fit=crop&q=80&w=800',
    category: 'Starters',
    description: 'Pan-seared foie gras rested on brioche, crowned with 24k edible gold.',
    rating: 4.7
  },
  {
    id: 'd4',
    name: 'Burrata & Heirloom Tomato',
    price: 24.00,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=800',
    category: 'Starters',
    description: 'Creamy burrata surrounded by fresh heirloom tomatoes, balsamic glaze, and micro basil.',
    rating: 4.6
  },
  {
    id: 'd5',
    name: 'Vanilla Bean Panna Cotta',
    price: 16.00,
    image: 'https://images.unsplash.com/photo-1590137532395-cb41940a012a?auto=format&fit=crop&q=80&w=800',
    category: 'Desserts',
    description: 'Silky smooth vanilla bean custard topped with seasonal berry compote.',
    rating: 4.8
  },
  {
    id: 'd6',
    name: 'Artisan Espresso Martini',
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1615887023516-9df2c2941fae?auto=format&fit=crop&q=80&w=800',
    category: 'Beverages',
    description: 'Premium vodka, fresh espresso, and coffee liqueur shaken into a rich foam.',
    rating: 4.9
  }
];
