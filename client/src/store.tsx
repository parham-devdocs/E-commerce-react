import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import moment from "moment";
type UserInfo = {
  email: string;
  role: string;
  fullName: string;
  profilePicture: string;
  yearsOfExperience: string;
  expiresAt: string;
};

interface AuthState {
  isLoggedIn: boolean;
  userInfo: UserInfo | null;
  userRole: string | null;
  isDarkMode: boolean;

  login: (userData: UserInfo) => void;
  logout: () => void;
  toggleDarkMode: () => void;
  checkAuthStatus:()=>any;
}

const useZustand = create<AuthState>()(
  persist(
    (set,get) => ({
      isLoggedIn: false,
      userInfo: null,
      userRole: null,
      isDarkMode: false,
   // In your store
checkAuthStatus: () => {
  const { userInfo, isLoggedIn, logout } = get();
  
  if (userInfo?.expiresAt && moment().isAfter(moment(userInfo.expiresAt))) {
  
    logout();
  } else if (isLoggedIn && !userInfo) {

    logout();
  }
},
      login: (userData) =>
        set({
          isLoggedIn: true,
          userInfo: userData,
          userRole: userData.role,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          userInfo: null,
          userRole: null,
        }),

      toggleDarkMode: () =>
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      storage: createJSONStorage(() => localStorage), // (optional) by default it's localStorage
    }
  )
);
export const zustandStore = useZustand;

export default useZustand