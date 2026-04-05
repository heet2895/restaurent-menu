import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { OrderStatusType } from '../../../constants/order';

export type TabType = 'menu' | 'order' | 'photos' | 'reviews';

export interface Dish {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  rating?: number;
}

export interface CartItem extends Dish {
  quantity: number;
}

interface CustomerState {
  // Navigation & UI Context
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  focusDishId: string | null;
  setFocusDishId: (id: string | null) => void;
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Session
  sessionId: string;
  tableNumber: string;
  setSession: (sessionId: string, tableNumber: string) => void;

  // Cart & Orders
  cart: CartItem[];
  addToCart: (dish: Dish) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  lastAddedItem: Dish | null;

  // Live Order State
  orderStatus: OrderStatusType | null;
  setOrderStatus: (status: OrderStatusType | null) => void;
}

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set, get) => ({
      activeTab: 'menu',
      setActiveTab: (tab) => set({ activeTab: tab }),

      selectedCategory: 'All',
      setSelectedCategory: (category) => set({ selectedCategory: category, searchQuery: '' }),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      focusDishId: null,
      setFocusDishId: (id) => set({ focusDishId: id }),

      isCartOpen: false,
      setCartOpen: (open) => set({ isCartOpen: open }),

      sessionId: 'sess-mock-001',
      tableNumber: 'Table 12',
      setSession: (sessionId, tableNumber) => set({ sessionId, tableNumber }),

      cart: [],
      lastAddedItem: null,
      addToCart: (dish) => {
        const { cart } = get();
        const existing = cart.find(item => item.id === dish.id);
        if (existing) {
          set({
            cart: cart.map(item => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item),
            lastAddedItem: dish
          });
        } else {
          set({
            cart: [...cart, { ...dish, quantity: 1 }],
            lastAddedItem: dish
          });
        }
        // Auto-clear lastAddedItem toast after 30 seconds
        setTimeout(() => set({ lastAddedItem: null }), 30000);
      },
      updateQuantity: (id, delta) => {
        const { cart } = get();
        set({
          cart: cart.map(item => {
            if (item.id === id) {
              const newQuantity = Math.max(0, item.quantity + delta);
              return { ...item, quantity: newQuantity };
            }
            return item;
          }).filter(item => item.quantity > 0)
        });
      },
      clearCart: () => set({ cart: [] }),

      orderStatus: null,
      setOrderStatus: (status) => set({ orderStatus: status }),
    }),
    {
      name: 'customer-storage',
      // We persist mainly the cart, tab, context. But maybe skip temporary UI state.
      partialize: (state) => ({
        cart: state.cart,
        selectedCategory: state.selectedCategory,
        activeTab: state.activeTab,
        tableNumber: state.tableNumber,
        sessionId: state.sessionId,
        orderStatus: state.orderStatus
      }),
    }
  )
);
