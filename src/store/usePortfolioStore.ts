import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ProjectCategory = "all" | "fullstack" | "systems" | "ml";

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: "fullstack" | "systems" | "ml";
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics: string;
}

interface PortfolioState {
  // Filter state slice
  selectedCategory: ProjectCategory;
  searchQuery: string;
  // Persistent bookmarked projects slice
  bookmarkedProjectIds: string[];

  // Actions
  setCategory: (category: ProjectCategory) => void;
  setSearchQuery: (query: string) => void;
  toggleBookmark: (id: string) => void;
  clearFilters: () => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      selectedCategory: "all",
      searchQuery: "",
      bookmarkedProjectIds: ["otakufy", "spotify-pipeline"],

      setCategory: (category) => set({ selectedCategory: category }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleBookmark: (id) =>
        set((state) => ({
          bookmarkedProjectIds: state.bookmarkedProjectIds.includes(id)
            ? state.bookmarkedProjectIds.filter((item) => item !== id)
            : [...state.bookmarkedProjectIds, id],
        })),
      clearFilters: () => set({ selectedCategory: "all", searchQuery: "" }),
    }),
    {
      name: "indraneel-portfolio-state",
      storage: createJSONStorage(() => localStorage),
      // Only persist the bookmarks to localStorage, keeping search query in volatile memory
      partialize: (state) => ({
        bookmarkedProjectIds: state.bookmarkedProjectIds,
      }),
    }
  )
);

// Decoupled Fine-Grained Selectors (Prevents re-renders across layout boundaries)
export const useSelectedCategory = () =>
  usePortfolioStore((state) => state.selectedCategory);
export const useSearchQuery = () =>
  usePortfolioStore((state) => state.searchQuery);
export const useBookmarkedProjectIds = () =>
  usePortfolioStore((state) => state.bookmarkedProjectIds);
export const usePortfolioActions = () =>
  usePortfolioStore((state) => ({
    setCategory: state.setCategory,
    setSearchQuery: state.setSearchQuery,
    toggleBookmark: state.toggleBookmark,
    clearFilters: state.clearFilters,
  }));
