interface ModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: React.ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    return (
        <div aria-hidden={!isOpen} className={`fixed inset-0 z-50 flex items-center justify-center px-4 transition-opacity duration-700
            ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

            {/* backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-black/90 transition-all duration-700
                            ${isOpen ? "opacity-100" : "opacity-0"}`}
            />

            {/* modal content */}
            <div className={`relative z-10 w-full max-w-md rounded-2xl bg-secondary-background border border-white/10 px-6 py-12 shadow-xl transform transition-all duration-700
                        ${isOpen ? "translate-y-0" : "translate-y-full"}
                        ${isOpen ? "opacity-100" : "opacity-0"}`}
            >
                {children}
            </div>
        </div>
    )
}