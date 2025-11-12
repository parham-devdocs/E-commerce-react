import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartType {
  cart: string[]; 
  addToCart: (productId: string) => void;
  removeFromCart:(productId:string)=>void;
  getIds:()=>string[]
  removeAllProducts:()=>void
  getNumberOfProducts:()=>number


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
          getNumberOfProducts:()=>{return get().cart.length}
           }),
    {
      name: 'cart', 
      storage: createJSONStorage(() => localStorage),
    }
  )
);
export const zustandStore = useCartStore;

export default useCartStore;