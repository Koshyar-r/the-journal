import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post";

const baseURL = "https://the-journal-murex.vercel.app/";

export default async function RecentPosts() {
    const res = await fetch(`${baseURL}/api/posts/recent`, {
        cache: "no-store"
    });

    if (!res.ok) {
        throw new Error("Failed to fetch recent posts");
    }

    const { posts }: { posts: Post[] } = await res.json();

    return (
        <div className="space-y-2 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                    return (
                        <Link
                            key={post.id}
                            href={`/articles/${post.slug}`}
                            className="group rounded-xl overflow-hidden bg-black border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
                        >
                            {post.coverImageURL && (
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.coverImageURL}
                                        alt={post.title}
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        fill
                                    />

                                    <div className="absolute inset-0 bg-black/30" />
                                </div>
                            )}

                            <div className="p-5 space-y-3">
                                <time className="text-xs text-gray-400">
                                    {new Date(post.createdAt).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        }
                                    )}
                                </time>

                                <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                </p>

                                <span className="inline-block text-sm font-medium text-indigo-400 group-hover:underline">
                                    Read article →
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}