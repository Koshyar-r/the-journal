"use client";

import PostCardSkeleton from "@/components/skeletons/PostCardsSkeleton";
import { useInfinitePosts } from "@/custom-hooks/usePost";
import ContainerLayout from "@/layouts/ContainerLayout";
import Image from "next/image";
import Link from "next/link";
import { LuArrowUpRight, LuSearch } from "react-icons/lu";
import { useModalStore } from "@/store/useModalStore";

export default function ArticlesPage() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfinitePosts({ limit: 3 });

    const { openSearch } = useModalStore();

    if (status === "pending") {
        return (
            <ContainerLayout>
                <div className="px-5 py-14 sm:px-8 lg:py-24">
                    {/* Header */}
                    <div className="mb-14 border-b border-white/10 pb-10">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-10 bg-primary" />

                            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                                The Journal
                            </span>

                            <span className="h-px flex-1 bg-white/10" />
                        </div>

                        <h1 className="text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                            Articles<span className="text-primary">.</span>
                        </h1>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                            Ideas, perspectives, and stories worth spending
                            time with.
                        </p>
                    </div>

                    <PostCardSkeleton />
                </div>
            </ContainerLayout>
        );
    }

    if (status === "error") {
        return (
            <ContainerLayout>
                <div className="px-5 py-24 text-center sm:px-8">
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                        The Journal
                    </p>

                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white">
                        Something went wrong.
                    </h2>

                    <p className="mt-3 text-sm text-white/40">
                        We couldn&apos;t load the articles right now.
                    </p>
                </div>
            </ContainerLayout>
        );
    }

    const posts = data.pages.flatMap((page) => page.posts) ?? [];

    return (
        <ContainerLayout>
            <div className="relative overflow-hidden px-5 py-14 sm:px-8 lg:py-24">
                {/* Background glow */}
                <div className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-primary/5 blur-[140px]" />

                <div className="relative">
                    {/* Header */}
                    <div className="mb-14 border-b border-white/10 pb-10 lg:mb-16">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-10 bg-primary" />

                            <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                                The Journal
                            </span>

                            <span className="h-px flex-1 bg-white/10" />
                        </div>

                        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h1 className="text-5xl font-bold tracking-[-0.05em] text-white sm:text-6xl lg:text-8xl">
                                    Articles
                                    <span className="text-primary">.</span>
                                </h1>

                                <p className="mt-5 max-w-xl text-sm leading-7 text-white/40 sm:text-base">
                                    Ideas, perspectives, and stories worth
                                    spending time with.
                                </p>
                            </div>

                            {/* Search */}
                            <button
                                type="button"
                                onClick={openSearch}
                                className="group inline-flex w-fit cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-secondary-background px-5 py-3 text-sm font-medium text-white/50 transition-all duration-300 hover:border-primary/40 hover:text-white"
                            >
                                <LuSearch
                                    size={17}
                                    className="transition-colors group-hover:text-primary"
                                />

                                <span>Search articles</span>
                            </button>
                        </div>
                    </div>

                    {/* Article count */}
                    <div className="mb-7 flex items-center justify-between">
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                            Latest stories
                        </span>

                        <span className="text-xs text-white/20">
                            {posts.length}{" "}
                            {posts.length === 1 ? "article" : "articles"}
                        </span>
                    </div>

                    {/* Articles */}
                    {posts.length === 0 ? (
                        <div className="rounded-2xl border border-white/10 bg-secondary-background px-6 py-20 text-center">
                            <p className="text-sm text-white/40">
                                No articles have been published yet.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <article
                                    key={post.id}
                                    className="group overflow-hidden rounded-2xl border border-white/10 bg-secondary-background transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
                                >
                                    {/* Image */}
                                    {post.coverImageURL ? (
                                        <Link
                                            href={`/articles/${post.slug}`}
                                            className="block"
                                        >
                                            <div className="relative aspect-[16/10] w-full overflow-hidden">
                                                <Image
                                                    src={post.coverImageURL}
                                                    alt={post.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                                />

                                                <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/0" />
                                            </div>
                                        </Link>
                                    ) : (
                                        <div className="flex aspect-[16/10] items-center justify-center bg-[#0b1117]">
                                            <span className="text-xs uppercase tracking-[0.25em] text-white/20">
                                                The Journal
                                            </span>
                                        </div>
                                    )}

                                    {/* Content */}
                                    <div className="p-6">
                                        <time className="text-xs font-medium uppercase tracking-[0.18em] text-primary/80">
                                            {new Date(
                                                post.createdAt
                                            ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                            })}
                                        </time>

                                        <Link
                                            href={`/articles/${post.slug}`}
                                            className="block"
                                        >
                                            <h2 className="mt-4 text-xl font-semibold leading-snug tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-primary">
                                                {post.title}
                                            </h2>
                                        </Link>

                                        <p className="mt-3 line-clamp-3 text-sm leading-7 text-white/40">
                                            {post.excerpt}
                                        </p>

                                        <Link
                                            href={`/articles/${post.slug}`}
                                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-primary"
                                        >
                                            Read article

                                            <LuArrowUpRight
                                                size={16}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Load More */}
                    {hasNextPage && (
                        <div className="mt-14 flex justify-center">
                            <button
                                type="button"
                                onClick={() => fetchNextPage()}
                                disabled={isFetchingNextPage}
                                className="cursor-pointer rounded-full border border-white/10 bg-secondary-background px-7 py-3.5 text-sm font-medium text-white/60 transition-all duration-300 hover:border-primary/40 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isFetchingNextPage
                                    ? "Loading..."
                                    : "Load more articles"}
                            </button>
                        </div>
                    )}

                    {/* Bottom line */}
                    <div className="mt-20 flex items-center gap-4">
                        <span className="h-px flex-1 bg-white/10" />

                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                            End of the current collection
                        </span>

                        <span className="h-px flex-1 bg-white/10" />
                    </div>
                </div>
            </div>
        </ContainerLayout>
    );
}