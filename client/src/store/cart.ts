import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { ProductCartData } from '../types';

interface CartType {
  cart: ProductCartData[]; 
  removeFromCart:(productId:string)=>void;
  getIds:()=>ProductCartData[]
  removeAllProducts:()=>void
  decrementNumberOfProducts:(productCartData: ProductCartData)=>void
  addToCart:(productCartData: ProductCartData)=>void
  increaseNumberOfProducts:(productCartData: ProductCartData)=>void
  getNumberOfProducts:()=>number


}

const useCartStore = create<CartType>()(
  persist(
    (set, get) => ({
      cart: [], 
      addToCart: (productCartData: ProductCartData) => {
        const productIsAvailable = get().cart.find(item => item.id === productCartData.id);
        
        if (productIsAvailable) {
          get().increaseNumberOfProducts(productCartData);
        } else {
          const productToAdd = {
            ...productCartData,
            numberOfProducts: productCartData.numberOfProducts || 1
          };
          set((state) => ({
            cart: [...state.cart, productToAdd]
          }));
        }
      },
      increaseNumberOfProducts: (productCartData: ProductCartData) => {
        const productIsAvailable = get().cart.find(item => item.id === productCartData.id);
        
        if (productIsAvailable ) {
          set((state) => ({
            cart: state.cart.map(item => 
              
              item.id === productCartData.id  ? 
                { ...item, numberOfProducts: (item.numberOfProducts ||0) +1 } 
                : item
            )
          }));
        } 
      },
 
        removeFromCart: (productId: string) => {
            set((state) => ({
              cart: state.cart.filter(item => item.id !== productId)
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
          decrementNumberOfProducts:(productCartData: ProductCartData)=>{
            const numberOfProducts = get().cart.length
    
          if (numberOfProducts && productCartData.numberOfProducts) {
            const newProduct = {
              ...productCartData,
              numberOfProducts: productCartData.numberOfProducts-1
            };
            set((state)=>({
              cart:[...state.cart,newProduct]
            }))
          }
       else{
        set(()=>({
          cart:[]
        }))
       }
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