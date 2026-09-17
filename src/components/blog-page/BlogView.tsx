"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { LuArrowLeft, LuCalendarDays, LuPen } from "react-icons/lu";
import DeleteButton from "./DeleteButton";

interface BlogViewProps {
    postPromise: Promise<{
        id: string;
        title: string;
        content: string;
        excerpt: string;
        createdAt: string | Date;
        slug: string;
        coverImageURL: string;
        author: {
            id: string;
            name: string;
            image: string | null;
        };
    } | null>;
}

export default function BlogView({ postPromise }: BlogViewProps) {
    const post = use(postPromise);
    const { data: session } = authClient.useSession();
    const userId = session?.user.id;

    if (!post) {
        return (
            <article className="mx-auto max-w-4xl px-5 py-24 text-center sm:px-8">
                <p className="text-sm uppercase tracking-[0.25em] text-primary">
                    The Journal
                </p>

                <h1 className="mt-5 text-4xl font-bold tracking-[-0.04em] text-white">
                    Article not found.
                </h1>

                <Link
                    href="/articles"
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition hover:border-primary/40 hover:text-white"
                >
                    <LuArrowLeft size={16} />
                    Back to articles
                </Link>
            </article>
        );
    }

    const authorInitial = post.author.name?.charAt(0).toUpperCase() || "?";

    return (
        <article className="relative overflow-hidden">
            {/* Subtle background glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[140px]" />

            <div className="relative mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-24">
                {/* Header */}
                <header className="mx-auto max-w-4xl">
                    {/* Journal label */}
                    <div className="mb-8 flex items-center gap-4">
                        <span className="h-px w-10 bg-primary" />

                        <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                            The Journal
                        </span>

                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl lg:text-7xl">
                        {post.title}
                    </h1>

                    {/* Excerpt */}
                    {post.excerpt && (
                        <p className="mt-7 max-w-3xl text-base leading-8 text-white/45 sm:text-lg">
                            {post.excerpt}
                        </p>
                    )}

                    {/* Author / Date */}
                    <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-y border-white/10 py-5">
                        <div className="flex items-center gap-3">
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10 bg-secondary-background">
                                {post.author.image ? (
                                    <Image
                                        src={post.author.image}
                                        alt={post.author.name}
                                        fill
                                        sizes="44px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-sm font-semibold text-primary">
                                        {authorInitial}
                                    </div>
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-medium text-white/80">
                                    {post.author.name}
                                </p>

                                <p className="text-xs text-white/30">
                                    Author
                                </p>
                            </div>
                        </div>

                        <span className="hidden h-5 w-px bg-white/10 sm:block" />

                        <div className="flex items-center gap-2 text-sm text-white/35">
                            <LuCalendarDays size={15} />

                            <span>
                                {new Date(post.createdAt).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                    }
                                )}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Cover Image */}
                <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-secondary-background sm:mt-16">
                    <Image
                        src={post.coverImageURL}
                        alt={post.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 1024px"
                        className="object-cover"
                    />
                </div>

                {/* Article Content */}
                {post.content && (
                    <div
                        className="blog-post mx-auto mt-14 max-w-3xl text-[16px] leading-8 tracking-[0.01em] text-white/65 sm:mt-20 sm:text-[17px]"
                        dangerouslySetInnerHTML={{
                            __html: post.content,
                        }}
                    />
                )}

                {/* Bottom Divider */}
                <div className="my-16 border-t border-white/10 sm:my-20" />

                {/* Author Controls */}
                {userId === post.author.id && (
                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={`/write/edit/${post.id}`}
                            className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
                        >
                            <LuPen size={15} />
                            Edit
                        </Link>

                        <DeleteButton postId={post.id} />
                    </div>
                )}

                {/* Back */}
                <div className="mt-12">
                    <Link
                        href="/articles"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-white/40 transition-colors hover:text-primary"
                    >
                        <LuArrowLeft
                            size={16}
                            className="transition-transform duration-300 group-hover:-translate-x-1"
                        />

                        Back to all articles
                    </Link>
                </div>
            </div>
        </article>
    );
}