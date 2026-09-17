"use client"

import Link from "next/link"
import Logo from "./Logo"
import {
    LuMenu,
    LuNotebookPen,
    LuSearch,
    LuX,
    LuChevronDown,
} from "react-icons/lu"
import { useState } from "react"
import { useModalStore } from "@/store/useModalStore"
import { authClient } from "@/lib/auth-client"
import MobileNav from "./MobileNav"

export const navLinks = [
    { url: "/", label: "Home" },
    { url: "/articles", label: "Articles" },
    { url: "/about", label: "About" },
]

export default function Navbar() {
    const { openSearch } = useModalStore()
    const [menuOpen, setMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)

    const { data: session, isPending } = authClient.useSession()

    const handleSignOut = async () => {
        await authClient.signOut()
        setUserMenuOpen(false)
    }

    const user = session?.user

    return (
        <nav className="h-18 fixed top-0 left-0 z-50 backdrop-blur-md backdrop-saturate-50 w-full">
            <div className="flex items-center justify-between h-full w-[90%] mx-auto">
                <Logo />

                <ul className="flex items-center gap-4 md:gap-8 text-gray-400 font-semibold">
                    {/* Search */}
                    <li
                        onClick={openSearch}
                        className="cursor-pointer flex items-center gap-1"
                    >
                        <LuSearch size={25} />
                        <span className="hidden md:block">Search</span>
                    </li>

                    {/* Write */}
                    {user && (
                        <li>
                            <Link
                                href="/write"
                                className="cursor-pointer flex items-center gap-1"
                            >
                                <LuNotebookPen size={20} />
                                <span className="hidden md:block">Write</span>
                            </Link>
                        </li>
                    )}

                    {/* Navigation */}
                    {navLinks.map((link) => (
                        <li
                            key={link.url}
                            className="hidden md:block hover:text-gray-200"
                        >
                            <Link href={link.url}>{link.label}</Link>
                        </li>
                    ))}

                    {/* Auth */}
                    <li className="relative">
                        {isPending ? (
                            <div className="w-10 h-10 rounded-full bg-gray-800 animate-pulse" />
                        ) : user ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setUserMenuOpen(!userMenuOpen)
                                    }
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="hidden lg:block text-gray-200">
                                        {user.name}
                                    </span>

                                    <LuChevronDown
                                        size={16}
                                        className={`hidden lg:block transition-transform ${userMenuOpen
                                                ? "rotate-180"
                                                : ""
                                            }`}
                                    />
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 top-12 w-48 rounded-xl border border-gray-800 bg-gray-950 p-2 shadow-xl">
                                        <div className="px-3 py-2 mb-1">
                                            <p className="text-sm text-white truncate">
                                                {user.name}
                                            </p>

                                            <p className="text-xs text-gray-500 truncate">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="h-px bg-gray-800 my-1" />

                                        <Link
                                            href="/profile"
                                            onClick={() =>
                                                setUserMenuOpen(false)
                                            }
                                            className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            Profile
                                        </Link>

                                        <Link
                                            href="/write"
                                            onClick={() =>
                                                setUserMenuOpen(false)
                                            }
                                            className="block px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                                        >
                                            Write
                                        </Link>

                                        <button
                                            type="button"
                                            onClick={handleSignOut}
                                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-gray-800"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="bg-primary text-gray-200 px-3 lg:px-5 py-2 rounded-full cursor-pointer"
                            >
                                Login
                            </Link>
                        )}
                    </li>

                    {/* Mobile menu */}
                    <li
                        className="cursor-pointer md:hidden z-80"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? (
                            <LuX size={25} />
                        ) : (
                            <LuMenu size={25} />
                        )}
                    </li>
                </ul>
            </div>

            <MobileNav
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
            />
        </nav>
    )
}