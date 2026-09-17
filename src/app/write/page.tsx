"use client"

import axios from "axios";
import JoditEditor from "jodit-react";
import dynamic from "next/dynamic"
import { useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";

const joditEditor = dynamic(() => import("jodit-react"), {
    ssr: false
})

export default function WritePage() {
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState<null | File>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            if (!title || !coverImage || !excerpt || !content) {
                toast("All fields are required!", {
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
            formData.append("coverImage", coverImage);

            await axios.post("/api/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            setContent("");
            setTitle("");
            setExcerpt("");
            setCoverImage(null);

            toast("Article published successfully", {
                style: {
                    color: "white",
                    background: "#246BCE",
                },
            });
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

                <h1 className="text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                    Write a new article
                </h1>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/40">
                    Put your thoughts into words and share something worth reading.
                </p>
            </div>

            <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-8">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Article title"
                        className="w-full bg-transparent text-4xl font-bold tracking-[-0.03em] text-white placeholder-white/20 outline-none sm:text-5xl lg:text-6xl"
                    />
                </div>

                {/* Excerpt */}
                <div className="mb-10">
                    <textarea
                        placeholder="Write a short excerpt (1–2 sentences)"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
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
                            Required
                        </span>
                    </div>

                    <div className="rounded-2xl border border-dashed border-white/10 bg-secondary-background p-5 transition-colors hover:border-primary/40">
                        <input
                            type="file"
                            onChange={(e) =>
                                setCoverImage(e.target.files?.[0] || null)
                            }
                            accept="image/*"
                            className="block w-full cursor-pointer text-sm text-white/40
                            file:mr-4 file:cursor-pointer file:rounded-full
                            file:border-0 file:bg-primary file:px-5 file:py-2.5
                            file:font-semibold file:text-white
                            file:transition-opacity hover:file:opacity-80"
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

                {/* Publish */}
                <div className="flex items-center justify-between border-t border-white/10 pt-8">
                    <span className="hidden text-sm text-white/30 sm:block">
                        Your story is almost ready.
                    </span>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer rounded-full border border-primary bg-primary px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isSubmitting ? "Publishing..." : "Publish Article"}
                    </button>
                </div>

            </form>
        </section>
    )
}