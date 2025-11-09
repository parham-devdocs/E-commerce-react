import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartType {
  cart: string[]; // or number[], or { id: string; qty: number }[] — adjust as needed
  addToCart: (productId: string) => void;
}

const useCartStore = create<CartType>()(
  persist(
    (set, get) => ({
      cart: [], // ✅ initial state
      addToCart: (productId: string) =>
        set((state) => ({
          cart: [...state.cart, productId],
        })),
        removeFromCart: (productId: string) => {
            set((state) => ({
              cart: state.cart.filter(id => id !== productId)
            }));
          },
          getIds: () => {
         return   get().cart
          }, 
          removeAllProducts: () => {
            set(() => ({
              cart: []
            }));
          },
           }),
    {
      name: 'cart', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;