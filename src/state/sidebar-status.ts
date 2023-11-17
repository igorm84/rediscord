import { create } from "zustand";

type SidebarStatus = "open" | "closed";
interface SidebarStatusState {
    status: SidebarStatus
    setSidebarStatus: (newStatus: SidebarStatus) => void;
}

export const useSidebarStatus = create<SidebarStatusState>((set) => ({
    status: "closed",
    setSidebarStatus(newStatus) {
        set({ status: newStatus });
    },
}));