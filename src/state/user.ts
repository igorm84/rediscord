import { User } from "@/lib/entities/user";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { create } from "zustand";

interface CurrentUserState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (user: Partial<User>) => void;
  logout: () => void;
}
export const useCurrentUserStore = create<CurrentUserState>()((set) => {
  const supabase = createClientComponentClient();
  return {
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
    updateCurrentUser: (user) =>
      set((prev) => ({
        currentUser: { ...prev.currentUser, ...user } as User,
      })),
    logout: async () => {
      await supabase.auth.signOut();
      set({ currentUser: null });
      location.href = "/login";
    },
  };
});
