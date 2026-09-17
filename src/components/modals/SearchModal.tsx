"use client";

import { useState } from "react";
import Modal from "./Modal";
import { useModalStore } from "@/store/useModalStore";
import { useDebounce } from "@/custom-hooks/usePost";
import { useQuery } from "@tanstack/react-query";
import { searchPosts } from "@/services/post";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import { LuArrowUpRight, LuSearch, LuX } from "react-icons/lu";

export default function SearchModal() {
    const { closeSearch, isSearchOpen } = useModalStore();

    const [query, setQuery] = useState("");

    const debouncedQuery = useDebounce(query, 400);

    const router = useRouter();

    const {
        data: results = [],
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["search-posts", debouncedQuery],
        queryFn: () => searchPosts(debouncedQuery),
        enabled: debouncedQuery.length > 1,
    });

    const handleNavigate = (slug: string) => {
        router.push(`/articles/${slug}`);
        closeSearch();
        setQuery("");
    };

    const handleClose = () => {
        closeSearch();
        setQuery("");
    };

    return (
        <Modal onClose={handleClose} isOpen={isSearchOpen}>
            <div className="space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-primary">
                            The Journal
                        </p>

                        <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-white">
                            Search articles
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={handleClose}
                        className="cursor-pointer rounded-full border border-white/10 p-2 text-white/30 transition-colors hover:border-white/20 hover:text-white"
                    >
                        <LuX size={17} />
                    </button>
                </div>

                {/* Search Input */}
                <div className="relative">
                    <LuSearch
                        size={19}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search by title..."
                        autoFocus
                        className="w-full rounded-xl border border-white/10 bg-[#0b0b0b] py-4 pl-12 pr-4 text-sm text-white outline-none transition-colors placeholder:text-white/25 focus:border-primary/50"
                    />
                </div>

                {/* Results */}
                <div className="max-h-80 overflow-y-auto rounded-xl border border-white/10 bg-[#0b0b0b]">
                    {/* Initial state */}
                    {!debouncedQuery && (
                        <div className="px-5 py-8 text-center">
                            <LuSearch
                                size={22}
                                className="mx-auto text-white/15"
                            />

                            <p className="mt-3 text-sm text-white/30">
                                Start typing to search the journal.
                            </p>
                        </div>
                    )}

                    {/* Searching */}
                    {debouncedQuery.length > 1 &&
                        (isLoading || isFetching) && (
                            <div className="px-5 py-8 text-center">
                                <p className="text-sm text-white/40">
                                    Searching...
                                </p>
                            </div>
                        )}

                    {/* Empty */}
                    {debouncedQuery.length > 1 &&
                        !isLoading &&
                        !isFetching &&
                        results.length === 0 && (
                            <div className="px-5 py-8 text-center">
                                <p className="text-sm text-white/40">
                                    No articles found.
                                </p>

                                <p className="mt-1 text-xs text-white/20">
                                    Try a different search term.
                                </p>
                            </div>
                        )}

                    {/* Results */}
                    {results.map((result: Post) => (
                        <button
                            type="button"
                            onClick={() => handleNavigate(result.slug)}
                            key={result.id}
                            className="group flex w-full cursor-pointer items-center justify-between gap-4 border-b border-white/10 px-5 py-4 text-left last:border-b-0 transition-colors hover:bg-white/[0.03]"
                        >
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white/70 transition-colors group-hover:text-white">
                                    {result.title}
                                </p>

                                {result.excerpt && (
                                    <p className="mt-1 line-clamp-1 text-xs text-white/25">
                                        {result.excerpt}
                                    </p>
                                )}
                            </div>

                            <LuArrowUpRight
                                size={16}
                                className="shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                            />
                        </button>
                    ))}
                </div>

                {/* Hint */}
                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/20">
                    Search the stories of The Journal
                </p>
            </div>
        </Modal>
    );
}