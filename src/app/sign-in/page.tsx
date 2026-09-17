"use client"

import Link from "next/link"
import { useState } from "react"
import { LuEye, LuEyeOff } from "react-icons/lu"

import { authClient } from "@/lib/auth-client"

export default function SignInPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setError("")
        setIsLoading(true)

        const { error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        })

        if (error) {
            setError(error.message ?? "Unable to sign in")
            setIsLoading(false)
            return
        }

        window.location.href = "/"
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <Link
                        href="/"
                        className="text-2xl font-bold text-white"
                    >
                        TechBlog
                    </Link>

                    <h1 className="text-2xl font-semibold text-white mt-8">
                        Welcome back
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        Sign in to your TechBlog account
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm text-gray-300 mb-2"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 text-white outline-none focus:border-gray-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm text-gray-300 mb-2"
                        >
                            Password
                        </label>

                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                className="w-full rounded-lg bg-gray-900 border border-gray-700 px-4 py-3 pr-12 text-white outline-none focus:border-gray-500"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <LuEyeOff size={20} />
                                ) : (
                                    <LuEye size={20} />
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-white text-black py-3 font-medium disabled:opacity-50"
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <p className="text-sm text-gray-400 mt-6 text-center">
                    Don't have an account?{" "}
                    <Link
                        href="/sign-up"
                        className="text-white hover:underline"
                    >
                        Sign up
                    </Link>
                </p>

                <p className="text-xs text-gray-500 mt-8 text-center">
                    By continuing, you agree to our Terms & Privacy Policy
                </p>
            </div>
        </main>
    )
}