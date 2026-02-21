import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PortfolioStore {
  likedProjects: string[];
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
  activeFilter: string;
  setFilter: (filter: string) => void;
  showShortcuts: boolean;
  setShowShortcuts: (show: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      likedProjects: [],
      toggleLike: (id) =>
        set((state) => ({
          likedProjects: state.likedProjects.includes(id)
            ? state.likedProjects.filter((l) => l !== id)
            : [...state.likedProjects, id],
        })),
      isLiked: (id) => get().likedProjects.includes(id),
      activeFilter: "All",
      setFilter: (filter) => set({ activeFilter: filter }),
      showShortcuts: false,
      setShowShortcuts: (show) => set({ showShortcuts: show }),
    }),
    { name: "portfolio-store" }
  )
);

// alias for backward compat
export const useAppStore = usePortfolioStore;
