import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

import { User } from "@apis/(user)/common";

// Getting started with Zustand (TypeScript) and Storage Persist.
// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-do-i-use-it-with-typescript
type UserStore = {
  // Only properties defined in type UserStore are accessible from outside.
  // For example, you can't access the property `isLoggedIn` if you don't define it in type UserStore.
  user?: User;
  isLoggedIn: boolean;
  setLoggedInUser: (user: User) => void;
  disposeUser: () => void;
};
export const useUserStore = create<UserStore>()(
  // devtools is used to debug Zustand to watch the state changes on React DevTools.
  // https://qiita.com/s_taro/items/0c16f077d843ac1a78fa
  // Usage: create<T>()(devtools(persist(...)))
  // https://docs.pmnd.rs/zustand/guides/typescript#using-middlewares
  devtools(
    persist(
      (set) => ({
        user: undefined,
        isLoggedIn: false,
        setLoggedInUser: (user) => set({ user, isLoggedIn: true }),
        disposeUser: () => set({ user: undefined, isLoggedIn: false }),
      }),
      {
        // Default storage to be used is localStorage.
        // https://docs.pmnd.rs/zustand/integrations/persisting-store-data#storage

        // Unique name for the storage.
        name: "user-storage",
        // partialize is used to restore the properties saved in the storage.
        // https://docs.pmnd.rs/zustand/integrations/persisting-store-data#partialize
        partialize: (state) => ({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
        }),
      }
    )
  )
);
