"use client";

import EditPageSkeleton from "@/components/skeletons/EditPageSkeleton";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

export default function EditPage() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState<null | File>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState(true);

    const { postId } = useParams();
    const router = useRouter();

    const config = useMemo(
        () => ({
            placeholder: "Start writing your article...",
            theme: "dark",
            style: {
                background: "#121212",
                color: "#d1d5dc",
            },
        }),
        []
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!title || !excerpt || !content) {
                toast("Title, Excerpt and Content are required!", {
                    style: {
                        color: "white",
                        background: "#246BCE",
                    },
                });

                return;
            }

            setIsSubmitting(true);

            const formData = new FormData();

            formData.append("title", title);
            formData.append("excerpt", excerpt);
            formData.append("content", content);

            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            const response = await axios.patch(
                `/api/posts/${postId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            toast("Article updated successfully", {
                style: {
                    color: "white",
                    background: "#246BCE",
                },
            });

            const slug = response.data.slug;

            router.replace(`/articles/${slug}`);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(error.response?.data.error, {
                    style: {
                        color: "white",
                        background: "#246BCE",
                    },
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`/api/posts/${postId}`);

                setTitle(data.title);
                setContent(data.content);
                setExcerpt(data.excerpt);
                setPreviewImage(data.coverImageURL);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("AXIOS_ERROR:", error.response?.data);
                    alert(error.response?.data?.error || "Failed to load post");
                } else {
                    console.error("UNKNOWN_ERROR:", error);
                    alert("An unexpected error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        if (postId) {
            fetchPost();
        }
    }, [postId]);

    if (loading) return <EditPageSkeleton />;

    return (
        <section className="relative mx-auto max-w-5xl px-5 py-14 sm:px-8 lg:py-24">

            {/* Header */}
            <div className="mb-14 border-b border-white/10 pb-10">
                <div className="mb-6 flex items-center gap-4">
                    <span className="h-px w-10 bg-primary" />

                    <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                        The Journal
                    </span>
                </div>

                <div className="flex items-end justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                            Edit your article
                        </h1>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
                            Refine your story, update your ideas, and make every
                            word count.
                        </p>
                    </div>

                    <span className="hidden text-7xl font-bold tracking-[-0.06em] text-white/5 sm:block">
                        EDIT
                    </span>
                </div>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-8">
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Article title"
                        className="w-full bg-transparent text-4xl font-bold tracking-[-0.03em] text-white placeholder-white/20 outline-none sm:text-5xl lg:text-6xl"
                    />
                </div>

                {/* Excerpt */}
                <div className="mb-10">
                    <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Write a short excerpt (1–2 sentences)"
                        rows={3}
                        className="w-full resize-none rounded-2xl border border-white/10 bg-secondary-background p-5 text-base leading-7 text-white/80 placeholder-white/25 outline-none transition-colors focus:border-primary/50"
                    />
                </div>

                {/* Cover Image */}
                <div className="mb-10">
                    <div className="mb-3 flex items-center justify-between">
                        <label className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                            Cover Image
                        </label>

                        <span className="text-xs text-white/20">
                            Optional
                        </span>
                    </div>

                    <div className="rounded-2xl border border-dashed border-white/10 bg-secondary-background p-5 transition-colors hover:border-primary/40">
                        <input
                            onChange={(e) =>
                                setCoverImage(e.target.files?.[0] || null)
                            }
                            type="file"
                            accept="image/*"
                            className="block w-full cursor-pointer text-sm text-white/40
                            file:mr-4 file:cursor-pointer file:rounded-full
                            file:border-0 file:bg-primary file:px-5 file:py-2.5
                            file:font-semibold file:text-white
                            file:transition-opacity hover:file:opacity-80"
                        />
                    </div>
                </div>

                {/* Current Cover */}
                <div className="mb-10">
                    <div className="mb-4 flex items-center gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                            Current Cover
                        </span>

                        <span className="h-px flex-1 bg-white/10" />
                    </div>

                    <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-secondary-background">
                        <Image
                            src={previewImage}
                            alt="image-preview"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                {/* Editor */}
                <div className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-secondary-background">
                    <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        onChange={(newContent) => setContent(newContent)}
                    />
                </div>

                {/* Update */}
                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                    <span className="hidden text-sm text-white/30 sm:block">
                        Make it better. Then let it go.
                    </span>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer rounded-full border border-primary bg-primary px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Updating..." : "Update"}
                    </button>
                </div>

            </form>
        </section>
    );
}