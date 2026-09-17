"use client"

import Link from "next/link"
import { useState } from "react"
import { LuArrowLeft, LuLogOut, LuMail, LuUser } from "react-icons/lu"

import { authClient } from "@/lib/auth-client"

export default function ProfilePage() {
    const { data: session, isPending } = authClient.useSession()
    const [isSigningOut, setIsSigningOut] = useState(false)

    const handleSignOut = async () => {
        setIsSigningOut(true)

        await authClient.signOut()

        window.location.href = "/"
    }

    if (isPending) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="text-gray-400">
                    Loading profile...
                </div>
            </main>
        )
    }

    if (!session?.user) {
        return (
            <main className="min-h-screen flex items-center justify-center px-4">
                <div className="w-full max-w-md text-center">
                    <h1 className="text-2xl font-semibold text-white">
                        You’re not signed in
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        Sign in to view your profile.
                    </p>

                    <Link
                        href="/sign-in"
                        className="inline-block mt-6 bg-primary text-white px-5 py-2.5 rounded-lg"
                    >
                        Sign in
                    </Link>
                </div>
            </main>
        )
    }

    const user = session.user
    const initial = user.name?.charAt(0).toUpperCase() || "U"

    return (
        <main className="min-h-screen flex items-center justify-center px-4 py-24">
            <div className="w-full max-w-lg">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <LuArrowLeft size={18} />
                    Back to home
                </Link>

                <div className="rounded-2xl border border-gray-800 bg-gray-950/70 p-6 md:p-8">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-semibold">
                            {initial}
                        </div>

                        <h1 className="text-2xl font-semibold text-white mt-5">
                            {user.name}
                        </h1>

                        <p className="text-sm text-gray-400 mt-1">
                            Your TechBlog profile
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                <LuUser size={20} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500">
                                    Name
                                </p>

                                <p className="text-sm text-white truncate">
                                    {user.name}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                <LuMail size={20} />
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs text-gray-500">
                                    Email
                                </p>

                                <p className="text-sm text-white truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between rounded-xl border border-gray-800 bg-gray-900/60 p-4">
                            <div>
                                <p className="text-xs text-gray-500">
                                    Email verification
                                </p>

                                <p className="text-sm text-white mt-1">
                                    {user.emailVerified
                                        ? "Verified"
                                        : "Not verified"}
                                </p>
                            </div>

                            <div
                                className={`text-xs px-3 py-1.5 rounded-full ${
                                    user.emailVerified
                                        ? "bg-green-500/10 text-green-400"
                                        : "bg-yellow-500/10 text-yellow-400"
                                }`}
                            >
                                {user.emailVerified
                                    ? "Verified"
                                    : "Pending"}
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full mt-8 flex items-center justify-center gap-2 rounded-lg border border-red-500/20 text-red-400 py-3 font-medium hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                        <LuLogOut size={18} />

                        {isSigningOut ? "Signing out..." : "Sign out"}
                    </button>
                </div>
            </div>
        </main>
    )
}