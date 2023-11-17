import { create } from "zustand";

export type ViewportType = "mobile" | "tablet" | "desktop";
interface ViewportTypeState {
    type: ViewportType;
    setViewportType: (newType: ViewportType) => void;
}

export const useViewportType = create<ViewportTypeState>((set) => ({
    type: "desktop",
    setViewportType(newType) {
        set({ type: newType });
    } 
}));