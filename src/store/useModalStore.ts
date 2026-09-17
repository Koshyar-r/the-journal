import { create } from "zustand"

interface ModalState {
    isSearchOpen: boolean

    openSearch: () => void
    closeSearch: () => void

    closeAll: () => void
}

export const useModalStore = create<ModalState>((set) => ({
    isSearchOpen: false,

    openSearch: () =>
        set({
            isSearchOpen: true,
        }),

    closeSearch: () =>
        set({
            isSearchOpen: false,
        }),

    closeAll: () =>
        set({
            isSearchOpen: false,
        }),
}))